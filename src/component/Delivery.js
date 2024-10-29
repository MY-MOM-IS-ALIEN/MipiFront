import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DaumPost from "./DaumPost";

function Delivery({ stores, getDistanceFromLatLonInKm }) {
  {
    /* 필요한 객체생성하는곳 */
  }
  const location = useLocation();
  const pathName = location.hash;
  const logindUser = JSON.parse(sessionStorage.getItem("logedInUser"));
  const [nearestStore1, setNearestStore1] = useState();
  const [openDaumPost, setOpenDaumPost] = useState(false);
  {
    /* 객체생성하는곳 */
  }
  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=89f833dcfaa9b766dfea38b685368114&autoload=false&libraries=services`;
    kakaoScript.async = true;

    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          if (logindUser && logindUser.MEMBER_ADRESS) {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(
              logindUser.MEMBER_ADRESS,
              (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const userCoords = new window.kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                  );

                  let nearestStore = null;
                  let nearestDistance = Infinity;

                  stores.forEach((store) => {
                    const distance = getDistanceFromLatLonInKm(
                      result[0].y,
                      result[0].x,
                      store.lat,
                      store.lng
                    );
                    if (distance < nearestDistance) {
                      nearestDistance = distance;
                      nearestStore = store;
                    }
                  });

                  if (nearestStore) {
                    setNearestStore1({
                      name: nearestStore.name,
                      lat: nearestStore.lat,
                      lng: nearestStore.lng,
                      tel: nearestStore.phone,
                      address: nearestStore.address,
                    });
                  }
                } else {
                  alert("현재 위치를 찾을 수 없습니다.");
                }
              }
            );
          }
        });
      } else {
        console.error("Kakao API가 제대로 로드되지 않았습니다.");
      }
    };

    // useEffect의 빈 배열을 통해 컴포넌트 마운트 시 한 번만 실행되도록 보장
  }, []);

  const toggleDaumPost = () => {
    console.log(openDaumPost);
    setOpenDaumPost((prevState) => !prevState);
  };

  const opneAddInfo = () => {
    console.log(stores);
  };
  return (
    <div>
      <h2 className="order_tit">
        <img
          src="//cdn.mrpizza.co.kr/2014_resources/images/order/step2.gif"
          alt="step2"
        />{" "}
        주소/매장 선택
      </h2>
      <div className="zip_guide">
        <ul className="tabmenu2 mt30 tabMotion deliTab">
          <li className={pathName === "#MyAdd" ? "on" : ""}>
            <a href="#MyAdd">
              <span>내 배달주소</span>
            </a>
          </li>
          <li className={pathName === "#NewAdd" ? "on" : ""}>
            <a href="#NewAdd">
              <span>새로운 배달주소</span>
            </a>
          </li>
        </ul>
        <p>
          <button
            type="button"
            className="button btn_guide pop_open"
            onClick={opneAddInfo}
          >
            주소등록안내
          </button>
        </p>
      </div>
      <br />
      <br />
      {pathName === "#MyAdd" ? (
        <div id="tabCon11" className="tab_cont">
          <table id="myDeliveryList" className="d-tbl_style">
            <colgroup>
              <col style={{ width: "46px" }} />
              <col style={{ width: "120px" }} />
              <col />
              <col style={{ width: "160px" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">선택</th>
                <th scope="col">매장명</th>
                <th scope="col">주소</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td>{nearestStore1 ? nearestStore1.name : "Loading..."}</td>
                <td>
                  {logindUser.MEMBER_ADRESS}
                  <span className="icon_txt">기본주소</span>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="d-mt10">
            <a
              href="#zipcode"
              className="button pop_open zip_open w60 h25 white"
            >
              수정
            </a>
            <a href="#" className="button w60 h25 white pop_open">
              삭제
            </a>
            <a href="#popMyinfo" className="button h25 white pop_open">
              기본주소 설정
            </a>
          </p>
        </div>
      ) : (
        <div id="tabCon12" className="tab_cont">
          <table className="d-tbl_style d-mt10 myInfo_form">
            <colgroup>
              <col style={{ width: "150px" }} />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">
                  <label htmlFor="address">주소</label>
                </th>
                <td className="t_left">
                  <p>
                    <input
                      type="text"
                      id="cust_haddr"
                      className="inp1"
                      style={{
                        width: "239px",
                        marginBottom: "0px",
                        marginRight: "10px",
                      }}
                      title="기본주소"
                      readOnly
                    />
                    <input
                      type="text"
                      id="cust_daddr"
                      className="inp3"
                      style={{
                        width: "239px",
                        marginBottom: "0px",
                        marginRight: "10px",
                      }}
                      title="상세주소 입력"
                      readOnly
                    />
                    <button
                      type="button"
                      href="#zipcode"
                      className="button w-110 h-33 pop_open zip_open"
                      onClick={toggleDaumPost}
                    >
                      주소찾기<span className="gt">&gt;</span>
                    </button>
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">매장정보</th>
                <td>
                  <table id="newDeliveryList" className="tbl_style2">
                    <colgroup>
                      <col style={{ width: "50px" }} />
                      <col style={{ width: "120px" }} />
                      <col style={{ width: "480px" }} />
                      <col style={{ width: "120px" }} />
                      <col style={{ width: "80px" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col" className="t_center">
                          선택
                        </th>
                        <th scope="col" className="t_center">
                          매장명
                        </th>
                        <th scope="col" className="t_center">
                          주소
                        </th>
                        <th scope="col" className="t_center">
                          전화번호
                        </th>
                        <th scope="col" className="t_center">
                          매장보기
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* 여기까지 */}
      <p className="mt40 t_center">
        <a href="#" className="button red h45 w170 order_type_btn">
          주문진행 <span className="gt">&gt;</span>
        </a>
        <a href="#" className="button h45 w170">
          취소 <span className="gt">&gt;</span>
        </a>
      </p>
      {openDaumPost ? <DaumPost toggleDaumPost={toggleDaumPost} /> : null}
    </div>
  );
}

export default Delivery;
