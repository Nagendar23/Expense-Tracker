const User = require('../models/User')
const Income = require('../models/Income');
const xlsx = require('xlsx');

//AddIncome source
exports.addIncome = async(req,res)=>{
    const userId = req.user._id;
    try{
        const {icon, source, amount, date} = req.body;
        //validation: check for missing fields
        if(!source || !amount){
            return res.status(400).json({message:"Source and amount are required"})
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        console.log(newIncome);
        res.status(200).json(newIncome)
    }catch(err){
        console.log("failed to add income , Internal Server Error");
        return res.status(500).json({message:"Internal server error"})
    }
}

//getAllIncome source
exports.getAllIncome = async(req,res)=>{
    const userId = req.user._id;
    try{
        const income = await Income.find({userId}).sort({date:-1});
        console.log(income);
        res.status(200).json(income);
    }catch(error){
        console.log("failed to get all income , Internal Server Error");
        return res.status(500).json({message:"Internal server error"})
    }
}

//deleteIncome source
exports.deleteIncome = async(req,res)=>{
    const userId = req.user._id;
    try{
        await Income.findByIdAndDelete(req.params.id);
        console.log("Income deleted successfully");
        res.status(200).json({message:"Income deleted successfully"});
    }catch(error){
        console.log("Failed to delete the income",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

//download excel source
exports.downloadIncomeExcel = async(req,res)=>{
    const userId = req.user._id;
    try{
        const income = await Income.find({userId}).sort({date:-1});

        //prepare data for Excel
        const data = income.map((item)=>({
            Source:item.source,
            Amount:item.amount,
            Date:item.date,
    }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    }catch(error){
        console.log("Failed to download the income",error);
        return res.status(500).json({message:"Internal server error"})
    }
}