import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState' 

export default function Transaction({transactions}) {
  const {deleteTransaction}=useContext(GlobalContext);

    const sign = transactions.amount < 0 ? '-' : '+';
  return (
    <>
    <li className={transactions.amount < 0 ? 'minus': 'plus' }>
        {transactions.text} <span>{sign}${Math.abs(transactions.amount)}</span>
        <button onClick={()=>{
          deleteTransaction(transactions.id)
        }} className='delete-btn'>X</button>
    </li>
    </>
  )
}
