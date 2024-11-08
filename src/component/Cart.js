import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import "../css/Cart.css";
import greyCart from "../img/grey_cart.gif";
import redCart from "../img/red_cart.gif";
import greyPayment from "../img/grey_payment.gif";
import redPayment from "../img/red_payment.gif";
import { useState, useEffect } from "react";

const Cart = ({ insertCart, deleteCart, setCartListLength }) => {
  const location = useLocation();
  const pathName = location.pathname;
  const userObject = JSON.parse(sessionStorage.getItem("logedInUser")) || null;
  const memberId = userObject?.MEMBER_ID;
  const cartList = JSON.parse(sessionStorage.getItem("cartList"));

  const [allchk, setAllchk] = useState(false); // 전체 체크 여부 상태
  const [selectedPrices, setSelectedPrices] = useState([]); // 선택된 가격들의 배열
  const [checkedItems, setCheckedItems] = useState([]); // 개별 체크 상태 관리

  const selectDelete = () => {
    if (checkedItems != "") {
      Object.values(checkedItems).forEach((el) => {
        if (el.CHECKED) {
          deleteCart(el.ID);
          window.location.reload();
        } else {
          alert("삭제할 제품을 선택해주세요");
        }
      });
    } else {
      alert("삭제할 제품을 선택해주세요");
    }
  };

  // const selectDelete = async () => {
  //   const existingBoxItem = Object.entries(checkedItems).find(
  //     ([key, el]) => el.CHECKED === true
  //   );

  //   if (existingBoxItem) {
  //     // existingBoxItem이 정의된 경우에만 처리
  //     const [key, el] = existingBoxItem; // 배열을 구조분해할당
  //     const isChecked = el.CHECKED; // CHECKED 값 확인
  //     console.log(isChecked); // CHECKED 값을 확인

  //     // 모든 insertCart 호출을 Promise로 배열에 저장
  //     const insertPromises = selectedPrices.map((el) => {
  //       return insertCart({ CART_ID: el.ID });
  //     });

  //     // 모든 Promise가 완료될 때까지 대기
  //     await Promise.all(insertPromises);

  //     // 모든 작업이 완료된 후 페이지 리로드
  //     window.location.reload();
  //   } else {
  //     console.log(checkedItems);
  //     alert("삭제하실 제품을 선택해주세요."); // 체크된 항목이 없을 경우 알림
  //   }
  // };

  // 전체 체크박스 클릭 시 호출되는 함수
  const allCheck = () => {
    console.log("호출");
    const newAllChkState = !allchk;
    setAllchk(newAllChkState);

    const updatedCheckedItems = {};
    const newSelectedPrices = [];

    // 모든 아이템에 대해 전체 체크 여부에 따라 업데이트
    cartList
      .filter((item) => item.MEMBER_ID === memberId)
      .forEach((item) => {
        updatedCheckedItems[item.CART_ID] = {
          ID: item.CART_ID,
          CHECKED: newAllChkState,
        };
        if (newAllChkState) {
          newSelectedPrices.push({ ID: item.CART_ID, PRICE: item.CART_PRICE }); // 전체 체크 시 모든 가격을 선택
        }
      });

    setCheckedItems(updatedCheckedItems);
    setSelectedPrices(newSelectedPrices); // 선택된 가격 목록 업데이트
  };

  // 개별 체크박스 클릭 시 호출되는 함수
  const handleCheck = (price, isChecked, cartId) => {
    // checkedItems 상태 업데이트

    setCheckedItems((prev) => ({
      ...prev,
      [cartId]: { ID: cartId, CHECKED: isChecked }, // isChecked 값을 그대로 사용
    }));

    // 선택된 가격 상태 업데이트
    setSelectedPrices((prev) => {
      if (isChecked) {
        // 체크된 항목 추가
        return [...prev, { ID: cartId, PRICE: price }];
      } else {
        // 체크 해제 시 해당 항목 제거
        return prev.filter((item) => item.ID !== cartId);
      }
    });
  };

  const formatPrice = (price) => {
    price = Number(price);

    return price.toLocaleString();
  };

  // const countHandle = (action, id) => {
  //   // 수량 업데이트
  //   const newCountRe = (prevState) => {
  //     const newCount = { ...prevState };
  //     const currentCount =
  //       newCount[id] ||
  //       cartList.find((cart) => cart.CART_ID === id)?.CART_COUNT ||
  //       0;

  //     if (action === "plus") {
  //       newCount[id] = currentCount + 1;
  //     } else if (action === "minus") {
  //       newCount[id] = Math.max(currentCount - 1, 0);
  //     }

  //     updateCount.current = newCount[id]; // useRef에 수량 저장
  //     updateId.current = id; // useRef에 ID 저장
  //     return newCount;
  //   };

  //   // 가격 업데이트
  //   const newCountPrice = (prevPrice) => {
  //     const item = cartList.find((cart) => cart.CART_ID === id);
  //     const itemPrice = item ? item.CART_PRICE / item.CART_COUNT : 0;
  //     const newPrice = { ...prevPrice };
  //     const calculatedPrice = newCountRe(countRe)[id] * itemPrice;
  //     newPrice[id] = calculatedPrice;

  //     updatePrice.current = calculatedPrice; // useRef에 가격 저장

  //     const existingBoxItem = Object.entries(checkedItems).find(
  //       ([key, el]) => el.ID === id
  //     );

  //     if (existingBoxItem) {
  //       // selectedPrices에서 해당 ID 찾기
  //       const [key, el] = existingBoxItem; // 배열을 구조분해할당
  //       const isChecked = el.CHECKED; // CHECKED 값 확인
  //       console.log(isChecked); // CHECKED 값을 확인
  //       if (isChecked) {
  //         const existingItem = selectedPrices.find((el) => el.ID === id);

  //         if (existingItem) {
  //           console.log("있음에 찍힘");
  //           setSelectedPrices((prev) =>
  //             prev.map((el) =>
  //               el.ID === id ? { ...el, PRICE: calculatedPrice } : el
  //             )
  //           );
  //         } else {
  //           console.log("없음에 찍힘");
  //           setSelectedPrices((prev) => [
  //             ...prev,
  //             { ID: id, PRICE: calculatedPrice },
  //           ]);
  //         }
  //       } else {
  //         setSelectedPrices(selectedPrices.filter((prev) => prev.ID !== id));
  //       }
  //     }
  //     return newPrice;
  //   };

  //   // 상태 업데이트
  //   setCountRe(newCountRe);
  //   setCountPrice(newCountPrice);
  // };

  const [cartList1, setCartList1] = useState([]);

  // 컴포넌트가 처음 렌더링될 때 sessionStorage에서 cartList 불러오기
  useEffect(() => {
    const storedCartList = JSON.parse(sessionStorage.getItem("cartList")) || [];
    setCartList1(storedCartList);
  }, []);

  const countHandle = (action, id) => {
    const prevCart = [...cartList1]; // 상태에서 복사본 생성
    const updateCart = prevCart.find((el) => el.CART_ID === id);
    const prevSelectedPrice = selectedPrices.find((el) => el.ID === id);

    if (!updateCart) return; // 해당 ID가 없을 때 함수 종료

    const updatePrice = updateCart.CART_PRICE / updateCart.CART_COUNT;

    if (action === "plus") {
      if (prevSelectedPrice) {
        prevSelectedPrice.PRICE = Number(prevSelectedPrice.PRICE) + updatePrice;
      }
      updateCart.CART_COUNT++;
      updateCart.CART_PRICE = Number(updateCart.CART_PRICE) + updatePrice;
    } else {
      if (prevSelectedPrice) {
        prevSelectedPrice.PRICE = Number(prevSelectedPrice.PRICE) - updatePrice;
      }
      updateCart.CART_COUNT--;
      updateCart.CART_PRICE = Number(updateCart.CART_PRICE) - updatePrice;
    }

    // 업데이트된 배열 생성 및 상태 업데이트
    const updatedCartList = prevCart
      .map((item) => (item.CART_ID === id ? updateCart : item))
      .filter((item) => item.CART_COUNT > 0);

    setCartList1(updatedCartList); // 상태 업데이트
    setCartListLength(
      updatedCartList.reduce((sum, el) => sum + el.CART_COUNT, 0)
    );
    sessionStorage.setItem("cartList", JSON.stringify(updatedCartList)); // sessionStorage 업데이트
  };

  return (
    <div className="container">
      <section id="cart-contents" className="ca-cart-container">
        <ul id="location" className="ca-breadcrumb">
          <li>
            <a className="ca-home" href="/">
              HOME
            </a>
          </li>
          <li>
            <strong>장바구니</strong>
          </li>
        </ul>

        <div className="ca-order_top">
          <div className="ca-tit">
            <h1>장바구니</h1>
            <div className="ca-order-type">
              <p>
                주문유형 : <span className="ca-t_blue">배달주문</span>
              </p>
              <button className="ca-button ca-order-type-btn">
                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/order/ic_reset.gif"
                  alt="주문유형변경 아이콘"
                />{" "}
                주문유형변경
              </button>
            </div>
          </div>
          <ul className="ca-order-steps">
            <li className="ca-step ca-on">
              <div className="ca-icon-wrapper">
                {pathName === "/Cart" ? (
                  <img src={redCart} alt="주문완료" className="ca-step-icon" />
                ) : (
                  <img src={greyCart} alt="주문완료" className="ca-step-icon" />
                )}
              </div>
              <p>장바구니</p>
            </li>
            <li className="ca-step ca-on">
              <div className="ca-icon-wrapper">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/order/bg_next.gif" />
              </div>
            </li>
            <li className="ca-step">
              <div className="ca-icon-wrapper">
                {pathName === "/Cart" ? (
                  <img
                    src={greyPayment}
                    alt="주문완료"
                    className="ca-step-icon"
                  />
                ) : (
                  <img
                    src={redPayment}
                    alt="주문완료"
                    className="ca-step-icon"
                  />
                )}
              </div>
              <p>주문완료</p>
            </li>
          </ul>
        </div>
        <div className="order-area">
          <section className="ca-l_order">
            <h2 className="ca-cont_tit ca-tit2">담은제품</h2>
            <table className="ca-tbl_style ca-order_tbl ca-mt10">
              <colgroup>
                <col style={{ width: "40px" }} />
                <col style={{ width: "175px" }} />
                <col />
                <col style={{ width: "155px" }} />
                <col style={{ width: "180px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    <label>
                      <input
                        name="checkbox"
                        type="checkbox"
                        className="ca-checkbox"
                        style={{ width: "20px", height: "20px" }}
                        onChange={allCheck}
                      />
                      <span className="ca-lbl"></span>
                    </label>
                  </th>
                  <th scope="col" colSpan="3">
                    제품
                  </th>
                  <th scope="col">수량</th>
                  <th scope="col">가격</th>
                </tr>
              </thead>
              {cartList == "" || cartList == null || cartList == undefined ? (
                <tbody>
                  <tr>
                    <th scope="col" colSpan="6">
                      장바구니가 비어있습니다.
                    </th>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {cartList.map((cart) => (
                    <tr key={cart.CART_ID}>
                      <td>
                        <input
                          type="checkbox"
                          className="ca-checkbox"
                          style={{ width: "20px", height: "20px" }}
                          checked={checkedItems[cart.CART_ID]?.CHECKED || false} // 개별 체크 상태
                          onChange={(e) =>
                            handleCheck(
                              cart.CART_PRICE,
                              e.target.checked,
                              cart.CART_ID
                            )
                          }
                        />
                      </td>
                      <td
                        style={{
                          border: "none",
                          borderBottom: "1px solid #cccccc",
                        }}
                      >
                        <img
                          src={cart.CART_IMG}
                          style={{ width: "150px", height: "100px" }}
                        />
                      </td>
                      <td colSpan="2">
                        <strong className="title-strong">
                          {cart.CART_TITLE}
                        </strong>
                        <br />
                        <span className="title-span">
                          사이즈 : {cart.CART_SIZE}
                          {cart.CART_SIZE === "M" ? "(미디움)" : "(라지)"}
                        </span>
                        <br />
                        <span className="title-span">
                          엣지 : {cart.CART_DOW}
                        </span>
                      </td>
                      <td>
                        <input
                          type="text"
                          id={`count-input-${cart.CART_ID}`} // 고유 ID 추가
                          className="count-input"
                          value={cart.CART_COUNT}
                          readOnly
                        />
                        <div className="plusMinus-div">
                          <button
                            type="button"
                            id="plus"
                            onClick={() => countHandle("plus", cart.CART_ID)} // cart.id 전달
                          >
                            <img
                              src="https://cdn.mrpizza.co.kr/2014_resources/images/common/icon_plus.png"
                              alt="plus"
                            />
                          </button>
                          <button
                            type="button"
                            id="minus"
                            onClick={() => countHandle("minus", cart.CART_ID)} // cart.id 전달
                          >
                            <img
                              src="https://cdn.mrpizza.co.kr/2014_resources/images/common/icon_minus.png"
                              alt="minus"
                            />
                          </button>
                        </div>
                      </td>
                      <td id="lastTd">
                        <strong>{formatPrice(cart.CART_PRICE)}</strong>
                        <span>원</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <p className="ca-mt10">
              <button
                className="ca-button ca-h30 ca-w115 ca-white"
                onClick={allCheck}
              >
                제품전체선택
              </button>
              <button className="ca-button ca-h30 ca-w115 ca-white">
                계속 주문하기
              </button>
              <button
                className="ca-button ca-h30 ca-w115 ca-delProduct_pop_open"
                onClick={selectDelete}
              >
                선택제품삭제 <span className="ca-ic_x"></span>
              </button>
            </p>
            <ul className="ca-txt_list ca-mt40">
              <li>
                장바구니 제품 중 할인 행사 종료된 경우 해당 가격으로 주문이
                불가합니다.
              </li>
              <li>
                사이즈 구분 없이 피클, 핫소스, 갈릭소스 각 1개씩 제공됩니다.
              </li>
              <li>그 외 추가 수량은 사이드 메뉴란에서 유상 주문 가능합니다.</li>
              <li className="ca-bold">
                <strong className="ca-t_red">
                  배달 주문 시 일정 금액의 배달비가 추가될 수 있음을
                  안내드립니다.
                </strong>
                <br />
                <strong className="ca-t_red">
                  (※배달비는 거리별로 상이합니다.)
                </strong>
              </li>
            </ul>
            <input
              type="hidden"
              id="notSaleProductCount"
              name="notSaleProductCount"
              value="0"
            />
          </section>
          <div className="result-area">
            <h1>결제금액</h1>
            <table>
              <tbody>
                <tr>
                  <td style={{ border: "none" }}>
                    <strong>
                      {formatPrice(
                        selectedPrices.reduce(
                          (sum, price) => sum + Number(price.PRICE),
                          0
                        )
                      )}{" "}
                      원
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
