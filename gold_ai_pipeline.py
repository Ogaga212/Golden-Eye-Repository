"""
Daily AI Gold Prediction Pipeline
- Fetches XAU/USD data from Metals-API
- Generates AI predictions using OpenAI
- Simulates trade execution
- Logs results and supports backtesting
"""
import requests
import pandas as pd
import schedule
import time
import datetime
import logging
import os
from typing import List, Dict, Any

# ========== 1. Data Source ==========
METALS_API_KEY = os.getenv('METALS_API_KEY', 'YOUR_API_KEY')
METALS_API_URL = 'https://metals-api.com/api/'


def fetch_gold_data(days: int = 30) -> pd.DataFrame:
    """
    Fetches historical XAU/USD OHLCV data for the last `days` days.
    Returns a DataFrame with columns: date, open, high, low, close, volume (volume may be None).
    """
    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=days)
    url = f"{METALS_API_URL}timeseries"
    params = {
        'access_key': METALS_API_KEY,
        'base': 'XAU',
        'symbols': 'USD',
        'start_date': start_date.isoformat(),
        'end_date': end_date.isoformat(),
    }
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    data = resp.json()
    if not data.get('success'):
        raise Exception(f"API error: {data}")
    # Parse timeseries
    records = []
    for date, price_info in data['rates'].items():
        close = price_info['USD']
        # Metals-API does not provide OHLC, so use close for all
        records.append({'date': date, 'open': close, 'high': close, 'low': close, 'close': close, 'volume': None})
    df = pd.DataFrame(records)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    return df

# ========== 2. Broker / Execution API (Alpaca Paper Trading) ==========
# Sign up at https://alpaca.markets/ for free paper trading API keys
ALPACA_API_KEY = os.getenv('ALPACA_API_KEY', 'YOUR_ALPACA_KEY')
ALPACA_SECRET_KEY = os.getenv('ALPACA_SECRET_KEY', 'YOUR_ALPACA_SECRET')
ALPACA_BASE_URL = 'https://paper-api.alpaca.markets'

HEADERS = {
    'APCA-API-KEY-ID': ALPACA_API_KEY,
    'APCA-API-SECRET-KEY': ALPACA_SECRET_KEY
}

def execute_trade(signal: dict):
    """
    Places a simulated trade on Alpaca paper trading.
    Note: XAU/USD is not natively supported, so this is a template for supported assets (e.g., GLD ETF).
    """
    symbol = "GLD"  # Gold ETF as a proxy for XAU/USD
    side = "buy" if signal.get("prediction") == "Buy" else "sell"
    order = {
        "symbol": symbol,
        "qty": 1,
        "side": side,
        "type": "market",
        "time_in_force": "gtc"
    }
    resp = requests.post(f"{ALPACA_BASE_URL}/v2/orders", json=order, headers=HEADERS)
    logging.info(f"Alpaca order response: {resp.json()}")
    print(f"Alpaca order response: {resp.json()}")

# ========== 3. AI Layer / Predictions ==========
import openai
openai.api_key = os.getenv('OPENAI_API_KEY', 'YOUR_OPENAI_KEY')
import ta

def compute_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """
    Adds SMA, RSI, MACD, and Bollinger Bands columns to the DataFrame.
    """
    df = df.copy()
    df['sma_5'] = ta.trend.sma_indicator(df['close'], window=5)
    df['rsi_14'] = ta.momentum.rsi(df['close'], window=14)
    macd = ta.trend.macd(df['close'])
    df['macd'] = macd
    bb = ta.volatility.BollingerBands(df['close'], window=20)
    df['bb_high'] = bb.bollinger_hband()
    df['bb_low'] = bb.bollinger_lband()
    return df

def generate_prediction(df: pd.DataFrame) -> Dict[str, Any]:
    """
    Calls OpenAI to generate a gold price prediction based on indicators.
    """
    df = compute_indicators(df)
    latest = df.iloc[-1]
    prompt = f"""
You are a financial AI. Given the following gold (XAU/USD) data and indicators, predict today's action:
- Date: {latest['date'].date()}
- Close: {latest['close']}
- SMA(5): {latest['sma_5']}
- RSI(14): {latest['rsi_14']}
- MACD: {latest['macd']}
- Bollinger High: {latest['bb_high']}
- Bollinger Low: {latest['bb_low']}
Respond in JSON: {{"prediction": "Buy|Sell|Hold", "target_price": number, "stop_loss": number, "confidence": 0-100, "reasoning": string}}
"""
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    import json
    try:
        result = json.loads(response['choices'][0]['message']['content'])
    except Exception as e:
        logging.error(f"AI response error: {e}")
        result = {"prediction": "Hold", "confidence": 0, "reasoning": "AI response error."}
    return result

# ========== 4. Scheduler / Orchestrator ==========
def main_job():
    """
    Main daily job: fetch data, predict, log, and simulate trade.
    """
    logging.info("Starting daily gold prediction job...")
    df = fetch_gold_data(30)
    pred = generate_prediction(df)
    logging.info(f"Prediction: {pred}")
    with open('gold_predictions.log', 'a') as f:
        f.write(f"{datetime.datetime.now().isoformat()} {pred}\n")
    if pred.get('prediction') in ['Buy', 'Sell']:
        execute_trade(pred)

# ========== 5. Backtesting / Simulation ==========
def backtest_strategy(days: int = 365):
    """
    Runs predictions on past data and returns performance report.
    """
    df = fetch_gold_data(days)
    correct = 0
    total = 0
    for i in range(20, len(df)):
        window = df.iloc[i-20:i]
        pred = generate_prediction(window)
        # Simple backtest: check if prediction matches next day's price move
        if pred.get('prediction') == 'Buy' and df.iloc[i]['close'] > window.iloc[-1]['close']:
            correct += 1
        elif pred.get('prediction') == 'Sell' and df.iloc[i]['close'] < window.iloc[-1]['close']:
            correct += 1
        total += 1
    accuracy = correct / total if total else 0
    report = {
        'total_trades': total,
        'correct_predictions': correct,
        'accuracy': accuracy
    }
    logging.info(f"Backtest report: {report}")
    return report

# ========== Scheduler ==========
if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    schedule.every().day.at("08:00").do(main_job)
    print("Scheduler started. Running daily at 08:00.")
    while True:
        schedule.run_pending()
        time.sleep(60)
