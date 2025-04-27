import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("border-", "bg-")
            .replace("-500", "-100")} text-2xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
