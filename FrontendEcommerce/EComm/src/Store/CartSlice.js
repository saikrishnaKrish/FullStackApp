import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cartSlice",
    initialState:{
        cartQuantity:0,
        cartProducts:[]
    },
    reducers:{
            addToCart:(state,action)=>{
                    state.cartQuantity++;
                    console.log(state.cartProducts)
                    const productToBeAdded =action.payload;
                    console.log(productToBeAdded.id)
                    const requiredProduct = state.cartProducts.find((pid)=>productToBeAdded.id==pid.id)
                        console.log(requiredProduct)
                    if(!requiredProduct){
                        //     requiredProduct.indQuantity=1
                            state.cartProducts.push({...productToBeAdded,indQuantity:1})
                    }else{
                            requiredProduct.indQuantity++;
                    }
            },
            deleteFromCart:(state,action)=>{
                    
                        const productToBeDeleted = action.payload;
                        const productIdx = state.cartProducts.findIndex((pid)=>pid.id==productToBeDeleted.id);
                        if(productIdx==-1){
                                        return
                       }else{
                                let product = state.cartProducts[productIdx];
                                if(product.indQuantity==0){
                                        state.cartProducts.splice(productIdx,0);
                                }
                                else{
                                        state.cartProducts[productIdx].indQuantity--;
                                        state.cartQuantity--;
                                }
                       }
            }
    }
})

export const {addToCart,deleteFromCart} =cartSlice.actions

export default cartSlice;