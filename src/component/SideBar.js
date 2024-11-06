import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function SideBar({ logout, cartListLength }) {
  const isLogin = sessionStorage.getItem("isLogin");
  const logedInUser = JSON.parse(sessionStorage.getItem("logedInUser"));
  const location = useLocation();
  const path = location.pathname;

  if (path === "/Cart") {
    return null;
  }

  return (
    <div className="SideBar-area">
      <div className="SideBar-content">
        <ul>
          <li>
            {!isLogin ? (
              <Link to="/LoginForm#login">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_01.png" />
                <span>로그인</span>
              </Link>
            ) : (
              <div onClick={logout}>
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_01.png" />
                <span>로그아웃</span>
              </div>
            )}
          </li>
          <li>
            {!isLogin ? (
              <Link to="/JoinForm">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_02.png" />
                <span>회원가입</span>
              </Link>
            ) : (
              <Link to="/MipiFront">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_02.png" />
                <span>회원가입</span>
              </Link>
            )}
          </li>
          <li>
            <Link to={logedInUser ? "/Cart" : "/LoginForm#login"}>
              <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_03.png" />
              <span className="side-z-index">{cartListLength}</span>
              <span>장바구니</span>
            </Link>
          </li>
          <li>
            <a href="#">
              <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_04.png" />
              <span>재주문</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
