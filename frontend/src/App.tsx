import { useEffect, useState } from "react";
import SummaryCards from "./components/SensorSummary/SummaryCards";
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
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Telemetry Dashboard
      </h1>
      <div className="mb-8">
        <SummaryCards data={summaries} />
      </div>
      <div className="mb-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Anomalies</h2>
        <AnomalyTable data={anomalies} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Telemetry Data
        </h2>
        <TelemetryChart data={telemetryData} anomalies={anomalies} />
      </div>
    </div>
  );
};

export default App;
