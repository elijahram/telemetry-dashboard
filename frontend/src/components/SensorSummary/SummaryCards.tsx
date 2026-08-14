import type { SensorSummary } from "../../types/telemetry";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
  data: SensorSummary[];
}

const UNITS: Record<string, string> = {
  temperature: "°C",
  pressure: "atm",
  voltage: "V",
  battery: "%",
};

const THRESHOLDS: Record<string, [number, number]> = {
  temperature: [15, 35],
  pressure: [0.8, 1.2],
  voltage: [22, 28],
  battery: [20, 100],
};

const isNormal = (sensor: string, min: number, max: number) => {
  const [low, high] = THRESHOLDS[sensor];
  return min >= low && max <= high;
};

const SummaryCards = ({ data }: SummaryCardsProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data.map((summary) => {
        const normal = isNormal(
          summary.sensor,
          summary.min_value,
          summary.max_value,
        );
        return (
          <Card key={summary.sensor}>
            <CardHeader>
              <CardTitle className="capitalize">
                {summary.sensor} ({UNITS[summary.sensor]})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Min: {summary.min_value.toFixed(5)}</p>
              <p>Max: {summary.max_value.toFixed(5)}</p>
              <p>Mean: {summary.mean_value.toFixed(5)}</p>
              <p>Std Dev: {summary.std_dev.toFixed(5)}</p>
              <p className={normal ? "text-green-500" : "text-red-500"}>
                ● {normal ? "Normal" : "Anomaly Detected"}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

SummaryCards.propTypes = {};

export default SummaryCards;
