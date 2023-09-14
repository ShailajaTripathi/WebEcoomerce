import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { productlisting } from "../../../config/RoutingConsts";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkItem,
  removeAllfilter,
  setShopFilter,
} from "../../../Redux/Slices/ProductSlice";
import {
  GET_MAIN_CATEGORY,
  GET_SUB_CATEGORY,
  PRODUCT_LIST,
} from "../../../Redux/SagaAction/actions";
const HeaderMenu = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const { title } = useParams();
  const { mainData, subData } = useSelector(
    (action) => action.GetCategorySlice
  );
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [mainCategory, setMainCategory] = useState(null);
  const { productsList } = useSelector((state) => state.ProductSlice);
  const { t } = useTranslation();

  const clearFilter = () => {
    dispatch(checkItem([]));
    dispatch(removeAllfilter());
    dispatch(setShopFilter([]));
  };



  const handleSelect = (e) => {
    // console.log(e,active,"EEEEEEEE")
    if (e === active) {
      return;
    }
    setActive(e);
    if (!(pathname === "/")) {
      navigate(`/productlisting/${subData?.[0]?._id}`);
    }
  };
  // console.log(subData, "subData?.[0]?._id");
  useEffect(() => {

    dispatch({
      type: GET_MAIN_CATEGORY,
      callback: (e) => {
        setActive(e);
      },
    });
  }, []);
  //  {console.log("dataa",combinedArray)}
  useEffect(() => {
    if (active) {
      dispatch({
        type: GET_SUB_CATEGORY,
        payload: { mainCategoryId: active },
        callback: (e, i) => {
          if (!(pathname === "/")) {
            navigate(`productlisting/${e}`, { state: i });
          }
        },
      });
      if (pathname === "/") {
        dispatch({ type: PRODUCT_LIST, payload: { mainCategoryId: active } });
      }
    }
  }, [active]);

  return (
    <div className="header-menu">
      <Container>
        <div className="header-tab">
          <Tabs onSelect={handleSelect} activeKey={active}>
            {/* {console.log("mainData", handleCategory)} */}
            {mainData?.map((mList) => {
              return (
                <Tab eventKey={mList?._id} title={mList?.mainCategoryName}>
                  <ul className="menu-list">
                    {subData?.map((list) => {
                      return (
                        <li key={list?._id}>
                          <Link
                            to={`productlisting/${list?._id}`}
                            className={title === list?._id && "active"}
                            state={list?.categoryName}
                          >
                            {list?.categoryName}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Tab>
              );
            })}
          </Tabs>
        </div>
      </Container>
    </div>
  );
};
export default HeaderMenu;
