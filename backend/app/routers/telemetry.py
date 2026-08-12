from fastapi import APIRouter, HTTPException
from app.models.telemetry import TelemetryRow, AnomalyRow, SensorSummary
from app.services.telemetry import get_telemetry_data, get_anomalies, get_sensor_summary

router = APIRouter()


@router.get("/telemetry", response_model=list[TelemetryRow], tags=["Telemetry"])
def read_telemetry_data():
    try:
        return get_telemetry_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/anomalies", response_model=list[AnomalyRow], tags=["Anomalies"])
def read_anomalies():
    try:
        return get_anomalies()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get(
    "/sensor_summary", response_model=list[SensorSummary], tags=["Sensor Summary"]
)
def read_sensor_summary():
    try:
        return get_sensor_summary()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
