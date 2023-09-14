import React, { useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb, Alert } from "react-bootstrap";
import Slider from "react-slick";
import RatingIcon from "../../../assets/icons/star.png";
import { ReactComponent as IconOffer } from "../../../assets/icons/icon-offer.svg";
import { ReactComponent as IconShare } from "../../../assets/icons/icon-share.svg";
import { ReactComponent as IconWishlist } from "../../../assets/icons/black-wishlist-icon.svg";
import SliderImage from "react-zoom-slider";
import { useDispatch, useSelector } from "react-redux";
import { data } from "../../../Data/data";
import Size from "../../ProductListing/components/Size/Size";
import ColorBox from "../../ProductListing/components/ColorsBox/ColorBox";
import Button from "../../../components/popup/Forms/Button/Button";
import {
  PROMO_CODE,
  VIEW_REVIEW,
  PRODUCT_DATA,
  VIEW_PRODUCT,
} from "../../../Redux/SagaAction/actions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkout, mycart } from "../../../config/RoutingConsts";
import {
  addToCartSuccess,
  addToWishlist,
  getOderSummarySuccess,
  savePromoCode,
  setProductIdSuccess,
  viewProductSuccess,
} from "../../../Redux/Slices/ProductSlice";
import { ReactComponent as WishListImage } from "../../../assets/images/image.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlickSliderComp from "../../../components/SlickSliderComp/SlickSliderComp";
import Loader from "../../../components/Loader";

const ProductZoom = ({
  AddedToCart,
  existToCart,
  CodeCopied,
  existCode,
  existToWishlist,
  AddedToWishlist,
  color,
  size,
  setColor,
  setSize,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId: id } = useParams();
  let { viewProduct, ProductDetailsData, cartItems, wishlistItems } =
    useSelector((state) => state.ProductSlice);
  // const { productId } = useSelector((state) => state.ProductSlice);
  // console.log(id, "useparmas id id id");
  // const { viewProduct } = useSelector((state) => state.ProductSlice);
  // const { ProductDetailsData } = useSelector((state) => state.ProductSlice);
  const [selectshopFilter, setSelectshopFilter] = useState([]);
  const [ischecked, setIschecked] = useState([]);
  const [copiedCode, setCopiedCode] = useState("");
  const [wished, setWished] = useState(false);
  // const [productSize,setProductSize]=useState(null);
  // const [size, setSize] = useState(null);
  // const [color, setColor] = useState(null);
  // const [sellingPrice, setSellingPrice] = useState(null);

  const handleCopy = (code) => {
    setCopiedCode(code);
    if (copiedCode) {
      setCopiedCode("");
      existCode();
    } else {
      CodeCopied(code);
    }
    // dispatch({
    //   type: PROMO_CODE,
    //   payload: {
    //     promoCode: code,
    //   },
    // });
  };

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const handleWishlist = (data) => {
    let wishItem;
    if (wishlistItems?.length == 0) {
      data?.addVariant?.some((colorVariant) => {
        if (colorVariant?.colorId === color) {
          wishItem = {
            id: data?.id,
            addVariant: [colorVariant],
            categoryId: data?.categoryId,
            categoryName: data?.categoryName,
            countryId: data?.countryId,
            description: data?.description,
            gst: data?.gst,
            mainCategoryId: data?.mainCategoryId,
            mainCategoryName: data?.mainCategoryName,
            materialId: data?.materialId,
            materialName: data?.materialName,
            productName: data?.productName,
            productWeight: data?.productWeight,
            type: data?.type,
            status: data?.status,
            sellerName: data?.sellerName,
          };
        }
      });
      dispatch(addToWishlist([...wishlistItems, wishItem]));
      AddedToWishlist(data?.productName);
      // console.log("first wishlitme", wishItem);
    }
    //     wishItem = {
    //       id: data?.id,
    //       addVariant: [
    //         {
    //           productSku: colorVariant?.productSku,
    //           color: colorVariant?.color,
    //           colorId: colorVariant?.colorId,
    //           productImages: colorVariant?.productImages,
    //           variantList: colorVariant?.variantList,
    //         },
    //       ],
    //       categoryId: data?.categoryId,
    //       categoryName: data?.categoryName,
    //       countryId: data?.countryId,
    //       description: data?.description,
    //       gst: data?.gst,
    //       mainCategoryId: data?.mainCategoryId,
    //       mainCategoryName: data?.mainCategoryName,
    //       materialId: data?.materialId,
    //       materialName: data?.materialName,
    //       productName: data?.productName,
    //       productWeight: data?.productWeight,
    //       type: data?.type,
    //       status: data?.status,
    //       sellerName: data?.sellerName,

    //     };
    //   })
    //   dispatch(addToWishlist(wishItem));
    //   AddedToWishlist(data?.productName);
    //   setWished(true);
    // } else {
    wishlistItems?.some((i) => {
      return i?.addVariant?.some((j) => {
        return j?.variantList?.some((k) => {
          data?.addVariant?.map((list) => {
            list?.variantList?.map((variant) => {
              if (data?.id !== i?.id) {
                // if (j?.colorId === color || k?.sizeId === size) {
                // wishItem
                // setWished(true);
                // console.log("different product", list?.color);

                wishItem = {
                  id: data?.id,
                  addVariant: [
                    {
                      productSku: list?.productSku,
                      color: list?.color,
                      colorId: list?.colorId,
                      productImages: list?.productImages,
                      variantList: [
                        {
                          PLength: variant?.PLength,
                          mrp: variant?.mrp,
                          sellingPrice: variant?.sellingPrice,
                          size: variant?.size,
                          sizeId: variant?.sizeId,
                          availableQty: variant?.availableQty,
                          _id: variant?._id,
                        },
                      ],
                    },
                  ],
                  categoryId: data?.categoryId,
                  categoryName: data?.categoryName,
                  countryId: data?.countryId,
                  description: data?.description,
                  gst: data?.gst,
                  mainCategoryId: data?.mainCategoryId,
                  mainCategoryName: data?.mainCategoryName,
                  materialId: data?.materialId,
                  materialName: data?.materialName,
                  productName: data?.productName,
                  productWeight: data?.productWeight,
                  type: data?.type,
                  status: data?.status,
                  sellerName: data?.sellerName,
                };
                dispatch(addToWishlist([...wishlistItems, wishItem]));
                setWished(true);
              } else if (data?.id === i?.id && j?.colorId !== list?.colorId) {
                // console.log("alg color same product=------", data);
                setWished(true);
                wishItem = {
                  id: data?.id,
                  addVariant: [
                    {
                      productSku: list?.productSku,
                      color: list?.color,
                      colorId: list?.colorId,
                      productImages: list?.productImages,
                      variantList: [
                        {
                          PLength: variant?.PLength,
                          mrp: variant?.mrp,
                          sellingPrice: variant?.sellingPrice,
                          size: variant?.size,
                          sizeId: variant?.sizeId,
                          availableQty: variant?.availableQty,
                        },
                      ],
                    },
                  ],
                  categoryId: data?.categoryId,
                  categoryName: data?.categoryName,
                  countryId: data?.countryId,
                  description: data?.description,
                  gst: data?.gst,
                  mainCategoryId: data?.mainCategoryId,
                  mainCategoryName: data?.mainCategoryName,
                  materialId: data?.materialId,
                  materialName: data?.materialName,
                  productName: data?.productName,
                  productWeight: data?.productWeight,
                  type: data?.type,
                  status: data?.status,
                  sellerName: data?.sellerName,
                };
                // console.log("product else if", list?.color);
                dispatch(addToWishlist([...wishlistItems, wishItem]));
              } else {
                setWished(false);
                // remove from wishlist
                // console.log("last else");
              }
            });
          });
          // console.log("variant list for wish icon---------",k?.sizeId=== size  && i?.id ===viewProduct?.id);
        });
      });
    });
    // }
    // if (checkWish) {

    // } else {
    //   setWished(false);
    // }
    // let wishItem;

    // console.log("checkWish wishlist",checkWish);
    // if (!checkWish) {
    //   dispatch(addToWishlist([...wishlistItems, data]));
    //   AddedToWishlist(data?.productName);
    // } else {
    //   return {};
    // }

    // -----------work  (pre set for [0]----------
    // const checkWish = false
    // data?.map((i) => {

    // wishlistItems?.some((i) => {
    //   return i?.addVariant?.map((j) => {
    //     return j?.variantList?.map((k) => {
    //       data?.addVariant?.map((list) => {
    //         list?.variantList?.map((variant) => {
    //           // || k?.sizeId !== variant?.sizeId
    //           if (
    //             j?.colorId == list?.colorId &&
    //             data?.id !== i?.id
    //             // k?.sizeId !== variant?.sizeId
    //           ) {
    //             wishItem = {
    //               id: data?.id,
    //               addVariant: [
    //                 {
    //                   productSku: list?.productSku,
    //                   color: list?.color,
    //                   colorId: list?.colorId,
    //                   productImages: list?.productImages,
    //                   variantList: [
    //                     {
    //                       PLength: variant?.PLength,
    //                       mrp: variant?.mrp,
    //                       sellingPrice: variant?.sellingPrice,
    //                       size: variant?.size,
    //                       sizeId: variant?.sizeId,
    //                       availableQty: variant?.availableQty,
    //                     },
    //                   ],
    //                 },
    //               ],
    //               categoryId: data?.categoryId,
    //               categoryName: data?.categoryName,
    //               countryId: data?.countryId,
    //               description: data?.description,
    //               gst: data?.gst,
    //               mainCategoryId: data?.mainCategoryId,
    //               mainCategoryName: data?.mainCategoryName,
    //               materialId: data?.materialId,
    //               materialName: data?.materialName,
    //               productName: data?.productName,
    //               productWeight: data?.productWeight,
    //               type: data?.type,
    //               status: data?.status,
    //               sellerName: data?.sellerName,
    //             };
    //             dispatch(addToWishlist([...wishlistItems, wishItem]));
    //             // AddedToWishlist(data?.productName);
    //             setWished(true);
    //           }
    //         });
    //       });

    //       //----- not needed
    //       // else {
    //       //   dispatch(addToWishlist([...wishlistItems, data]));
    //       //   return false;
    //       // }
    //     });
    //   });
    // });
    // ------------

    // if (!checkWish) {
    //   // setWishListItem((wishlistItems) => [...wishlistItems, ProductDetailsData]);  //by color
    //   // dispatch(addToWishlist([...wishlistItems, ProductDetailsData])); // by color
    //   // setWishListItem((wishlistItems) => [...wishlistItems, data]);
    //   dispatch(addToWishlist([...wishlistItems, data]));
    //   AddedToWishlist(data?.productName);
    // } else {
    //   // setWished(false);
    //   // existToWishlist(data?.productName);
    //   return {};
    // }
    // }
  };
  // console.log("wishlist", wishlistItems);
  const handleCart = (data, orderSummary) => {
    let cart = null;
    let checkCart = cartItems?.some((i) => {
      return i?.sizeId === size && i?.id === data?.id;
    });
    data?.addVariant?.map((i) => {
      if (color === i?.colorId) {
        i?.variantList?.map((s) => {
          if (s?.sizeId === size) {
            cart = {
              id: data?.id,
              productName: data?.productName,
              description: data?.description,
              color: i?.color,
              colorId: i?.colorId,
              productImages: i?.productImages,
              productSku: i?.productSku,
              categoryId: data?.categoryId,
              // variantList:s,
              size: s?.size,
              sellingPrice: s?.sellingPrice,
              qty: 1,
              sizeId: s?.sizeId,
              availableQty: s?.availableQty,
              PLength: s?.PLength,
              mrp: s?.mrp,
              // _id: s?._id,
              orderSummary: orderSummary ? true : false,
            };

            if (orderSummary) {
              dispatch(getOderSummarySuccess(cart));

              return navigate(checkout);
            } else if (!checkCart && !orderSummary) {
              dispatch(addToCartSuccess([...cartItems, cart]));
              dispatch(getOderSummarySuccess(null));
              // AddedToCart(data?.productName);
              return navigate("/mycart");
            }
          }
        });
      }
    });
  };
  // const orderSummary = () => {
  //   navigate(checkout);
  // };
  const maxLength = 200;
  const shortenedText =
    viewProduct?.description?.length > maxLength
      ? viewProduct?.description?.substring(0, maxLength - 3) + "..."
      : viewProduct?.description;

  useEffect(() => {
    setColor(viewProduct?.addVariant?.[0]?.colorId);
    setSize(viewProduct?.addVariant?.[0]?.variantList?.[0]?.sizeId);
    dispatch({ type: VIEW_PRODUCT, payload: id });

    //  handleWishlist(viewProduct);
  }, [
    viewProduct?.addVariant?.colorId,
    viewProduct?.addVariant?.[0]?.variantList?.[0]?.sizeId,
    id,
  ]);
  useEffect(() => {
    // let checkWish =
    // wishlistItems?.some((i) => {
    //   return i?.addVariant?.some((j) => {
    //     return j?.variantList?.some((k) => {
    //       if (i?.id === viewProduct?.id && k?.sizeId === size) {
    //         setWished(true);
    //       }
    //     });
    //   });
    // });
    // if (wishlistItems?.length !== 0) {
    let checkWish = wishlistItems?.some((i) => {
      return i?.addVariant?.some((j) => {
        return j?.variantList?.some((k) => {
          return viewProduct?.id === i?.id && j?.colorId === color;
          // console.log("variant list for wish icon---------",k?.sizeId=== size  && i?.id ===viewProduct?.id);
        });
      });
    });
    if (checkWish) {
      setWished(true);
    } else {
      setWished(false);
    }
    // }
  }, [viewProduct, color, size, wishlistItems]);

  return (
    <Container>
      <Row>
        <Col lg="12">
          <Breadcrumb className="mb-30">
            <Breadcrumb.Item href="/swanee">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{shortenedText}</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col xl="6" lg="12">
          <div className="product-image">
            <button
              className="hover-icon"
              onClick={() => {
                setWished(true);
                // if (wishlistItems?.length === 0) {
                //   let wishItem;
                // //   wisItem= {
                // //     id :viewProduct?.id,
                // //     viewProduct?.addVariant?.map((colorVariant)=>{
                // //     if (color === colorVariant?.colorId){

                // //        addVariant :[
                // //         {

                // //         }
                // //        ]
                // //       }
                // //     // }
                // //   })
                //   wishItem = {
                //     id: viewProduct?.id,
                //     // addVariant: [
                //     //   {
                //     //     productSku: viewProduct?.addVariant?.[0]?.productSku,
                //     //     color: viewProduct?.addVariant?.[0]?.color,
                //     //     colorId: viewProduct?.addVariant?.[0]?.colorId,
                //     //     productImages:
                //     //       viewProduct?.addVariant?.[0]?.productImages,
                //     //     variantList: [
                //     //       {
                //     //         PLength:
                //     //           viewProduct?.addVariant?.[0]?.variantList?.[0]
                //     //             ?.PLength,
                //     //         mrp: viewProduct?.addVariant?.[0]?.variantList?.[0]
                //     //           ?.mrp,
                //     //         sellingPrice:
                //     //           viewProduct?.addVariant?.[0]?.variantList?.[0]
                //     //             ?.sellingPrice,
                //     //         size: viewProduct?.addVariant?.[0]?.variantList?.[0]
                //     //           ?.size,
                //     //         sizeId:
                //     //           viewProduct?.addVariant?.[0]?.variantList?.[0]
                //     //             ?.sizeId,
                //     //         availableQty:
                //     //           viewProduct?.addVariant?.[0]?.variantList?.[0]
                //     //             ?.availableQty,
                //     //       },
                //     //     ],
                //     //   },
                //     // ],
                //     categoryId: viewProduct?.categoryId,
                //     categoryName: viewProduct?.categoryName,
                //     countryId: viewProduct?.countryId,
                //     description: viewProduct?.description,
                //     gst: viewProduct?.gst,
                //     mainCategoryId: viewProduct?.mainCategoryId,
                //     mainCategoryName: viewProduct?.mainCategoryName,
                //     materialId: viewProduct?.materialId,
                //     materialName: viewProduct?.materialName,
                //     productName: viewProduct?.productName,
                //     productWeight: viewProduct?.productWeight,
                //     type: viewProduct?.type,
                //     status: viewProduct?.status,
                //     sellerName: viewProduct?.sellerName,
                //   };
                //   dispatch(addToWishlist([wishItem]));
                //   AddedToWishlist(viewProduct?.productName);
                //   setWished(true);
                // } else
                handleWishlist(viewProduct);
              }}
            >
              <div className="gradiant-bg">
                {!wished ? <IconWishlist /> : <WishListImage />}
              </div>
              {/* <div className="gradiant-bg"> <IconWishlist /></div> */}
            </button>

            {/* must  {ProductDetailsData !== null} */}

            {ProductDetailsData?.productImages && (
              <SliderImage data={ProductDetailsData?.productImages} />
            )}

            {/* {viewProduct?.addVariant &&
            viewProduct?.addVariant[0]?.productImages ? (dis
              <SliderImage data={viewProduct.addVariant[0].productImages} />
            ) : (
              // (ProductDetailsData?.length !== 0)? <SliderImage data ={ProductDetailsData?.productImages}/>:
              <h4>Variant data or product images are missing.</h4>
            )} */}

            <div className="custom-slider desktop-none ">
              {ProductDetailsData?.productImages && (
                <SlickSliderComp
                  content={ProductDetailsData?.productImages}
                  num={3}
                  detail={true}
                />
              )}
            </div>
          </div>
        </Col>
        <Col xl="6" lg="12">
          <div className="product-detail">
            <div className="product-heading">
              <div className="title">{viewProduct?.productName}</div>
              {/* <span className="subtitle">{viewProduct?.description}</span> */}
              <span className="subtitle">{shortenedText}</span>
            </div>
            <div className="rating-details">
              <span>
                {viewProduct?.rating}4
                <img src={RatingIcon} alt="star" />
              </span>
              <span>{viewProduct?.subrating} Ratings</span>
            </div>
            <div className="share">
              <IconShare /> Share
            </div>

            {/* dynamic after selection of size */}

            {/* {viewProduct?.addVariant?.[0]?.variantList?.map((i, key) => {
             (i?.size == size) ? 
                 (
                  <div className="price" key={key}>
                    <span className="original-price">₹ {i?.sellingPrice}</span>
                    <span className="seller-price">₹ {i?.mrp}</span>
                    {viewProduct?.offer && (
                      <span className="text-red">
                        {viewProduct?.offer}% OFF
                      </span>
                    )}
                  </div>
                )
              : null })} */}
            {/* {console.log("size color", size, color, ProductDetailsData)} */}

            {/* {!sellingPrice && (
              <>
                <div className="price">
                  <span className="original-price">
                    ₹ {ProductDetailsData?.variantList?.[0]?.sellingPrice}
                  </span>
                  <span className="seller-price">
                    ₹ {ProductDetailsData?.variantList?.[0]?.mrp}
                  </span>
                  {viewProduct?.offer && (
                    <span className="text-red">{viewProduct?.offer}% OFF</span>
                  )}
                </div>
                <span>Inclusive of all taxes</span>
                <div className=" stock">
                  <p>
                    {ProductDetailsData?.variantList?.[0]?.availableQty} Items
                    left
                  </p>
                </div>
              </>
            )} */}
            {ProductDetailsData?.variantList?.map(
              (i, key) =>
                size === i?.sizeId ? (
                  <>
                    <div className="price" key={key}>
                      <span className="original-price">
                        ₹ {formatNumber(i?.sellingPrice)}
                      </span>
                      <span className="seller-price">
                        ₹ {formatNumber(i?.mrp)}
                      </span>
                      {viewProduct?.offer && (
                        <span className="text-red">
                          {viewProduct?.offer}% OFF
                        </span>
                      )}
                    </div>
                    <span>Inclusive of all taxes</span>
                    <div
                      className={i?.availableQty > 5 ? "stock" : "few-stock"}
                    >
                      <p>
                        {" "}
                        {i?.availableQty <= 5 && "Only"} {i?.availableQty} Item
                        {i?.availableQty > 1 && "s"} left
                      </p>
                    </div>
                  </>
                ) : null
              // ( setSellingPrice(null))
              // ) :
              //   null
              // (
              //   <>
              //     <div className="price">
              //       <span className="original-price">
              //         ₹ {[0]?.sellingPrice}
              //       </span>
              //       <span className="seller-price">₹ {[0]?.mrp}</span>
              //       {viewProduct?.offer && (
              //         <span className="text-red">
              //           {viewProduct?.offer}% OFF
              //         </span>
              //       )}
              //     </div>
              //     <span>Inclusive of all taxes</span>
              //     <div className=" stock">
              //       <p>{[0]?.availableQty} Items left</p>
              //     </div>
              //   </>
              // )
            )}
            {/* {userSize && <span>Size not available</span>} */}
            <div className="product-filter">
              {viewProduct?.addVariant && <h6>Color</h6>}
              <ColorBox
                selectshopFilter={selectshopFilter}
                display={viewProduct?.addVariant?.[0]?.color}
                setSelectshopFilter={setSelectshopFilter}
                ischecked={ischecked}
                setIschecked={setIschecked}
                fixColor="true"
                color={color}
                setColor={setColor}
                size={size}
                setSize={setSize}
                // sellingPrice={sellingPrice}
                // setSellingPrice={setSellingPrice}
              />
              {viewProduct?.addVariant && <h6>Select Your Size</h6>}
              <Size
                selectshopFilter={selectshopFilter}
                setSelectshopFilter={setSelectshopFilter}
                ischecked={ischecked}
                setIschecked={setIschecked}
                fixSize="true"
                setSize={setSize}
                size={size}
                // sellingPrice={sellingPrice}
                // setSellingPrice={setSellingPrice}
                // setUserSize={setUserSize}
                // userSize ={userSize}
              />

              {/* {console.log("djfkdghdsgjkds",viewProduct?.addVariant?.[0]?.productImages)}
              {console.log("ProductDetailsData?.productImages",ProductDetailsData)} */}
            </div>
            <div className="button-group">
              <Button
                commonClass="common-btn"
                text={"Buy Now"}
                type="Button"
                onClick={() => {
                  handleCart(viewProduct, true);
                }}
                // onClick={() => navigate(checkout)}
              />
              <Button
                commonClass="common-btn border-btn"
                text={"Add To Cart"}
                type="Button"
                onClick={() => handleCart(viewProduct, false)}
              />
              <ToastContainer
              // autoClose={2000} // Disable auto close
              // hideProgressBar={true} // Hide progress bar
              // newestOnTop={false}
              // closeOnClick
              />
            </div>
            <div className="product-offer">
              <h6 className="offer-head">
                Best Offers <IconOffer />
              </h6>
              <p>
                ShopMore30k
                <span
                  className="text-red"
                  onClick={() => {
                    handleCopy("ShopMore30k");
                  }}
                >
                  {copiedCode ? copiedCode : "Copy Code"}
                </span>
              </p>
              <ul>
                <li>
                  <span>
                    Shop for 7,905 more and get flat 3,000 OFF! Use coupon code
                    ShopMore30 (T&C Applied).
                  </span>
                </li>
              </ul>

              <p>ShopMore30k</p>
              <ul>
                <li>
                  <span>
                    Shop for 7,905 more and get flat 3,000 OFF! Use coupon code
                    ShopMore30k(T&C Applied).
                  </span>
                </li>
              </ul>

              <h6>
                Best Offers <span className="text-red">Know More</span>
              </h6>
              <span>If you find the product for less we’ll match it!</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductZoom;
