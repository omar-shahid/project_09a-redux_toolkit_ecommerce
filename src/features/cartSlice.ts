import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { Product } from "../types"

type CartItem = (Product & {quantity: number})

type CartState = CartItem[]

const initialState: CartState = []

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        addProduct: (state, action: PayloadAction<CartItem>) => {
            if(state.includes(action.payload))
            state[state.indexOf(action.payload)].quantity += 1 
            else
            state.push(action.payload)
        },
        removeProduct: (state, action: PayloadAction<CartItem["id"]>) => {
            state = state.filter(el => el.id === action.payload)
        }
    }
})

export default cartSlice.reducer