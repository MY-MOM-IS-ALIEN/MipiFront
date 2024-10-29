import { useLocation, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Delivery from "./Delivery";

function MyOrder({ stores, getDistanceFromLatLonInKm }) {
  const location = useLocation();
  const pathName = location.pathname;
  const { code } = useParams();

  return (
    <div id="container">
      <section id="m-contents" className="pd-30">
        <ul id="location">
          <li>
            <a className="home" href="/">
              HOME
            </a>
          </li>
          <li>
            <strong>온라인주문</strong>
          </li>
        </ul>

        <div className="order_choice">
          <h2 className="order_tit">
            <img
              src="//cdn.mrpizza.co.kr/2014_resources/images/order/step1.gif"
              alt="step1"
            />{" "}
            주문 유형 선택
          </h2>
          <ul>
            <li
              className={pathName === "/MyOrder/Delivery" ? "bg_d on" : "bg_d"}
            >
              <Link to="/MyOrder/Delivery#MyAdd" className="order_type_btn">
                <p className="tit">배달주문</p>
                <p className="sub">Delivery</p>
                <p className="txt">
                  인터넷으로 편리하게 <br />
                  주문하세요.
                </p>
              </Link>
            </li>

            <li className={pathName === "/MyOrder/ToGo" ? "bg_v on" : "bg_v"}>
              <Link to="/MyOrder/ToGo" className="order_type_btn">
                <p className="tit">방문포장</p>
                <p className="sub">To Go</p>
                <p className="txt">
                  인터넷으로 예약하고 <br />
                  매장에서 찾아가세요.
                </p>
              </Link>
            </li>
            <li
              className={pathName === "/MyOrder/Present" ? "bg_p on" : "bg_p"}
            >
              <Link to="/MyOrder/Present#MyAdd" className="order_type_btn">
                <p className="tit">선물하기</p>
                <p className="sub">Present</p>
                <p className="txt">
                  미스터피자를 소중한 분에게 <br />
                  선물하세요.
                </p>
              </Link>
            </li>
            <li className={pathName === "/MyOrder/Coupon" ? "bg_e on" : "bg_e"}>
              <Link to="/MyOrder/Coupon" className="order_type_btn">
                <p className="tit">E쿠폰주문</p>
                <p className="sub">E coupon</p>
                <p className="txt">
                  스마일콘 / 기프티콘 / <br />
                  기프티쇼 / 스마트콘 /<br /> 아이넘버로 주문하세요
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <div className="delivery_choice">
          {code === "Delivery" || code === "Present" ? (
            <Delivery
              stores={stores}
              getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
            />
          ) : (
            <p>코드 : {code}</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyOrder;
