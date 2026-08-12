import pandas as pd
from app.models.telemetry import TelemetryRow, AnomalyRow, SensorSummary
from typing import List
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
df = pd.read_csv(os.path.join(BASE_DIR, "../data/telemetry.csv"))
THRESHOLDS = {
    "temperature": (15, 35),  # Celsius
    "pressure": (0.8, 1.2),  # atm
    "voltage": (22, 28),  # volts
    "battery": (20, 100),  # percent
}


def get_telemetry_data() -> List[TelemetryRow]:
    """
    Function to retrieve telemetry data from the CSV file.

    Returns:
        List[TelemetryRow]: A list of TelemetryRow objects containing the telemetry data.
    """
    return [TelemetryRow(**row) for row in df.to_dict(orient="records")]


def get_anomalies() -> List[AnomalyRow]:
    """
    Function to identify anomalies in the telemetry data.

    Returns:
        List[AnomalyRow]: A list of AnomalyRow objects containing the anomalies detected in the telemetry data.
    """

    anomalies = []
    for sensor, (min_val, max_val) in THRESHOLDS.items():
        mask = (df[sensor] < min_val) | (df[sensor] > max_val)
        anomaly_rows = df[mask].copy()
        anomaly_rows["sensor"] = sensor
        anomalies.extend(
            [AnomalyRow(**row) for row in anomaly_rows.to_dict(orient="records")]
        )

    return anomalies


def get_sensor_summary() -> List[SensorSummary]:
    """
    Function to compute summary statistics for each sensor in the telemetry data.

    Returns:
        List[SensorSummary]: A list of SensorSummary objects containing the summary statistics for each sensor.
    """
    summaries = []
    for sensor in THRESHOLDS.keys():
        summary = {
            "sensor": sensor,
            "min_value": df[sensor].min(),
            "max_value": df[sensor].max(),
            "mean_value": df[sensor].mean(),
            "std_dev": df[sensor].std(),
        }

        summaries.append(SensorSummary(**summary))

    return summaries
