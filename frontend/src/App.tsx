import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "./api/config";
import SummaryCard from "./components/Summary/SummaryCard";
import type { SensorSummary } from "./types/telemetry";

const App = () => {
  const [summaries, setSummaries] = useState<SensorSummary[]>([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/sensor_summary`)
      .then((res) => setSummaries(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Telemetry Dashboard</h1>
      {summaries.map((summary) => (
        <SummaryCard key={summary.sensor} data={summary} />
      ))}
    </div>
  );
};

export default App;
