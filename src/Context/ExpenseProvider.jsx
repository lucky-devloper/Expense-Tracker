import React, { createContext, useReducer } from 'react'

export const ExpenseContext = createContext()
function ExpenseProvider({ children }) {
    const initialState = [
        
    ]

    const reducer = (state, action) => {
        switch (action.type) {
            case "Add Expanse":
                return [...state, action.payload];

            default:
                break;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <ExpenseContext.Provider value={{ state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseProvider