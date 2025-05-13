import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toast'
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth';

const Income = () => {
    useUserAuth();
  
  const [OpenAddIncomeModal, setOPenAddIncomeModal] = useState(false)

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });

  //Get All income details
  const fetchIncomeDetails  = async()=>{
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if(response.data){
        setIncomeData(response.data);
      }
    }catch(error){
      console.log("Failed to fetch income details",error);
    }
    // finally{
    //   setLoading(false);
    // }
  };

  //handle add income
  const handleAddIncome = async(income) => {
    const {source, amount, date, icon} = income;

    //validation checks
    if(!source.trim()){
      toast.error("Source is required");
      return;
    }

    if(!amount || isNaN(amount) || Number(amount) <= 0){
      toast.error("Amount should be a valid number greater than 0")
      return;
    }
    if(!date){
      toast.error("Date is required");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOPenAddIncomeModal(false);
      toast.success("Income added successfully");
      await fetchIncomeDetails(); 
    } catch(error){
      console.error("Error adding income", error.response?.data?.message || error.message);
      toast.error("Failed to add income");
    }
  };

  //delete income 
  const handleDeleteIncome = async(id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Income deleted successfully");
      await fetchIncomeDetails(); // Added await to ensure it completes before continuing
    } catch(error) {
      console.error("Error deleting income", error.response?.data?.message || error.message);
      toast.error("Failed to delete income");
    }
  };

  //handle download income details
  const handleDownloadIncome = async()=>{
    try{
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType:"blob",
        }
      )
      //create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.log("Failed to download income details",error);
      toast.error("Failed to download income details");
    }
  };

  useEffect(()=>{
    fetchIncomeDetails();

    return()=>{};
  },[])

  return (
   <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
            transactions={incomeData}
            onAddIncome={()=> setOPenAddIncomeModal(true)}
            />
          </div>

          <IncomeList 
          transactions={incomeData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true, data:id})
          }}
          onDownload = {handleDownloadIncome}
          />
        </div>
        <Modal 
        isOpen={OpenAddIncomeModal}
        onClose={()=> setOPenAddIncomeModal(false)} 
        title={`Add Income`}>

          <AddIncomeForm 
          onAddIncome={handleAddIncome}
          />
        </Modal>


        <Modal 
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show:false, data:null })}
        title="Delete Income"
        >
          <DeleteAlert
             content="Are you sure you want to delete this income?"
          onDelete={()=>handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income
