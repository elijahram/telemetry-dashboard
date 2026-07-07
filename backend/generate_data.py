import pandas as pd
import numpy as np
import random

# Normal operating ranges
THRESHOLDS = {
    "temperature": (15, 35),  # Celsius
    "pressure": (0.8, 1.2),  # atm
    "voltage": (22, 28),  # volts
    "battery": (20, 100),  # percent
}

telemetry_data = []
for x in range(1000):
    row = {"timestamp": x}
    for sensor, (low, high) in THRESHOLDS.items():
        row[sensor] = np.random.uniform(low, high)
    telemetry_data.append(row)


anomaly_indices = random.sample(range(1000), 8)


def generate_anomaly_value(low, high):
    num_high = random.uniform(high, high * 1.5)
    num_low = random.uniform(low * 0.5, low)
    return random.choice([num_low, num_high])


for index in anomaly_indices:
    random_sensor = random.choice(list(THRESHOLDS.keys()))
    low, high = THRESHOLDS[random_sensor]
    telemetry_data[index][random_sensor] = generate_anomaly_value(low, high)


df = pd.DataFrame(telemetry_data)
df.to_csv("telemetry.csv", index=False)
print("telemetry.csv generated successfully")
