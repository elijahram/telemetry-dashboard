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
    Promise.all([fetchSensorSummary(), fetchAnomalies(), fetchTelemetryData()])
      .then(([summaries, anomalies, telemetryData]) => {
        setSummaries(summaries);
        setAnomalies(anomalies);
        setTelemetryData(telemetryData);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
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
          <AnomalyTable
            key={`${anomaly.sensor}-${anomaly.timestamp}`}
            data={anomaly}
          />
        ))}
      </div>
      <div>
        <h1>Telemetry Data</h1>
        <TelemetryChart data={telemetryData} anomalies={anomalies} />
      </div>
    </div>
  );
};

export default App;
