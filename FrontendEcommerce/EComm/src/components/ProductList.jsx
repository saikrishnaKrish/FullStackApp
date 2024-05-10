import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart } from "../Store/CartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product, handleAddProduct, handleDeleteProduct, cartQuantity }) => {

  return (
    <div key={product?._id} className="product">
      <Link to={`/product/${product?._id}`}>
        <img src={product?.image} alt="" className='product_image' />
        <div className="product_meta">
          <p className="product_title">{product?.title}</p>
          <p className='Price'>$ {product?.price}</p>
        </div>
      </Link>
      <div className="add_To_cart_container">

        <AddBox onClick={() => handleAddProduct(product)} />
        <div className="currentCartCount">{cartQuantity}</div>
        <IndeterminateCheckBox onClick={() => handleDeleteProduct(product)} />
      </div>
    </div>
  );
};

const ProductList = ({ productList }) => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector(store => store.cartReducer);

  const handleAddProduct = (product) => {
 
    dispatch(addToCart(product));
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteFromCart(product));
  };

  const getCartQuantity = (productId) => {
    const productInCart = cartProducts.find(item => item.id === productId);
    return productInCart ? productInCart.indQuantity : 0;
  };

  return (
    <>
      {productList ? (
        productList?.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddProduct={handleAddProduct}
            handleDeleteProduct={handleDeleteProduct}
            cartQuantity={getCartQuantity(product.id)}
          />
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
};

export default ProductList;
