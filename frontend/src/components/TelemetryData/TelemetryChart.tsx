import type { TelemetryRow } from "../../types/telemetry";

interface TelemetryChartProps {
  data: TelemetryRow;
}

const TelemetryChart = ({ data }: TelemetryChartProps) => {
  return (
    <div>
      <h2>Timestamp: {data.timestamp}</h2>
      <p>Temperature: {data.temperature}</p>
      <p>Pressure: {data.pressure}</p>
      <p>Voltage: {data.voltage}</p>
      <p>Battery: {data.battery}</p>
    </div>
  );
};

TelemetryChart.propTypes = {};

export default TelemetryChart;
