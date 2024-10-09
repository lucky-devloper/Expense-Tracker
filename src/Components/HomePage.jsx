import React, { useContext, useEffect, useState } from 'react'
import History from './History'
import { ExpenseContext } from '../Context/ExpenseProvider'

function HomePage() {
    const { state, dispatch } = useContext(ExpenseContext)
    const [text, settext] = useState('')
    const [amount, setamount] = useState(0)
    const [totalIncome, settotalIncome] = useState(0)
    const [Expanse, setExpanse] = useState(0)
    const [leftamount, setleftamount] = useState()

    console.log(state);
    

    const getAmount = () => {
        if (text && amount) {
            dispatch({ type: "Add Expanse", payload: { type: text, amount: parseFloat(amount) } })
            settext('')
            setamount('')
        }
    }

    useEffect(() => {
        if (state.length > 0) {
            const totalamount = state.filter(item => item.amount > 1)
            const amount = totalamount.map(item => Number(item.amount))
            const income = amount.reduce((acc, curr) => acc + curr)
            settotalIncome(income.toFixed(2))
        }
    }, [state])

    useEffect(() => {
        if (state.length > 0) {
            const totalamount = state.filter(item => item.amount < 1)
            const expenseamount = totalamount.map(item => Number(item.amount))
            if (expenseamount.length > 0) {
                const expanse = expenseamount.reduce((acc, curr) => acc + curr)
                const userExpense = Math.abs(expanse)
                setExpanse(userExpense.toFixed(2))
            }
        }
    }, [state])

    useEffect(() => {
        if (totalIncome || Expanse) {
            setleftamount(totalIncome - Expanse)
        }
    }, [totalIncome, Expanse])




    return (
        <div className='sm:shadow-lg sm:p-2 lg:shadow-none sm:w-[330px] h-[100%] lg:w-[400px]'>
            <h1 className='text-2xl font-semibold text-center'>Expense Tracker</h1>
            <h2 className='font-semibold sm:mt-1 lg:text-xl'>Your Balance</h2>
            <p className='font-semibold text-2xl'>${leftamount}.00</p>
            <div className='w-[100%] lg:h-[100px] sm:h-[70px] mt-2 flex justify-center lg:shadow-lg'>
                <div className='lg:w-[50%] sm:w-[45%] h-[100%] flex items-center justify-center flex-col bg-white border-r-2 border-gray-300'>
                    <h1 className='lg:text-2xl font-semibold'>INCOME</h1>
                    <p className='lg:text-xl text-green-500 font-semibold'>{totalIncome}</p>
                </div>
                <div className='lg:w-[50%] sm:w-[45%] h-[100%] flex items-center justify-center flex-col bg-white'>
                    <h1 className='lg:text-2xl font-semibold'>EXPENSE</h1>
                    <p className='lg:text-xl text-red-700 font-semibold'>{Expanse}</p>
                </div>
            </div>
            <h1 className='mt-5 pb-2 sm:text-[16px] lg:text-xl font-semibold border-b-2 border-gray-300'>History</h1>
            <div className='history mt-2 sm:max-h-[195px] lg:max-h-[240px] overflow-y-auto lg:p-2 sm:p-1'>
                {state?.map((item, index) => {
                    if (item.amount > 1) {
                        return <History key={index} color={"bg-green-500"} expense={item} />
                    } else {
                        return <History key={index} color={"bg-red-700"} expense={item} />
                    }
                })}
            </div>
            <h1 className='pb-2 sm:text-[16px] lg:text-xl font-semibold border-b-2 border-gray-300'>Add new Transtion</h1>
            <div className='flex flex-col gap-2 lg:my-3 sm:my-2'>
                <label htmlFor="text" className='lg:text-xl'>Test</label>
                <input type="text" placeholder='Enter text...' value={text} onChange={(e) => settext(e.target.value)} className='lg:py-3 lg:px-4 sm:p-1 border-2 outline-none rounded' />
            </div>
            <div className='flex flex-col gap-2'>
                <span className=''>
                    <label htmlFor="amount" className='lg:text-xl'>Amount</label>
                    <p>(negative-expense-positive-income)</p>
                </span>
                <input type="number" value={amount} onChange={(e) => setamount(e.target.value)} placeholder='Enter Amount' className='lg:py-3 lg:px-4 sm:p-1 border-2 outline-none rounded' />
            </div>
            <button onClick={() => getAmount()} className='w-[100%] lg:my-3 sm:my-2 sm:py-2 bg-[#6d5db8] text-white lg:py-3 lg:text-xl lg:font-semibold border-none'>Add Transtion</button>
        </div>
    )
}

export default HomePage