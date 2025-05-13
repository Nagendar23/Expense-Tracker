import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import CustomTooltip from './CustomTooltip'

// Define the getBarColor function
const getBarColor = (index) => {
  return index % 2 === 0 ? "#875CF5" : "#CFBEFB";
};

const CustomBarChart = ({data}) => {
  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width='100%' height={300}>
            <BarChart data={data}>
                <CartesianGrid stroke='none'/>
                <XAxis 
                  dataKey='source' 
                  tick={{fontSize:12, fill:'#555',}} 
                  stroke='none'
                />
                <YAxis tick={{fontSize:12, fill:'#555'}} stroke='none'/>

                <Tooltip content={<CustomTooltip />} />

                <Bar 
                dataKey='amount'
                fill='#FF8042'
                radius={[10,10,0,0]}
                activeDot = {{r:8, fill:"yellow"}}
                >
                    {data && data.map((entry, index)=>(
                        <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
