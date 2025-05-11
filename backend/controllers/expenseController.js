const User = require('../models/User')
const Expense = require('../models/Expense');
const xlsx = require('xlsx');

//AddExpense source
exports.addExpense = async(req,res)=>{
    const userId = req.user._id;
    try{
        const {icon, category, amount, date} = req.body;
        //validation: check for missing fields
        if(!category || !amount){
            return res.status(400).json({message:"All fields are required"})
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        console.log(newExpense);
        res.status(200).json(newExpense)
    }catch(err){
        console.log("failed to add expense , Internal Server Error");
        return res.status(500).json({message:"Internal server error"})
    }
}

//getAllExpense source
exports.getAllExpense = async(req,res)=>{
    const userId = req.user._id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});
        console.log(expense);
        res.status(200).json(expense);
    }catch(error){
        console.log("failed to get all expense , Internal Server Error");
        return res.status(500).json({message:"Internal server error"})
    }
}

//deleteExpense source
exports.deleteExpense = async(req,res)=>{
    const userId = req.user._id;
    try{
        await Expense.findByIdAndDelete(req.params.id);
        console.log("Expense deleted successfully");
        res.status(200).json({message:"Expense deleted successfully"});
    }catch(error){
        console.log("Failed to delete the expense",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

//downloadExpenseExcel source
exports.downloadExpenseExcel = async(req,res)=>{
    const userId = req.user._id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});

        //prepare data for Excel
        const data = expense.map((item)=>({
            Source:item.category,
            Amount:item.amount,
            Date:item.date,
    }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    }catch(error){
        console.log("Failed to download the expense",error);
        return res.status(500).json({message:"Internal server error"})
    }
}