import type { AnomalyRow } from "../../types/telemetry";

interface AnomalyTableProps {
  data: AnomalyRow[];
}

const AnomalyTable = ({ data }: AnomalyTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Sensor</th>
          <th>Temperature</th>
          <th>Pressure</th>
          <th>Voltage</th>
          <th>Battery</th>
        </tr>
      </thead>
      <tbody>
        {data.map((anomaly) => (
          <tr key={`${anomaly.sensor}-${anomaly.timestamp}`}>
            <td>{anomaly.timestamp}</td>
            <td style={{ color: "red" }}>{anomaly.sensor}</td>
            <td>{anomaly.temperature}</td>
            <td>{anomaly.pressure}</td>
            <td>{anomaly.voltage}</td>
            <td>{anomaly.battery}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AnomalyTable.propTypes = {};

export default AnomalyTable;
