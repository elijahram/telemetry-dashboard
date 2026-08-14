import type { TelemetryRow, AnomalyRow } from "../../types/telemetry";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
  ResponsiveContainer,
} from "recharts";

interface TelemetryChartProps {
  data: TelemetryRow[];
  anomalies?: AnomalyRow[]; // Optional prop for anomalies
}

const TelemetryChart = ({ data, anomalies = [] }: TelemetryChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" stroke="var(--color-text-3)" />
        <YAxis width="auto" stroke="var(--color-text-3)" />
        <Tooltip
          cursor={{
            stroke: "#666",
          }}
          contentStyle={{
            backgroundColor: "#1a1a1a",
            borderColor: "#444",
            color: "#ffffff",
          }}
          labelStyle={{ color: "#ffffff" }}
          itemStyle={{ color: "#ffffff" }}
        />
        <Legend />
        <Line dataKey="temperature" stroke="var(--color-chart-1)" />
        <Line dataKey="pressure" stroke="var(--color-chart-2)" />
        <Line dataKey="voltage" stroke="var(--color-chart-3)" />
        <Line dataKey="battery" stroke="var(--color-chart-4)" />

        {anomalies.map((anomaly) => (
          <ReferenceDot
            key={`${anomaly.sensor}-${anomaly.timestamp}`}
            x={anomaly.timestamp}
            y={anomaly[anomaly.sensor as keyof TelemetryRow] as number}
            r={8}
            fill="#ff0000"
            stroke="#ffffff"
            strokeWidth={2}
            ifOverflow="visible"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

TelemetryChart.propTypes = {};

export default TelemetryChart;
