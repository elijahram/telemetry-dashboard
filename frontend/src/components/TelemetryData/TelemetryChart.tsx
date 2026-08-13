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
} from "recharts";

interface TelemetryChartProps {
  data: TelemetryRow[];
  anomalies?: AnomalyRow[]; // Optional prop for anomalies
}

const TelemetryChart = ({ data, anomalies = [] }: TelemetryChartProps) => {
  return (
    <LineChart
      style={{
        width: "100%",
        maxWidth: "1500px",
        height: "100%",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
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
  );
};

TelemetryChart.propTypes = {};

export default TelemetryChart;
