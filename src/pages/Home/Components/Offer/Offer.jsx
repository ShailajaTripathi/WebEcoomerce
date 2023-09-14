import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SlickSliderComp from "../../../../components/SlickSliderComp/SlickSliderComp";
import { checkout, productlisting } from "../../../../config/RoutingConsts";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getOderSummarySuccess,
  productListing,
} from "../../../../Redux/Slices/ProductSlice";
import { PRODUCT_LIST } from "../../../../Redux/SagaAction/actions";
import { offer } from "../../../../Data/data";
import Slider from "react-slick";
export const Offer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { productsList } = useSelector((state) => state.ProductSlice);
  // console.log(productsList,"productsList")
  const dispatch = useDispatch();
  const { title } = useLocation();
  // const [DataLimit, setDataLimit] = useState(10);
  const [curentPage, setCurentPage] = useState(1);
  const handleCart = (data) => {
    let cart = null;
    cart = {
      id: data?.id,
      productName: data?.productName,
      description: data?.description,
      color: data?.addVariant?.[0]?.color,
      colorId: data?.addVariant?.[0]?.colorId,
      productImages: data?.addVariant?.[0]?.productImages,
      productSku: data?.addVariant?.[0]?.productSku,
      // variantList:s,
      size: data?.addVariant?.[0]?.variantList?.[0]?.size,
      sellingPrice: data?.addVariant?.[0]?.variantList?.[0]?.sellingPrice,
      qty: 1,
      sizeId: data?.addVariant?.[0]?.variantList?.[0]?.sizeId,
      availableQty: data?.addVariant?.[0]?.variantList?.[0]?.availableQty,
      PLength: data?.addVariant?.[0]?.variantList?.[0]?.PLength,
      mrp: data?.addVariant?.[0]?.variantList?.[0]?.mrp,
      _id: data?.addVariant?.[0]?.variantList?.[0]?._id,
      orderSummary: true,
    };
    dispatch(getOderSummarySuccess(cart));
    return navigate(checkout);
  };
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  // useEffect(() => {
  //   dispatch({
  //     type: PRODUCT_LIST,
  //     params: {
  //       page: curentPage,
  //       limit: 21,
  //       search: "",
  //       sortBy: "",
  //       sortKey: "",
  //     },
  //   });
  // }, []);
  return (
    //  (productsList) &&
    <div className="offer ptb">
      <Container>
        <div className="title-wraper">
          <h2>{`${t("homepage.offersfromdiscount.title")}`}</h2>
          <div
            className="custom-link view-link"
            onClick={() =>
              navigate(`productlisting/${productsList?.[0]?.categoryId}`, {
                state: productsList?.[0]?.categoryName,
              })
            }
          >{`${t("button.viewbtn")}`}</div>
        </div>
        <div>
          {productsList?.length === 0 && (
            <p className="no-data-found"> No data found</p>
          )}

          <div className="custom-slider">
            <Slider {...settings}>
              {productsList?.length > 0 &&
                productsList?.map((list, index) => {
                  return (
                    <div className="image-box">
                      <div className="image-hover">
                        <img
                          src={list?.addVariant?.[0]?.productImages?.[0]?.image}
                          alt="product-images"
                          onClick={() => {
                            navigate(`productdetail/${list?.id}`);
                          }}
                          // onClick={() => {
                          //   navigation &&
                          //     navigate(`productlisting/${sc?.categoryName}`);
                          // }}
                          // onClick={() => {
                          //   navigation && dispatch(setProductIdSuccess(sc?.id));
                          //   dispatch({ type: VIEW_PRODUCT, payload: sc?.id });
                          //   navigate(`/productdetail/${sc?.id}`);
                          // }}
                        />
                      </div>
                      <div className="image-content">
                        <h5>{list?.productName}</h5>
                        <button
                          type="submit"
                          className="custom-link"
                          onClick={() => {
                            handleCart(list);
                          }}
                        >
                          Shop Now
                        </button>
                        <button type="submit" className="custom-link">
                          {list?.link}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </Slider>

            {/* <SlickSliderComp
              offerData={productsList}
              num={4}
              homePage={true}
              navigation={true}
              shop={true}
            /> */}
          </div>
        </div>
      </Container>
    </div>
  );
};
