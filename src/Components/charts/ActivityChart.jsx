import React from 'react';
import { Cell, Pie, PieChart } from 'recharts';

const ActivityStatisticsChart = () => {
  const data = [
    { name: ' Active User', value: 1576 },
    { name: 'Active Driver', value: 750 },
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ['#9333EA', '#E9D5FF'];

  return (
    <div className="bg-purple-50 rounded-xl p-6 w-full h-[450px]">
      <h1 className="!text-sm xl:!text-2xl font-bold text-purple-950 mb-6">
        Activity Statistics
      </h1>

      <div className="relative h-64 flex justify-center">
        {/* PieChart Component */}
        <PieChart width={240} height={240}>
          <Pie
            data={data}
            cx={120}
            cy={120}
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                strokeWidth={0}
              />
            ))}
          </Pie>
        </PieChart>

        {/* Center Total Value */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-xl xl:text-3xl font-bold text-gray-800">
            {totalValue}
          </div>
        </div>
      </div>

      {/* Legend Section */}
      <div className="mt-6 space-y-4">
        {data.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-xl text-gray-800">{entry.name}</span>
            </div>
            <div className="bg-purple-100 rounded-lg px-4 py-1 text-xl text-purple-400">
              {entry.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStatisticsChart;
