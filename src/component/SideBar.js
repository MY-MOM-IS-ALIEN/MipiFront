import { Link, useLocation } from "react-router-dom";

function SideBar({ logout, cartList }) {
  const isLogin = sessionStorage.getItem("isLogin");
  const logedInUser = JSON.parse(sessionStorage.getItem("logedInUser"));
  const cartSize = cartList
    .filter((el) => el.ID === (logedInUser ? logedInUser.MEMBER_ID : null))
    .reduce((sum, el) => sum + el.CART_COUNT, 0);
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
              <Link to="/LoginForm">
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
            {isLogin ? (
              <Link to="/Cart">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_03.png" />
                <span className="side-z-index">{cartSize}</span>
                <span>장바구니</span>
              </Link>
            ) : (
              <Link to="/LoginForm">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/ico_quick_03.png" />
                <span>장바구니</span>
              </Link>
            )}
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
