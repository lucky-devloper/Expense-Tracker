import React from 'react'

function History({ color, expense }) {
    return (
        <div className='w-[100%] sm:h-[40px] lg:h-[50px] font-semibold flex rounded overflow-hidden mb-2'>
            <div className='w-[98%] flex justify-between items-center bg-white px-4 h-[100%] lg:text-[18px] sm:text-[14px]'>
                <p>{expense.type}</p>
                <p>${expense.amount}</p>
            </div>
            <span className={`${color} w-[2%]`}></span>
        </div>
    )
}

export default History