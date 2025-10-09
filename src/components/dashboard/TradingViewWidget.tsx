"use client";

// TradingViewWidget.tsx
// Embeds a TradingView real-time price widget for a given symbol
import React, { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol?: string; // e.g., 'OANDA:XAUUSD' for Gold/USD
  width?: string | number;
  height?: string | number;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol = "OANDA:XAUUSD",
  width = "100%",
  height = 400,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    // Defensive: ensure container is empty and exists before widget injection
    container.current.innerHTML = "";
    // TradingView widget sometimes fails if container is not in DOM, so delay script injection
    const timeout = setTimeout(() => {
      if (!container.current) return;
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbol,
        width: "100%",
        height,
        locale: "en",
        dateRange: "1D",
        colorTheme: "dark",
        isTransparent: false,
        autosize: true,
        largeChartUrl: "",
      });
      container.current.appendChild(script);
    }, 100); // Delay to ensure DOM is ready
    return () => clearTimeout(timeout);
  }, [symbol, width, height]);

  return <div ref={container} style={{ width, height }} />;
};

export default TradingViewWidget;
