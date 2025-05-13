import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { ToastContainer, toast } from 'react-toast'
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
const Expense = () => {
  useUserAuth();

    const [OpenAddExpenseModal, setOPenAddExpenseModal] = useState(false)
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
      show:false,
      data:null,
    });

      //Get All expense details
  const fetchExpenseDetails = async() => {
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.log("Failed to fetch expense details",error);
    }finally{
      setLoading(false); // Make sure to reset loading state
    }
  };

  //handle add expense
  const handleAddExpense = async(expense) => {
    const {category, amount, date, icon} = expense;

    //validation checks
    if(!category.trim()){
      toast.error("category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      setOPenAddExpenseModal(false);
      toast.success("Expense added successfully");
      
      // Immediately fetch updated expense data
      await fetchExpenseDetails();
    } catch(error){
      console.error("Error adding expense", error.response?.data?.message || error.message);
      toast.error("Failed to add expense");
    }
  };

   //delete expense
  const deleteExpense = async(id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Expense deleted successfully");
      await fetchExpenseDetails();
    } catch(error) {
      console.error("Error deleting expense", error.response?.data?.message || error.message);
      toast.error("Failed to delete expense");
    }
  };

  //handle download expense details
  const handleDownloadExpense = async()=>{
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,{
          responseType:"blob",
        }
      )
      //create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.log("Failed to download expense details",error);
      toast.error("Failed to download expense details");
    }
  };


    useEffect(()=>{
      fetchExpenseDetails();

      return ()=>{};
    },[])
  
  return (
 <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
            transactions= {expenseData}
            onExpenseIncome = {()=>setOPenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
          transactions={expenseData}
          onDelete={(id)=>{
            setOpenDeleteAlert({show:true, data:id})
          }}
          onDownload={handleDownloadExpense}
          ></ExpenseList>
        </div>

      <Modal
      isOpen={OpenAddExpenseModal}
      onClose={()=> setOPenAddExpenseModal(false)}
      title="Add Expense" >
        <AddExpenseForm onAddExpense={handleAddExpense}/>
         </Modal>

      <Modal 
        isOpen={openDeleteAlert.show}
        onClose={()=> setOpenDeleteAlert({show:false, data:null })}
        title="Delete Expense"
        >
          <DeleteAlert
             content="Are you sure you want to delete this expense?"
          onDelete={()=>deleteExpense(openDeleteAlert.data)}
          />
        </Modal>


      </div>
 </DashboardLayout>
  )
}

export default Expense
