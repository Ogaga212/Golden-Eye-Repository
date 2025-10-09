import { NextRequest } from "next/server";
import { generatePrediction } from "@/ai/flows/generate-prediction";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "OANDA:XAUUSD";
  const price = parseFloat(searchParams.get("price") || "0");

  // You can map symbol to goldPair if needed, for now just use XAU/USD
  const goldPair = "XAU/USD";
  const timeframe = "1D";

  try {
    const prediction = await generatePrediction({
      goldPair,
      timeframe,
    });
    return new Response(
      JSON.stringify(
        prediction ?? {
          prediction: "No prediction generated",
          target_price: null,
          stop_loss: null,
          confidence: null,
          reasoning: "AI did not return a prediction. Please try again later.",
        }
      ),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: "Prediction failed",
        prediction: "No prediction generated",
        target_price: null,
        stop_loss: null,
        confidence: null,
        reasoning:
          "AI prediction error: " +
          (e instanceof Error ? e.message : String(e)),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
