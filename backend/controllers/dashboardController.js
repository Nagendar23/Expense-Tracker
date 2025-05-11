const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { isValidObjectId } = require('mongoose');

//dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        // Since userId is already an ObjectId, we don't need to convert it
        const userObjectId = userId;

        //fetch total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);
        console.log("totalIncome", { totalIncome, userId: userObjectId, isValid: isValidObjectId(userObjectId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        //get income transactions in last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //get expense transactions in last 30 days
        const last30daysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //get total expense for last 30 days
        const expenseLast30Days = last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //fetch last 5 transactions (income + expenses)
        const last5Transactions = [
            ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),
        ].sort((a, b) => b.date - a.date); //sort latest first

        //final response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30daysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: last5Transactions
        });

    } catch (error) {
        console.log("Failed to get dashboard data", error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
