import React from 'react'
import ProductList from '../ProductList'
import { useSelector } from 'react-redux'

const Cart = () => {
  const productList = useSelector((store)=>store.cartReducer.cartProducts)
  return (
    <>
        <div>Cart </div>
        <h2>Add to Product List</h2>
        <div className='cart_product_wrapper'> 
            <ProductList  productList={productList}/>
        </div>
    </>
  )
}

export default Cart