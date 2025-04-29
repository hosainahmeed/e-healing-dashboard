import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import React, { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import { useGrowthOverviewQuery } from '../../Redux/services/dashboard apis/total-overview/totalOverviewApis';
import Loader from '../Shared/Loaders/Loader';

const UserGrowthChart = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);
  const [role] = useState('USER');
  const { data, isLoading } = useGrowthOverviewQuery({ role, year });

  useEffect(() => {
    const years = data?.data?.total_years || [];
    const yearsArray = years.map((year) => year);
    setYears(yearsArray);
  }, [currentYear, data]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthMap = data?.data?.monthlyRegistration || {};

    // This part is incorrect since data.data is not an array
    // if (!isLoading && data?.data) {
    //   data?.data?.forEach(({ month, totalUser }) => {
    //     if (month in monthMap) {
    //       monthMap[month] = totalUser;
    //     }
    //   });
    // }

    const maxUsers = Math.max(...Object.values(monthMap), 0) + 4;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: month,
        totalUser: monthMap[month],
      })),
      maxUsers,
    };
  }, [data]);

  return (
    <div
      style={{
        width: '100%',
        height: '450px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {isLoading ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <h3
            style={{
              textAlign: 'left',
              marginBottom: '15px',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '18px',
            }}
          >
            📈 User Growth Chart
          </h3>
          <Select
            loading={isLoading}
            className="min-w-32"
            value={year}
            placeholder="Select year"
            onChange={setYear}
            style={{
              marginBottom: '15px',
              width: '150px',
              fontWeight: '500',
            }}
            options={years.map((item) => ({ value: item, label: item }))}
          />
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333EA" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#9333EA" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis
                dataKey="name"
                stroke="#333"
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                stroke="#333"
                domain={[0, maxUsers]}
                tick={{ fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '8px',
                }}
                cursor={{ fill: 'rgba(170,119,217,0.1)' }}
              />
              <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 'bold' }} />
              <Bar
                dataKey="totalUser"
                fill="url(#colorUv)"
                barSize={75}
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};

export default UserGrowthChart;
