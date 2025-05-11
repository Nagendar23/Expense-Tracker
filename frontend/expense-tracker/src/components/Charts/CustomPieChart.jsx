import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Text, Label} from 'recharts'
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

// Custom label component for center text
const CenterLabel = ({ viewBox, label, totalAmount }) => {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy - 20}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#666"
        fontSize="14px"
      >
        {label}
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#333"
        fontSize="24px"
        fontWeight="600"
      >
        {totalAmount}
      </text>
    </g>
  );
};

const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {
  console.log("PieChart props:", { data, label, totalAmount, colors, showTextAnchor });
  
  if (!data || data.length === 0) {
    return <div>No data available for chart</div>;
  }
  
  return (
    <ResponsiveContainer width='100%' height={380}>
      <PieChart>
        <Pie 
          data={data}
          dataKey='amount'
          nameKey='name'
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          {showTextAnchor && (
            <Label
              content={<CenterLabel label={label} totalAmount={totalAmount} />}
              position="center"
            />
          )}
        </Pie>
        <Tooltip content={<CustomTooltip/>} />
        <Legend content={<CustomLegend/>} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart
