import React, { useCallback, useState, useRef, useEffect } from "react";
import ProductImage from "../../../../assets/images/product-image1.png";
import CartIcon from "../../../../assets/icons/black-cart-icon.svg";
import WishListIcon from "../../../../assets/icons/black-wishlist-icon.svg";
import Pagination from "../../../../components/Pagination/Pagination";
import { NavLink, useNavigate } from "react-router-dom";
import requestApi from "../../../../utils/request";
import OfferLabel from "../OfferLabel/OfferLabel";
import ProductCard from "./ProductCard";
import { ProductListing } from "../../../../Data/data";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const ProductGallary = () => {
  let { cartItems, productsList, wishlistItems,totalCount } = useSelector(
    (state) => state.ProductSlice
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DataLimit, setDataLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlistItem, setWishListItem] = useState(wishlistItems);
  const [cart, setCart] = useState(cartItems);
  // const { wishlistItems } = useSelector(  (state) => state.ProductSlice);
  const handleChangePage = useCallback(
    (currentPage) => {
      setCurrentPage(currentPage);
    },
    [currentPage]
  );
  const AddedToCart = (title) => {
    toast.success(`${title} added to cart !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const existToCart = (title) => {
    toast.warn(`${title} already added to cart!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const existToWishlist = (title) => {
    toast.warn(`${title} already added to wishlist!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const AddedToWishlist = (title) => {
    toast.success(`${title} added to Wishlist!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <>
      {productsList?.length === 0 && (
        <p className="no-data-found"> No data found</p>
      )}
      <div className="product-gallary-list">
        {productsList?.length > 0 &&
          productsList?.map((data, key) => {
            return (
              <ProductCard
                data={data}
                key={key}
                wishlistItem={wishlistItem}
                setWishListItem={setWishListItem}
                cart={cart}
                setCart={setCart}
                AddedToCart={AddedToCart}
                existToCart={existToCart}
                AddedToWishlist={AddedToWishlist}
                existToWishlist={existToWishlist}
              />
            );
          })}
      </div>
      <ToastContainer />
      {/* <Pagination total={5} current={1} onChangePage={handleChangePage} /> */}
      { totalCount > 16 && (
        <div className="pagination">
          <Pagination
            total={Math.ceil(totalCount / DataLimit)}
            current={currentPage}
            onChangePage={handleChangePage}
          />
        </div>
      )}
    </>
  );
};

export default ProductGallary;
