import axios from "axios";
import { API_BASE_URL } from "./config";
import type {
  SensorSummary,
  AnomalyRow,
  TelemetryRow,
} from "../types/telemetry";

export const fetchSensorSummary = async (): Promise<SensorSummary[]> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/sensor_summary`);
    return res.data;
  } catch (error) {
    console.error("Error fetching sensor summary:", error);
    throw error;
  }
};

export const fetchAnomalies = async (): Promise<AnomalyRow[]> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/anomalies`);
    return res.data;
  } catch (error) {
    console.error("Error fetching anomalies:", error);
    throw error;
  }
};

export const fetchTelemetryData = async (): Promise<TelemetryRow[]> => {
  try {
    const res = await axios.get(`${API_BASE_URL}/telemetry`);
    return res.data;
  } catch (error) {
    console.error("Error fetching telemetry data:", error);
    throw error;
  }
};
