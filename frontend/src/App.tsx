import { useEffect, useState } from "react";
import SummaryCard from "./components/SensorSummary/SummaryCard";
import AnomalyTable from "./components/Anomaly/AnomalyTable";
import TelemetryChart from "./components/TelemetryData/TelemetryChart";
import type {
  AnomalyRow,
  SensorSummary,
  TelemetryRow,
} from "./types/telemetry";
import {
  fetchAnomalies,
  fetchSensorSummary,
  fetchTelemetryData,
} from "./api/telemetry";

const App = () => {
  const [summaries, setSummaries] = useState<SensorSummary[]>([]);
  const [anomalies, setAnomalies] = useState<AnomalyRow[]>([]);
  const [telemetryData, setTelemetryData] = useState<TelemetryRow[]>([]);

  useEffect(() => {
    fetchSensorSummary()
      .then((data) => setSummaries(data))
      .catch((err) => console.error("Error fetching summaries:", err));
    fetchAnomalies()
      .then((data) => setAnomalies(data))
      .catch((err) => console.error("Error fetching anomalies:", err));
    fetchTelemetryData()
      .then((data) => setTelemetryData(data))
      .catch((err) => console.error("Error fetching telemetry data:", err));
  }, []);

  return (
    <div>
      <h1>Telemetry Dashboard</h1>
      <div>
        {summaries.map((summary) => (
          <SummaryCard key={summary.sensor} data={summary} />
        ))}
      </div>
      <div>
        <h1>Anomalies</h1>
        {anomalies.map((anomaly) => (
          <AnomalyTable key={anomaly.sensor} data={anomaly} />
        ))}
      </div>
      <div>
        <h1>Telemetry Data</h1>
        {telemetryData.map((data) => (
          <TelemetryChart key={data.timestamp} data={data} />
        ))}
      </div>
    </div>
  );
};

export default App;
