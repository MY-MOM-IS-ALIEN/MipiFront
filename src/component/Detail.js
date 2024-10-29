import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail({ pizzaList, insertCart }) {
  const { code } = useParams();
  const pizza = pizzaList.find((pizza) => pizza.ID === Number(code));
  console.log(pizza);
  let [defaultValue, setDefaultValue] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [newCart, setNewCart] = useState(null);

  useEffect(() => {
    if (newCart) {
      console.log("셋카트 후 ", newCart);
      insertCart(newCart);
    }
  }, [newCart]);

  const goCartHandle = (pizza) => {
    const user = sessionStorage.getItem("logedInUser");
    const userObject = user ? JSON.parse(user) : null;
    let modalSize = "";
    const selectedRadio = document.querySelector(
      `input[name="pizza_${pizza.ID}_size"]:checked`
    );
    if (selectedRadio) {
      const radioTrue = selectedRadio.value;
      if (radioTrue == pizza.BOARD_M_PRICE) {
        modalSize = "M";
      } else {
        modalSize = "L";
      }
      console.log(defaultValue);
      console.log(selectedPrice);
      console.log(pizza);

      setNewCart({
        MEMBER_ID: userObject.MEMBER_ID,
        CART_ID: pizza.ID,
        CART_TITLE: pizza.BOARD_TITLE,
        CART_SIZE: modalSize,
        CART_PRICE: selectedPrice,
        CART_DOW: "골드",
        CART_COUNT: defaultValue,
      });
    }
  };

  const plusValue = () => {
    const selectedRadio = document.querySelector(
      `input[name="pizza_${pizza.ID}_size"]:checked`
    );
    const newValue = defaultValue + 1;
    let newPrice;
    if (selectedRadio) {
      const radioTrue = selectedRadio.value;
      newPrice = Number(selectedPrice) + Number(radioTrue);
      setSelectedPrice(newPrice);
      setDefaultValue(newValue);
    } else {
      alert("사이즈를 선택해주세요");
    }
  };

  const minusValue = () => {
    const selectedRadio = document.querySelector(
      `input[name="pizza_${pizza.ID}_size"]:checked`
    );
    let newPrice;
    if (selectedRadio) {
      if (defaultValue > 1) {
        const radioTrue = selectedRadio.value;
        const newValue = defaultValue - 1;
        newPrice = Number(selectedPrice) - Number(radioTrue);
        setDefaultValue(newValue);
        setSelectedPrice(newPrice);
      } else {
        alert("최소 수량입니다.");
      }
    } else {
      alert("사이즈를 선택해주세요");
    }
  };

  const orderPrice = (size) => {
    setDefaultValue(1);
    if (size == "M") {
      setSelectedPrice(pizza.BOARD_M_PRICE);
    } else {
      setSelectedPrice(pizza.BOARD_L_PRICE);
    }
  };

  return (
    <div className="content">
      <div className="detail-content" onClick={(e) => e.stopPropagation()}>
        <div className="detail-title">
          <h2>{pizza.BOARD_TITLE}</h2>
          <p>{pizza.BOARD_INFO}</p>
        </div>
        <div className="info-area detail-area">
          <div className="detail-photo-area">
            <img src={pizza.BOARD_IMG} alt={pizza.BOARD_TITLE} />
          </div>
          <div className="info-content">
            <ul>
              <li className="plusMinus">
                <span>수량</span>{" "}
                <input type="text" value={defaultValue} id="defualtValue" />{" "}
                <div className="plusMinus-div">
                  <button type="button" id="plus" onClick={plusValue}>
                    <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/icon_plus.png" />
                  </button>
                  <button type="button" id="minus" onClick={minusValue}>
                    <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/icon_minus.png" />
                  </button>
                </div>
              </li>
              <li>
                <span>가격</span>
                <label>
                  <input
                    className="sizeRadio"
                    type="radio"
                    name={`pizza_${pizza.ID}_size`}
                    value={pizza.BOARD_M_PRICE}
                    onChange={() => orderPrice("M")}
                  />
                  <span style={{ color: "#f17304" }}>
                    {" "}
                    M {pizza.BOARD_M_PRICE}
                  </span>
                </label>
                <label>
                  <input
                    className="sizeRadio"
                    type="radio"
                    name={`pizza_${pizza.ID}_size`}
                    value={pizza.BOARD_L_PRICE}
                    onChange={() => orderPrice("L")}
                  />
                  <span style={{ color: "#cb1919" }}>
                    {" "}
                    L {pizza.BOARD_L_PRICE}
                  </span>
                </label>
              </li>
              <li style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>조각정보</span>
                <p
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <img src="https://cdn.mrpizza.co.kr/2014_resources/images/product/sizeM.gif" />
                  <span style={{ marginLeft: "5px", textAlign: "left" }}>
                    레귤러 <br />
                    (2~3인용)
                  </span>
                </p>
                <p style={{ display: "inline-flex", alignItems: "center" }}>
                  <img src="https://cdn.mrpizza.co.kr/2014_resources/images/product/sizeL.gif" />
                  <span style={{ marginLeft: "5px", textAlign: "left" }}>
                    라지 <br />
                    (3~4인용)
                  </span>
                </p>
              </li>
              <p className="price-area">
                주문금액 <span id="orderPrice">{selectedPrice}</span>
              </p>
            </ul>
            <div className="detail-btn-area">
              <button
                type="button"
                className="button w100"
                onClick={() => goCartHandle(pizza)}
              >
                장바구니<span className="gt">&gt;</span>
              </button>
              <a href="#" className="button red w100">
                바로주문<span className="gt">&gt;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <h1 className="line-tit">
        <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/bg_lineTit.gif" />
        <span>메뉴 소개</span>
      </h1>
      <div className="product_summary">
        케이준치킨과 시금치로 더 라이트하고
        <br />
        담백하게 즐길 수 있는 웰빙 피자! ‘{pizza.BOARD_TITLE}’
        <br />
        <br />
        - 토핑 -<br />
        화이트핫소스, 케이준치킨, 블루치즈소스, 시금치 등
      </div>
      <h1 className="line-tit">
        <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/bg_lineTit.gif" />
        <span>영양 & 기타정보</span>
      </h1>
      <div className="line-btn-area">
        <button className="line-btn">원산지 정보</button>
        <button className="line-btn">영양 정보</button>
        <button className="line-btn">알레르기 유발 재료</button>
      </div>
      <div className="line-img-area">
        <img src="https://cdn.mrpizza.co.kr/2024_resources/images/main/menu_bottom_240329_1.jpg" />
      </div>
      <a href="/menuList">
        <button
          className="button"
          style={{
            width: "180px",
            height: "45px",
            marginTop: "30px",
            marginLeft: "140px",
            marginBottom: "50px",
          }}
        >
          목록가기
        </button>
      </a>
    </div>
  );
}

export default Detail;
