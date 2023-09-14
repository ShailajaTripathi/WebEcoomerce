import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { colorList } from "../../../../Data/data";
import { useDispatch, useSelector } from "react-redux";
import {
  checkItem,
  getFilteredDataSuccess,
  removeFilteredData,
  setShopFilter,
} from "../../../../Redux/Slices/ProductSlice";
import { PRODUCT_DATA } from "../../../../Redux/SagaAction/actions";

const ColorBox = ({
  selectshopFilter,
  setSelectshopFilter,
  ischecked,
  setIschecked,
  fixColor,
  color,
  setColor,
  size,
  setSize,
  // setSellingPrice,
  // sellingPrice,
  filterTitle,
}) => {
  let { ProductDetailsData, viewProduct, checkedItems, filter } = useSelector(
    (state) => state.ProductSlice
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(
    viewProduct?.addVariant?.[0]?.color
  );

  const handleRemove = (color) => {
    // setIschecked((oldValues) => {
    //   return oldValues.filter((ischecked) => ischecked !== color);
    // });
    setIschecked(checkedItems?.filter((e) => e !== color));

    setSelectshopFilter(filter?.filter((e) => e !== color));

    dispatch(checkItem(checkedItems?.filter((e) => e !== color)));

    dispatch(setShopFilter(filter?.filter((e) => e !== color)));
    dispatch(removeFilteredData({ name: filterTitle, value: color }));
  };

  const handleSelect = async (color) => {
    setIschecked([...ischecked, color]);
    await setSelectshopFilter((selectshopFilter) => [
      ...selectshopFilter,
      color,
    ]);
    dispatch(checkItem([...checkedItems, color]));
    dispatch(setShopFilter([...filter, color]));
    dispatch(getFilteredDataSuccess({ select: color, title: filterTitle }));

    if (selectshopFilter?.includes(color)) {
      handleRemove(color);
      await setSelectshopFilter((oldValues) => {
        return oldValues.filter(
          (selectshopFilter) => selectshopFilter !== color
        );
      });
    }
  };
  // for product detail section
  const handleFixColor = async (data, color) => {
    setSize(data?.variantList?.[0]?.sizeId);
    setSelectedColor(color);
    setColor(data?.colorId);
    // setSize()
    // setSize(data?.variantList?.[0]?.size);
    // setSellingPrice(true);
    dispatch({ type: PRODUCT_DATA, payload: data });
    dispatch(setShopFilter(color));
    if (selectedColor === color) {
      setSelectedColor("");
      // setSellingPrice(null);
    }
  };
 

  useEffect(() => {
    setSelectedColor(ProductDetailsData?.color);
    // setSize(size); 
    // setColor(ProductDetailsData?.colorId);

    // console.log("productsetColorsetColor",ProductDetailsData?.color);
    if (selectshopFilter?.length || selectshopFilter?.length === 0) {
      dispatch(setShopFilter(selectshopFilter));
    }
  }, [viewProduct, selectshopFilter]);

  return (
    <div className="filter-box">
      <div className="filter-header">
        <div className="filter-title">{`${t("productlisting.color")}`}</div>
      </div>
      <div className="filter-list">
        {fixColor ? (
          <ul className="size-list color-list">
            {viewProduct?.addVariant?.map((cc, i) => {
              return (
                <li
                  key={i}
                  id={i}
                  onClick={() => {
                    //  (i !==0 )&& handleFixColor(cc, cc?.color);
                    handleFixColor(cc, cc?.color);
                  }}
                  className={color === cc?.colorId ? "active" : null}
                >
                  {/* {console.log("color color,", cc?.color?.replace(/-/g, ''))}  */}
                
                  <div
                    className="circle"
                    style={{
                      backgroundColor: cc?.color?.toLowerCase()?.replace(/-/g, '')
                    }}
                  ></div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="size-list color-list">
            {colorList?.map((cc, i) => {
              return (
                <li
                  key={i}
                  id={i}
                  onClick={() => {
                    fixColor
                      ? handleFixColor(cc, cc?.color)
                      : handleSelect(cc?.color);
                  }}
                  className={
                    fixColor
                      ? selectedColor === cc?.color && "active"
                      : checkedItems?.includes(cc?.color) && "active"
                  }
                >
                  <div
                    className="circle"
                    style={{ backgroundColor: cc.color }}
                  ></div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ColorBox;
