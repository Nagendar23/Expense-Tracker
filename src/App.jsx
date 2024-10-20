import React from 'react'
import Header from './Components/Header.jsx'
import Balance from './Components/Balance.jsx'
import IncomeExpenses from './Components/IncomeExpenses.jsx'
import TranscationList from './Components/TranscationList.jsx'
import AddTransaction from './Components/AddTransaction.jsx'
import { GlobalProvider } from './context/GlobalState.jsx'


export default function App() {
  return (
   <GlobalProvider>
   <Header/>
   <div className="container">
    <Balance/>
    <IncomeExpenses/>
    <TranscationList/>
    <AddTransaction/>
   </div>
   </GlobalProvider>
  )
}
