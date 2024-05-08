import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchData from '../Utility/useFetchData';
import './productDetailsComponent.css';
import URL from '../urlConfig'

// fetch('https://fakestoreapi.com/products/1')
//             .then(res=>res.json())
//             .then(json=>console.log(json))


const ProductDetailsComponent = () => {
    const id=useParams().id;
    const navigate = useNavigate();
    const {data:productDetails,isLoading,error}=useFetchData(`${URL.GET_PRODUCTS_URL}/${id}`)


  return (
    <div className='product_card'>
        {isLoading && <p>Loading....</p>}
        {
            productDetails && 
            <>
            <span className='product_image'>
                    <img src={productDetails.image} width={'200px'} height={'200px'}/>
                </span>
                <span className='product_details'>

                    <p>Title- {productDetails?.title}</p>
                    <p>
                        Description 
                        <br/>
                        {productDetails?.description}
                    </p>
                    <span>Category -- {productDetails?.category}</span>
                    {/* <RatingComponent rate={productDetails.rate}
                    count={productDetails.count}
                    ></RatingComponent> */}
                    {/* <AddToCart/> */}
                    <br/>
                    <button onClick={()=>navigate("/ecomm/home")}>Back To Home</button>
                </span>
            </>
        }
       


    </div>



  )
}

export default ProductDetailsComponent