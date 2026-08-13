import type { AnomalyRow } from "../../types/telemetry";

interface AnomalyTableProps {
  data: AnomalyRow;
}

const AnomalyTable = ({ data }: AnomalyTableProps) => {
  return (
    <div>
      <h2>{data.sensor}</h2>
      <p>Timestamp: {data.timestamp}</p>
      <p>Temperature: {data.temperature}</p>
      <p>Pressure: {data.pressure}</p>
      <p>Voltage: {data.voltage}</p>
      <p>Battery: {data.battery}</p>
    </div>
  );
};

AnomalyTable.propTypes = {};

export default AnomalyTable;
