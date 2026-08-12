from pydantic import BaseModel


class TelemetryRow(BaseModel):
    timestamp: int
    temperature: float
    pressure: float
    voltage: float
    battery: float


class AnomalyRow(TelemetryRow):
    sensor: str


class SensorSummary(BaseModel):
    sensor: str
    min_value: float
    max_value: float
    mean_value: float
    std_dev: float
