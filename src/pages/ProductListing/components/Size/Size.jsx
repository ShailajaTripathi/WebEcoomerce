import React, { useState, useEffect } from "react";
import { sizeList } from "../../../../Data/data";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  checkItem,
  getFilteredDataSuccess,
  removeFilteredData,
  setShopFilter,
} from "../../../../Redux/Slices/ProductSlice";
import { PRODUCT_DATA } from "../../../../Redux/SagaAction/actions";

const Size = ({
  selectshopFilter,
  setSelectshopFilter,
  ischecked,
  setIschecked,
  fixSize,
  setSize,
  size,
  userSize,
  setUserSize,
  setSellingPrice,
  sellingPrice,
  filterTitle,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let { ProductDetailsData,checkedItems ,viewProduct,filter} = useSelector((state) => state.ProductSlice);
  const [selectedSize, setSelectedSize] = useState( ProductDetailsData?.variantList?.[0]?.size );

  // const handleSelect = (size) => {
  //   setIschecked([...ischecked, size]);
  //   setSelectshopFilter((selectshopFilter) => [...selectshopFilter, size]);
  //   dispatch(setShopFilter([...selectshopFilter, size]));
  // };
  // setSelectedSize(viewProduct?.addVariant?.[0]?.variantList?.[0]?.size);

  const handleRemove = (size) => {
    // setIschecked((oldValues) => {
    //   return oldValues.filter((ischecked) => ischecked !== size);
    // });
    setIschecked(checkedItems?.filter((e) => e !== size));
    dispatch(checkItem(checkedItems?.filter((e) => e !== size)));
    dispatch(removeFilteredData({ name: filterTitle, value: size }));
  };
  // fixSize?

  const handleSelect = async (size) => {
    setIschecked([...ischecked, size]);
    await setSelectshopFilter((selectshopFilter) => [
      ...selectshopFilter,
      size,
    ]);
    dispatch(checkItem([...checkedItems, size]));
    dispatch(setShopFilter([...filter, size]));
    dispatch(getFilteredDataSuccess({ select: size, title: filterTitle }));
    if (selectshopFilter.includes(size)) {
      handleRemove(size);
      await setSelectshopFilter((oldValues) => {
        return oldValues.filter(
          (selectshopFilter) => selectshopFilter !== size
        );
      });
    }
  };
  // console.log("sixeeee", viewProduct?.addVariant?.[0]?.variantList?.[0]?.size);
  const handleFixSize = (sc, size) => {
    // dispatch({ type: PRODUCT_DATA, payload: (viewProduct?.addVariant?.[0]) });
    // console.log("sdcdfdsf size",sc);
    setIschecked(size);
    // setSellingPrice(size);
    setSelectedSize(size);
    setSize(sc?.sizeId);
    dispatch(setShopFilter(size));
    if (selectedSize && ischecked === size) {
      setIschecked([]);
      // setSellingPrice(null);
    }
  };

  useEffect(() => {
    // console.log("sizd ka array", viewProduct?.addVariant?.[0]?.variantList?.[0]);
    // setSellingPrice(viewProduct?.addVariant?.[0]?.variantList?.[0]?.sellingPrice);
    setSelectedSize(ProductDetailsData?.variantList?.[0]?.size);
    // setSize(ProductDetailsData?.variantList?.[0]?.size)
    dispatch({ type: PRODUCT_DATA, payload: viewProduct?.addVariant?.[0] });
    // setProductSize(viewProduct?.addVariant?.[0]?.variantList?.[0]?.size);
    if (selectshopFilter?.length || selectshopFilter?.length === 0) {
      dispatch(setShopFilter(selectshopFilter));
    }
  }, [viewProduct, selectshopFilter]);
  return (
    <div className="filter-box">
      <div className="filter-header">
        <div className="filter-title">{`${t("productlisting.size")}`}</div>
      </div>

      <div className="filter-list">
        {fixSize && ProductDetailsData ? (
          <ul className="size-list">
            {ProductDetailsData?.variantList?.map((sc, i) => {
              return (
                <li
                  key={`size${i}`}
                  id={`size${i}`}
                  onClick={() => {
                    fixSize
                      ? handleFixSize(sc, sc?.size)
                      : handleSelect(sc?.size);
                  }}
                  className={
                    // fixSize
                    //   ?
                    // i == 0
                    //   ? "active"
                    size === sc?.sizeId ? "active" : null
                    // : ischecked?.includes(sc?.size) && "active"
                  }
                >
                  {/* ------------------ */}
                  {sc?.size}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="size-list">
            {sizeList?.map((sc, i) => {
              return (
                <li
                  key={`size${i}`}
                  id={`size${i}`}
                  onClick={() => {
                    fixSize
                      ? handleFixSize(sc, sc?.size)
                      : handleSelect(sc?.size);
                  }}
                  className={
                    fixSize
                      ? selectedSize === sc?.size
                        ? "active"
                        : null
                      : checkedItems.includes(sc?.size)
                      ? "active"
                      : null
                  }
                >
                  {/* {console.log("selected size", selectedSize)} */}
                  {sc?.size}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Size;
