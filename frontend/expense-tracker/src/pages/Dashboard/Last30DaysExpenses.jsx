import React, { useEffect, useState } from 'react'
import {prepareExpenseBarChartData} from '../../utils/helper';
import CustomBarChart from '../../components/Charts/customBarChart';

const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () =>{}
    },[data]);

    const customBarChart = ({data}) =>{
        //function to alternate colors
        const getBarColor = (index) =>{
            return index % 2 === 0? "#875CF5" : "#CFBEFB";
        };

        const CustomTooltip = ({active, payload}) =>{
            if(active && payload && payload.length){
                return(
                    <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
                        <p className='text-xs font-semibold text-shadow-purple-800 '>{payload[0].payload.category}</p>
                        <p  className='text-sm text-gray-600 '>
                            Amount: <span className='text-sm font-medium text-shadow-gray-900 '>₹{payload[0].payload.amount}</span>
                        </p>
                    </div>
                );
            }
            return null;
        };
    }

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg '>Last 30 Days Expenses</h5>
        </div>
        <CustomBarChart data={chartData}/>

    </div>
  )
}

export default Last30DaysExpenses
