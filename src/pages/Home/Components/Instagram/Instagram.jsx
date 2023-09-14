import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ReactComponent as InstagramIcon } from "../../../../assets/icons/instagram-red-icon.svg";
import SlickSliderComp from "../../../../components/SlickSliderComp/SlickSliderComp";
import { instagram } from "../../../../Data/data";
import { useNavigate } from "react-router-dom";
import { productlisting } from "../../../../config/RoutingConsts";

export const Instagram = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  return (
    <div className="shop-instagram ptb">
      <Container>
        <div className="insta-box">
          <div className="content">
            <InstagramIcon />
            <div className="title">{`${t(
              "homepage.shopinstagaram.title"
            )}`}</div>
            <button
              type="submit"
              className="common-btn"
              onClick={() =>
                navigate(`productlisting/${t(
                "homepage.shopinstagaram.title"
              )}`,{state:"Shop Instagram"})
              }
            >{`${t("button.viewbtn")}`}</button>
          </div>
          <div className="custom-slider">
            <SlickSliderComp content={instagram} setting={settings1} button={false} navigation={true} />
          </div>
        </div>
      </Container>
    </div>
  );
};