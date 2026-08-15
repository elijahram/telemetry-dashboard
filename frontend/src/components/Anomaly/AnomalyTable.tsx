import type { AnomalyRow } from "../../types/telemetry";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "../ui/table";

interface AnomalyTableProps {
  data: AnomalyRow[];
}

const ANOMALY_SENSOR_COLOR = "text-red-500 font-semibold";

const AnomalyTable = ({ data }: AnomalyTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Timestamp</TableHead>
          <TableHead>Sensor</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead>Pressure</TableHead>
          <TableHead>Voltage</TableHead>
          <TableHead>Battery</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((anomaly) => (
          <TableRow key={`${anomaly.sensor}-${anomaly.timestamp}`}>
            <TableCell>{anomaly.timestamp}</TableCell>
            <TableCell className={ANOMALY_SENSOR_COLOR}>
              {anomaly.sensor}
            </TableCell>
            <TableCell
              className={
                anomaly.sensor === "temperature" ? ANOMALY_SENSOR_COLOR : ""
              }
            >
              {anomaly.temperature}
            </TableCell>
            <TableCell
              className={
                anomaly.sensor === "pressure" ? ANOMALY_SENSOR_COLOR : ""
              }
            >
              {anomaly.pressure}
            </TableCell>
            <TableCell
              className={
                anomaly.sensor === "voltage" ? ANOMALY_SENSOR_COLOR : ""
              }
            >
              {anomaly.voltage}
            </TableCell>
            <TableCell
              className={
                anomaly.sensor === "battery" ? ANOMALY_SENSOR_COLOR : ""
              }
            >
              {anomaly.battery}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

AnomalyTable.propTypes = {};

export default AnomalyTable;
