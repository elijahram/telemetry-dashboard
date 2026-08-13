import type { SensorSummary } from "../../types/telemetry";

interface SummaryCardProps {
  data: SensorSummary;
}

const SummaryCard = ({ data }: SummaryCardProps) => {
  return (
    <div>
      <h2>{data.sensor}</h2>
      <p>Min: {data.min_value}</p>
      <p>Max: {data.max_value}</p>
      <p>Mean: {data.mean_value}</p>
      <p>Std Dev: {data.std_dev}</p>
    </div>
  );
};

SummaryCard.propTypes = {};

export default SummaryCard;
