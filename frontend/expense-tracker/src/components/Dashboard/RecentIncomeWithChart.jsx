import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const preparedData = data.map((item) => ({
        name: item.source,
        amount: item.amount,
      }));
      setChartData(preparedData);
    }
  }, [data]);

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 60 Days Income</h5>
      </div>
      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`₹ ${totalIncome}`}
        colors={COLORS}
        showTextAnchor={true}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
