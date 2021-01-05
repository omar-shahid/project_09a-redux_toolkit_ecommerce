import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import { RootState } from "../app/store"
import { Product } from "../types"

export type CartItem = (Product & {quantity: number, qtyPrice: number})

type CartState = {
    items: CartItem[],
    totalQtyPerItem: number
    totalPrice: number
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    totalQtyPerItem: 0,
}
export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        addProduct: (state, action: PayloadAction<CartItem>) => {
            const productFound = state.items.find(el => el.id === action.payload.id);
            if(productFound){
                state.items[state.items.indexOf(productFound)].quantity += 1 
                state.items[state.items.indexOf(productFound)].qtyPrice +=  state.items[state.items.indexOf(productFound)].qtyPrice 
            }
            else{

            state.items.push(action.payload)
            state.totalQtyPerItem+= 1;
            }
        },
        removeProduct: (state, action: PayloadAction<CartItem["id"]>) => {
            state.items = state.items.filter(el => el.id !== action.payload)
            state.totalQtyPerItem -= 1;
        },
        addQuantity: (state, action: PayloadAction<number>) => {
            
            const productFound = state.items.find(el => el.id === action.payload);
            if(productFound){
                state.items[state.items.indexOf(productFound)].quantity += 1 
                state.items[state.items.indexOf(productFound)].qtyPrice +=  state.items[state.items.indexOf(productFound)].price 
            }
        },

        removeQuantity: (state, action: PayloadAction<number>) => {
            
            const productFound = state.items.find(el => el.id === action.payload);
            if(productFound){
                state.items[state.items.indexOf(productFound)].quantity -= 1 
                state.items[state.items.indexOf(productFound)].qtyPrice -=  state.items[state.items.indexOf(productFound)].price 
            }
        }
    }
})

export const itemsSelector = (state:RootState) => state.cart.items
export const totalQtySelector = (state:RootState) => state.cart.totalQtyPerItem
export const totalPriceSelector = (state:RootState) => state.cart.totalPrice

export default cartSlice.reducer