import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ProductListing } from "../../Data/data";
import SlickSliderComp from "../../components/SlickSliderComp/SlickSliderComp";
import Specification from "./Specification/Specification";
import Information from "./AdditionalInformation/Information";
import Disclaimer from "./Disclaimer/Disclaimer";
import Reviews from "./ProductReviews/Reviews";
import ProductZoom from "./ProductZoom/ProductZoom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_LIST, VIEW_REVIEW } from "../../Redux/SagaAction/actions";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//  const viewProduct =  {
//       "id": "64e6efe185a3bbd75fe1d118",
//       "sellerName": "MAULIK PATEL",
//       "mainCategoryId": "648aab6e77602867bf4969c4",
//       "mainCategoryName": "Men",
//       "categoryId": "648ac3deca3c1cb3aa4c986c",
//       "categoryName": "Western",
//       "productName": "UNiK  Drafting By Maulik",
//       "productWeight": 1520,
//       "materialId": "648aef025b2d3c62958a1fc9",
//       "materialName": "Linen",
//       "typeId": "648becc809f816e32a3eb682",
//       "type": "Wedding wear3",
//       "countryId": "64899170dc7f78ae40c64595",
//       "gst": 14,
//       "description": "Ivory Kurta Set With Jacquard Nehru Jacket",
//       "addVariant": [
//           {
//               "productSku": "155761AA2FF",
//               "colorId": "648ae6111832112fb2047e56",
//               "color": "Pink",
//               "productImages": [
//                   {
//                       "image": "http://110.227.212.251:3012/public/uploads/seller/PImage_169285628995962.jpg",
//                       "_id": "64e6efe285a3bbd75fe1d124"
//                   }
//               ],
//               "variantList": [
//                   {
//                       "sizeId": "648ae1ab646e446281267ff0",
//                       "sellingPrice": 1080,
//                       "mrp": 1080,
//                       "availableQty": 1,
//                       "_id": "64e6efe285a3bbd75fe1d127",
//                       "size": "XXL",
//                       "PLength": "regular"
//                   }
//               ]
//           },
//           {
//               "productSku": "1239D16A7F2",
//               "colorId": "648ae6201832112fb2047e62",
//               "color": "White",
//               "productImages": [
//                   {
//                       "image": "http://110.227.212.251:3012/public/uploads/seller/PImage_169285629004166.jpg",
//                       "_id": "64e6efe285a3bbd75fe1d129"
//                   }
//               ],
//               "variantList": [
//                   {
//                       "sizeId": "648ae1bf646e446281267ffb",
//                       "sellingPrice": 2100,
//                       "mrp": 2100,
//                       "availableQty": 12,
//                       "_id": "64e6efe285a3bbd75fe1d12c",
//                       "size": "XM",
//                       "PLength": "regular"
//                   },
//                   {
//                       "sizeId": "648ae1db646e446281268006",
//                       "sellingPrice": 510,
//                       "mrp": 510,
//                       "availableQty": 2,
//                       "_id": "64e6efe285a3bbd75fe1d12d",
//                       "size": "L",
//                       "PLength": "regular"
//                   },
//                   {
//                       "sizeId": "648adeeb9455a508d1d13174",
//                       "sellingPrice": 900,
//                       "mrp": 900,
//                       "availableQty": 3,
//                       "_id": "64e6efe285a3bbd75fe1d12e",
//                       "size": "M",
//                       "PLength": "regular"
//                   }
//               ]
//           }
//       ],
//       "status": 1
//   }

const settings1 = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  variableWidth: false,
  responsive: [
    {
      breakpoint: 1199,
      settings1: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 991,
      settings1: {
        slidesToShow: 2,
        slidesToScroll: 2,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 767,
      settings1: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
      },
    },
  ],
};

const ProductDetail = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const { productId: id } = useParams();
  let {
    productsList,
    viewProduct,
    ProductlistLoading,
    ProductDetailLoading,
    reviewLoading,
    loading,
    productId,
  } = useSelector((state) => state.ProductSlice);

  const AddedToCart = (title) => {
    toast.success(`${title} product Added to cart !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const existToCart = (title) => {
    toast.warn(`${title} already added to cart!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const CodeCopied = (code) => {
    toast.success(`${code} code copied !`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const existCode = () => {
    toast.warn(`please copy again`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const AddedToWishlist = (title) => {
    toast.success(`${title} added to Wishlist!`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  useEffect(() => {
    setColor(viewProduct?.addVariant?.[0]?.colorId);
    setSize(viewProduct?.addVariant?.[0]?.variantList?.[0]?.sizeId);
    dispatch({
      type: VIEW_REVIEW,
      payload: { productId: id },
    });
    dispatch({
      type: PRODUCT_LIST,
    });
  }, [productId, viewProduct]);

  return (
    <>
      {(ProductlistLoading || reviewLoading || ProductDetailLoading) && (
        <Loader />
      )}

      <div className="pb-50">
        {viewProduct && (
          <ProductZoom
            AddedToCart={AddedToCart}
            existToCart={existToCart}
            CodeCopied={CodeCopied}
            existCode={existCode}
            AddedToWishlist={AddedToWishlist}
            setColor={setColor}
            setSize={setSize}
            color={color}
            size={size}
          />
        )}
      </div>
      <div className="product-features ptb">
        <Container>
          <Tabs defaultActiveKey="specifications" id="noanim-tab-example">
            <Tab eventKey="specifications" title="Specifications">
              <Specification />
            </Tab>
            {/* <Tab
              eventKey="additionalinformation"
              title="Additional Information"
            >
              <Information/>
            </Tab> */}
            {/* <Tab eventKey="disclaimer" title="Disclaimer">
              <Disclaimer/>
            </Tab> */}
            <Tab eventKey="reviews" title="Reviews">
              <Reviews />
            </Tab>
          </Tabs>
        </Container>
      </div>
      {productsList?.length !== 0 && (
        <div className="similar-product ptb">
          <Container>
            <div className="title-wraper">
              <h2>Similar Products</h2>
              <div
                className="custom-link view-link"
                onClick={() =>
                  navigate(`/productlisting/${viewProduct?.categoryId}`, {
                    state: "Similar Products",
                  })
                }
              >{`${t("button.viewbtn")}`}</div>
            </div>
            <div className="custom-slider">
              <SlickSliderComp content={productsList} setting={settings1} cart={true}/>
              {/* <SlickSliderComp content={productsList} num={4} isProduct={4} /> */}

            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
