type Props = {
  title: string;
  value: string | number;
};

export default function MetricCard({ title, value }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}