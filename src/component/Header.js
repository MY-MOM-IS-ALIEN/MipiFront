import React from "react";
import menuBtn from "../img/menuBtn.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({ toggleDropdown, oderModal, cartList }) => {
  const loginedUser = JSON.parse(sessionStorage.getItem("logedInUser"));
  const cartSize = cartList
    .filter((el) => el.ID === (loginedUser ? loginedUser.MEMBER_ID : null))
    .reduce((sum, el) => sum + el.CART_COUNT, 0);

  const location = useLocation();
  const pathName = location.pathname;
  return (
    <header className="header">
      <div className="header__logo">
        <a href="/MipiFront">
          <img
            src="https://cdn.mrpizza.co.kr/2023_resources/images/common/logo_pc.jpg"
            alt="Mr.Pizza Logo"
          />
        </a>
      </div>
      <nav className="header__nav">
        <ul className="nav__list">
          <li className="nav__item baro">
            {!loginedUser ? (
              <a href="#" onClick={() => oderModal(true)}>
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_gnb_01.png" />
                <span>바로주문</span>
              </a>
            ) : (
              <Link to="/MyOrder/Delivery#MyAdd">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_gnb_01.png" />
                <span>바로주문</span>
              </Link>
            )}
          </li>
          <li className="nav__item">
            <Link to="/MenuList#premium">
              <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_gnb_02.png" />
              메뉴
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/Store#FindStore">
              <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_gnb_03.png" />
              매장
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/EventPage#OnGoingEvent">
              <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_gnb_04.png" />
              이벤트
            </Link>
          </li>
          <li className="nav__item">
            <Link to="#">
              <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_gnb_05.png" />
              마이미피
            </Link>
          </li>
        </ul>
      </nav>
      <div className="hd_btn_area">
        {pathName === "/Cart" ? null : (
          <a href={loginedUser ? "/Cart" : "/LoginForm"}>
            <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_cart.png" />
            <span className="cart-z-index">{cartSize}</span>
          </a>
        )}
        <button className="menu-btn" onClick={toggleDropdown}>
          <img src={menuBtn} id="menuBtn" />
        </button>
      </div>
    </header>
  );
};

export default Header;
