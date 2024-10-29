import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Store = ({ stores, getDistanceFromLatLonInKm }) => {
  const [storeInfo, setStoreInfo] = useState({});
  const logindUser = JSON.parse(sessionStorage.getItem("logedInUser"));
  const location = useLocation();
  const hashName = location.hash;
  const aaa = document.querySelector('select[name="select-address1"]');
  const bbb = document.querySelector('select[name="select-address2"]');

  useEffect(() => {
    if (hashName === "#FindStore") {
      const storeNameElement = document.querySelector(".result-store-strong");

      const kakaoScript = document.createElement("script");
      kakaoScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=89f833dcfaa9b766dfea38b685368114&autoload=false&libraries=services`;
      kakaoScript.async = true;

      // 스크립트가 로드되었을 때 실행될 함수
      kakaoScript.onload = () => {
        console.log("Kakao 지도 API 스크립트가 성공적으로 로드되었습니다.");
        if (window.kakao && window.kakao.maps) {
          window.kakao.maps.load(() => {
            const mapContainer = document.getElementById("map"); // 지도를 표시할 div
            const mapOption = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 중심좌표
              level: 3, // 지도의 확대 레벨
            };

            const map = new window.kakao.maps.Map(mapContainer, mapOption);

            if (
              logindUser &&
              logindUser.MEMBER_ADRESS &&
              logindUser != undefined
            ) {
              // 주소-좌표 변환 객체를 생성
              const geocoder = new window.kakao.maps.services.Geocoder();

              // 사용자의 주소를 좌표로 변환
              geocoder.addressSearch(
                logindUser.MEMBER_ADRESS,
                (result, status) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    const userCoords = new window.kakao.maps.LatLng(
                      result[0].y,
                      result[0].x
                    );

                    // 각 매장과 현재 위치의 거리 계산
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
                      const nearestCoords = new window.kakao.maps.LatLng(
                        nearestStore.lat,
                        nearestStore.lng
                      );

                      // 가장 가까운 매장에 마커 표시
                      var marker = new window.kakao.maps.Marker({
                        map: map,
                        position: nearestCoords,
                      });

                      // 지도 중심을 가장 가까운 매장으로 이동
                      map.setCenter(nearestCoords);

                      var iwContent = `<div style="padding:5px; font-size:12px; width:200px;">${nearestStore.name}<br>${nearestStore.tel}<br>${nearestStore.address}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                      var iwPosition = new window.kakao.maps.LatLng(
                        nearestCoords
                      ); //인포윈도우 표시 위치입니다

                      // 인포윈도우를 생성합니다
                      var infowindow = new window.kakao.maps.InfoWindow({
                        position: iwPosition,
                        content: iwContent,
                      });

                      // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
                      infowindow.open(map, marker);

                      storeNameElement.textContent = nearestStore.name;
                      setStoreInfo({
                        name: "미스터피자 " + nearestStore.name,
                        tel: nearestStore.tel,
                        address: nearestStore.address,
                      });
                    }
                  } else {
                    alert("현재 위치를 찾을 수 없습니다.");
                  }
                }
              );
            } else {
              // 비로그인 상태면 서울점으로 표시
              const coords = new window.kakao.maps.LatLng(
                stores[0].lat,
                stores[0].lng
              );

              var marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });
              map.setCenter(coords);
              storeNameElement.textContent = stores[0].name;

              var iwContent = `<div style="padding:5px; font-size:12px; width:200px;">${stores[0].name}<br>${stores[0].tel}<br>${stores[0].address}</div>`; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              var iwPosition = new window.kakao.maps.LatLng(coords); //인포윈도우 표시 위치입니다

              // 인포윈도우를 생성합니다
              var infowindow = new window.kakao.maps.InfoWindow({
                position: iwPosition,
                content: iwContent,
              });

              // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
              infowindow.open(map, marker);
              setStoreInfo({
                name: "미스터피자 " + stores[0].name,
                tel: stores[0].tel,
                address: stores[0].address,
              });
            }
          });
        } else {
          console.error("Kakao API가 제대로 로드되지 않았습니다.");
        }
      };

      kakaoScript.onerror = () => {
        console.error("Kakao 지도 API 스크립트 로드에 실패했습니다.");
      };

      document.head.appendChild(kakaoScript);
    }
  }, [hashName]);

  function searchStore() {
    const storeNameElement = document.querySelector(".result-store-strong");
    const ask = document.getElementById("search-store").value;

    if (ask !== "" && ask !== undefined && ask !== null) {
      if (ask.length >= 2) {
        const kakaoScript = document.createElement("script");
        kakaoScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=89f833dcfaa9b766dfea38b685368114&autoload=false&libraries=services`;
        kakaoScript.async = true;

        const filteredStores = stores.filter((store) =>
          store.name.includes(ask)
        );

        if (filteredStores.length > 0) {
          const resultStore = filteredStores[0]; // 첫 번째 매장 정보
          const latLng = new window.kakao.maps.LatLng(
            resultStore.lat,
            resultStore.lng
          );

          const mapContainer = document.getElementById("map"); // 지도를 표시할 div
          const mapOption = {
            center: latLng, // 검색된 매장 좌표로 지도 중심 설정
            level: 3, // 지도의 확대 레벨
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: latLng,
          });

          // 지도 중심을 가장 가까운 매장으로 이동
          map.setCenter(latLng);

          const iwContent = `<div style="padding:5px; font-size:12px; width:200px;">${resultStore.name}<br>${resultStore.tel}<br>${resultStore.address}</div>`; // 인포윈도우에 표출될 내용
          const infowindow = new window.kakao.maps.InfoWindow({
            position: latLng, // 인포윈도우 위치
            content: iwContent,
          });

          // 마커 위에 인포윈도우를 표시합니다.
          infowindow.open(map, marker);
          storeNameElement.textContent = filteredStores[0].name;
          setStoreInfo({
            name: "미스터피자 " + filteredStores[0].name,
            tel: filteredStores[0].tel,
            address: filteredStores[0].address,
          });
          console.log(aaa);
          aaa.value = "선택";
          bbb.value = "선택";
        } else {
          alert("검색된 매장이 없습니다.");
        }
      } else {
        alert("검색어는 2글자 이상 입력해주세요");
      }
    } else {
      alert("검색어를 입력해주세요");
    }
  }

  return (
    <div id="container">
      <aside id="lnb">
        <h1>매장안내</h1>
        <ul>
          <li>
            <a
              href="#FindStore"
              title="매장찾기"
              className={hashName === "#FindStore" ? "on" : null}
            >
              매장찾기
            </a>
          </li>
          <li>
            <a href="#buffet" className={hashName === "#buffet" ? "on" : null}>
              뷔페매장
            </a>
          </li>
        </ul>
      </aside>
      <section id="join-contents">
        <ul id="location">
          <li>
            <a className="home" href="/">
              HOME
            </a>
          </li>
          <li>
            <span>매장안내</span>
          </li>
          <li>
            <strong>매장찾기</strong>
          </li>
        </ul>

        <div className="cont_top">
          {hashName === "#FindStore" ? <h1>매장찾기</h1> : <h1>뷔페매장</h1>}
        </div>
        {hashName === "#FindStore" ? (
          <div className="search-cont">
            <div className="search-area">
              <input
                type="text"
                className="search-store"
                id="search-store"
                placeholder="매장명 입력"
              />
              <button
                type="button"
                className="button"
                style={{
                  marginLeft: "10px",
                  height: "30px",
                  marginBottom: "10px",
                }}
                onClick={searchStore}
              >
                검색
              </button>
              <div className="select-address-area">
                <select name="select-address1" className="select-address1">
                  <option value="선택">광역시/도</option>
                  <option value="서울">서울특벌시</option>
                  <option value="인천">인천광역시</option>
                  <option value="부산">부산광역시</option>
                </select>
                <select name="select-address2" className="select-address2">
                  <option value="선택">시/군/구</option>
                  <option value="금천구">금천구</option>
                  <option value="부평구">부평구</option>
                  <option value="부산진구">부산진구</option>
                </select>
              </div>
            </div>
            <div className="result-store">
              <strong className="result-store-strong"></strong>
            </div>

            <div className="map-area">
              <div id="map" style={{ width: "100%", height: "350px" }}></div>
            </div>
            <div className="store-info">
              <div className="f_left">
                <h2 className="store-name" id="store-name">
                  {storeInfo.name}
                </h2>
                <table className="st_tbl_style">
                  <colgroup>
                    <col style={{ width: "83px" }} />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">전화번호</th>
                      <td className="t_left branch_tel1 branch_data">
                        {storeInfo.tel}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">도로명주소</th>
                      <td className="t_left branch_addr_doro branch_data">
                        {storeInfo.address}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">영업시간</th>
                      <td className="t_left">
                        <table className="tbl_style2">
                          <colgroup>
                            <col />
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "30%" }} />
                            <col style={{ width: "30%" }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th scope="col" className="bggy"></th>
                              <th scope="col" className="bggy">
                                <strong>내점</strong>
                              </th>

                              <th scope="col" className="bggy">
                                <strong>배달</strong>
                              </th>
                              <th scope="col" className="bggy">
                                <strong>포장</strong>
                              </th>
                            </tr>
                            <tr>
                              <th scope="col">평일</th>
                              <td>내점 불가</td>
                              <td>11:00 ~ 21:30</td>
                              <td>11:00 ~ 21:30</td>
                            </tr>
                            <tr>
                              <th scope="col">주말</th>
                              <td>내점 불가</td>
                              <td>11:00 ~ 21:30</td>
                              <td>11:00 ~ 21:30</td>
                            </tr>
                          </thead>
                          <tbody></tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">정보</th>
                      <td className="t_left branch_info">
                        매장사정에 따라 마감 및 영업시간이 다를 수 있습니다.
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">안내</th>
                      <td className="t_left store_ico">
                        <img
                          className="ico "
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_packing2.gif"
                          alt="방문포장 시 20% 할인"
                        />
                        <img
                          className="ico hide"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_packing.gif"
                          alt="방문포장 시 30% 할인"
                        />
                        <img
                          className="ico hide"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_packing3.gif"
                          alt="방문포장 시 40% 할인"
                        />
                        <img
                          className="ico hide"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_salad.gif"
                          alt="샐러드바"
                        />
                        <img
                          className="ico hide"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_yogurt.gif"
                          alt="요거트바"
                        />
                        <img
                          className="ico"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_parking.gif"
                          alt="주차시설"
                        />
                        <img
                          className="ico"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_delivery.gif"
                          alt="배달"
                        />
                        <img
                          className="ico hide"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_restaurant.gif"
                          alt="레스토랑"
                        />
                        <img
                          className="ico hide"
                          src="//cdn.mrpizza.co.kr/2014_resources/images/store/ico_buffet.gif"
                          alt="뷔페"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="f_right">
                <h2 className="cont_tit tit1">매장공지사항 및 이벤트</h2>
                <div className="st_tbl_style bggy">
                  <span>진행중인 이벤트가 없습니다.</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <span>운영중인 매장이 없습니다.</span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Store;
