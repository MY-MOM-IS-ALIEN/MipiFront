import React, { useState, useRef, useEffect } from "react";
import "../css/MenuList.css";
import PreModal from "./PreModal";
import { Link, useLocation } from "react-router-dom";

function MenuList({ pizzaList, insertCart }) {
  const [activePizza, setActivePizza] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [openPreModal, setOpenPreModal] = useState(null);
  const [newCart, setNewCart] = useState(null);
  const [pizzaListHandleBool, setPizzaHandleBool] = useState(10000);
  const [sortOption, setSortOption] = useState("D"); // 정렬 옵션 상태 추가

  const location = useLocation();

  const pizzaListHandle = (price) => {
    setPizzaHandleBool(price);
  };

  useEffect(() => {
    if (newCart) {
      insertCart(newCart);
    }
  }, [newCart]);

  const goCart = (pizza, count, countPrice, modalSize) => {
    const userObject = JSON.parse(sessionStorage.getItem("logedInUser"));

    const selectedRadio = document.querySelector(
      `input[name="pizza_${pizza.ID}_size"]:checked`
    );
    let cartSize = "";
    let radioTrue = null;

    if (selectedRadio) {
      radioTrue = selectedRadio.value;

      if (radioTrue == pizza.BOARD_M_PRICE) {
        cartSize = "M";
      } else {
        cartSize = "L";
      }
    } else {
      alert("사이즈를 선택하세요.");
      return;
    }

    if (count > 0 && countPrice > 0 && modalSize !== "") {
      setNewCart({
        MEMBER_ID: userObject.MEMBER_ID,
        CART_TITLE: pizza.BOARD_TITLE,
        CART_SIZE: modalSize,
        CART_PRICE: countPrice,
        CART_DOW: "골드",
        CART_COUNT: count,
      });
    } else {
      setNewCart({
        MEMBER_ID: userObject.MEMBER_ID,
        CART_TITLE: pizza.BOARD_TITLE,
        CART_SIZE: cartSize,
        CART_PRICE: radioTrue,
        CART_DOW: document.querySelector("#select-dow").value,
        CART_COUNT: 1,
      });
    }
  };

  const preModal = (id) => {
    const filteredPizza = pizzaList.filter((pizza) => pizza.ID === id);

    if (filteredPizza.length > 0) {
      setOpenPreModal(filteredPizza[0]);
      setActivePizza(null);
    }
  };

  const closeModal = () => {
    setOpenPreModal(null);
  };

  const handelMenuOpen = (index) => {
    setActiveMenu(index);
  };

  const handelMenuClose = (index) => {
    setActiveMenu(null);
  };

  const handleMouseEnter = (pizzaID) => {
    setActivePizza(pizzaID);
  };

  const handleMouseLeave = () => {
    setActivePizza(null);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value); // 정렬 옵션 업데이트
  };

  const sortedPizzaList = [...pizzaList]
    .filter((pizza) => {
      if (pizzaListHandleBool === 5000) {
        return (
          pizza.BOARD_M_PRICE > pizzaListHandleBool &&
          pizza.BOARD_M_PRICE <= 10000
        );
      }
      return pizza.BOARD_M_PRICE > pizzaListHandleBool;
    })
    .sort((a, b) => {
      return sortOption === "D"
        ? a.BOARD_M_PRICE - b.BOARD_M_PRICE // 낮은 가격순
        : b.BOARD_M_PRICE - a.BOARD_M_PRICE; // 높은 가격순
    });

  return (
    <>
      {openPreModal && (
        <PreModal
          newPizzaList={openPreModal}
          onClose={closeModal}
          goCart={goCart}
        />
      )}
      <div className="menu_category_loca_wrap">
        <ul id="location">
          <li>
            <a className="home" href="/index">
              HOME
            </a>
          </li>
          <li>
            <span id="location_title"></span>
          </li>
          <li>
            <strong>프리미엄 피자</strong>
          </li>
        </ul>
        <ul className="menu_category">
          <li>
            <a
              href="/MenuList#premium"
              id="first_category"
              className={
                location.pathname + location.hash === "/MenuList#premium" ||
                location.pathname + location.hash === "/MenuList#classic" ||
                location.pathname + location.hash === "/MenuList#all"
                  ? "on"
                  : null
              }
            >
              피자
            </a>
          </li>
          <li>
            <a href="#solo" className={location.hash === "#solo" ? "on" : null}>
              1인용피자
            </a>
          </li>
          <li>
            <a
              href="#special"
              className={location.hash === "#special" ? "on" : null}
            >
              특가세트
            </a>
          </li>
          <li>
            <a href="#side" className={location.hash === "#side" ? "on" : null}>
              샐러드&사이드
            </a>
          </li>
        </ul>
      </div>
      {location.hash === "#solo" ||
      location.hash === "#special" ||
      location.hash === "#side" ? (
        <div style={{ alignItems: "center" }}>
          <span>판매중인 메뉴가 없습니다.</span>
        </div>
      ) : (
        <div id="container">
          <aside id="menu_lnb">
            <h1 id="lnb_title">피자</h1>
            <ul>
              <li className="active">
                <button onClick={() => pizzaListHandle(10000)}>
                  <a
                    href="#premium"
                    className={location.hash === "#premium" ? "on" : null}
                  >
                    프리미엄 피자
                    <img
                      src="//cdn.mrpizza.co.kr/2014_resources/images/common/lnb_new_s.gif"
                      alt="신제품"
                    />
                    <img
                      src="https://cdn.mrpizza.co.kr/2014_resources/images/common/bg_lnbActive2On.gif"
                      alt=""
                    />
                  </a>
                </button>
              </li>
              <li>
                <button onClick={() => pizzaListHandle(5000)}>
                  <a
                    href="#classic"
                    className={location.hash === "#classic" ? "on" : null}
                  >
                    클래식 피자
                    <img
                      src="https://cdn.mrpizza.co.kr/2014_resources/images/common/bg_lnbActive2.gif"
                      alt=""
                    />
                  </a>
                </button>
              </li>
              <li>
                <button onClick={() => pizzaListHandle(0)}>
                  <a
                    href="#all"
                    className={location.hash === "#all" ? "on" : null}
                  >
                    모두보기
                    <img
                      src="https://cdn.mrpizza.co.kr/2014_resources/images/common/bg_lnbActive2.gif"
                      alt=""
                    />
                  </a>
                </button>
              </li>
            </ul>

            <div className="lnb_sort">
              <h2>메뉴정렬</h2>
              <div>
                <ul>
                  <li>
                    <label>
                      <input
                        type="radio"
                        className="radio"
                        id="product_sort_2"
                        name="product_sort"
                        value="D"
                        checked={sortOption === "D"}
                        onChange={handleSortChange}
                      />
                      <span className="lbl">가격 낮은순</span>
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        className="radio"
                        id="product_sort_3"
                        name="product_sort"
                        value="E"
                        checked={sortOption === "E"}
                        onChange={handleSortChange}
                      />
                      <span className="lbl">가격 높은순</span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <section id="contents">
            <form id="menuForm" name="menuForm">
              <input
                type="hidden"
                id="product_case"
                name="product_case"
                value=""
              />
              <input
                type="hidden"
                id="product_key"
                name="product_key"
                value=""
              />
              <input
                type="hidden"
                id="product_gubun"
                name="product_gubun"
                value=""
              />
              <input type="hidden" id="dough_id" name="dough_id" value="" />
              <input type="hidden" id="option_id" name="option_id" value="" />
              <input
                type="hidden"
                id="pasta_option_id"
                name="pasta_option_id"
                value=""
              />
              <div className="cont_top menu_top">
                <h1>
                  {location.hash === "#premium"
                    ? "프리미엄 피자"
                    : location.hash === "#classic"
                    ? "클래식 피자"
                    : "모든 피자"}
                </h1>
                <p>프리미엄 토핑을 더 풍성하게 특별하게 즐기는 피자</p>
              </div>
            </form>
            <hr />
            <div className="contents">
              <div className="menu-area">
                <ul>
                  {sortedPizzaList.map((pizza) => (
                    <li
                      key={pizza.ID}
                      onMouseEnter={() => handleMouseEnter(pizza.ID)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={`/menuList/Detail/${pizza.ID}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <img
                          src={pizza.BOARD_IMG}
                          alt={pizza.BOARD_TITLE}
                          style={{ width: "237px", height: "157px" }}
                        />
                        <strong>{pizza.BOARD_TITLE}</strong>
                      </Link>
                      <label>
                        <input
                          type="radio"
                          className="sizeRadio"
                          name={`pizza_${pizza.ID}_size`}
                          value={pizza.BOARD_M_PRICE}
                        />
                        <span id="M"> M {pizza.BOARD_M_PRICE}</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          className="sizeRadio"
                          name={`pizza_${pizza.ID}_size`}
                          value={pizza.BOARD_L_PRICE}
                        />
                        <span id="L"> L {pizza.BOARD_L_PRICE}</span>
                      </label>
                      <br />
                      {activePizza === pizza.ID && (
                        <div
                          className="select-area"
                          style={{ display: "block" }}
                        >
                          <select className="select_content" id="select-dow">
                            <option value="골드">골드</option>
                            <option value="크림치즈">크림치즈</option>
                            <option value="에그타르트">에그타르트</option>
                          </select>
                          <div className="menubar-area">
                            <div
                              className="menubar-cont menu1"
                              onMouseEnter={() => handelMenuOpen(0)}
                              onMouseLeave={() => handelMenuClose(0)}
                            >
                              {activeMenu === 0 ? (
                                <button onClick={() => preModal(pizza.ID)}>
                                  <p>미리보기</p>
                                </button>
                              ) : (
                                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/product/ic_memu01.gif" />
                              )}
                            </div>
                            <div
                              className="menubar-cont menu2"
                              onMouseEnter={() => handelMenuOpen(1)}
                              onMouseLeave={() => handelMenuClose(1)}
                            >
                              {activeMenu === 1 ? (
                                <button
                                  type="button"
                                  onClick={() => goCart(pizza)}
                                >
                                  <p>장바구니</p>
                                </button>
                              ) : (
                                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/product/ic_memu02.gif" />
                              )}
                            </div>
                            <div
                              className="menubar-cont menu3"
                              onMouseEnter={() => handelMenuOpen(2)}
                              onMouseLeave={() => handelMenuClose(2)}
                            >
                              {activeMenu === 2 ? (
                                <button type="button">
                                  <p>바로주문</p>
                                </button>
                              ) : (
                                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/product/ic_memu03.gif" />
                              )}
                            </div>
                          </div>
                          <div className="menubar-info">
                            <span>{pizza.BOARD_INFO}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default MenuList;
