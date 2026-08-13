export interface TelemetryRow {
    timestamp: number;
    temperature: number;
    pressure: number;
    voltage: number;
    battery: number;
}

export interface AnomalyRow extends TelemetryRow {
    sensor: string;
}

export interface SensorSummary {
    sensor: string;
    min_value: number;
    max_value: number;
    mean_value: number;
    std_dev: number;
}