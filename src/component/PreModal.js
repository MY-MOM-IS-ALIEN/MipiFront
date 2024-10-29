import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function PreModal({ newPizzaList, onClose, goCart }) {
  let [defaultValue, setDefaultValue] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const goCartHandle = (newPizzaList) => {
    let modalSize = "";
    const selectedRadio = document.querySelector(
      `input[name="pizza_${newPizzaList.ID}_size"]:checked`
    );
    if (selectedRadio) {
      const radioTrue = selectedRadio.value;
      if (radioTrue == newPizzaList.BOARD_M_PRICE) {
        modalSize = "M";
      } else {
        modalSize = "L";
      }
      console.log(defaultValue);
      console.log(selectedPrice);
      goCart(newPizzaList, defaultValue, selectedPrice, modalSize);
    }
  };

  const plusValue = () => {
    const selectedRadio = document.querySelector(
      `input[name="pizza_${newPizzaList.ID}_size"]:checked`
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
      `input[name="pizza_${newPizzaList.ID}_size"]:checked`
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
      setSelectedPrice(newPizzaList.BOARD_M_PRICE);
    } else {
      setSelectedPrice(newPizzaList.BOARD_L_PRICE);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="prev-title">
          <h2>{newPizzaList.BOARD_TITLE}</h2>
          <p>{newPizzaList.BOARD_INFO}</p>
          <button onClick={onClose}>X</button>
        </div>
        <div className="info-area">
          <div className="photo-area">
            <img src={newPizzaList.BOARD_IMG} alt={newPizzaList.BOARD_TITLE} />
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
                    name={`pizza_${newPizzaList.ID}_size`}
                    value={newPizzaList.BOARD_M_PRICE}
                    onChange={() => orderPrice("M")}
                  />
                  <span style={{ color: "#f17304" }}>
                    {" "}
                    M {newPizzaList.BOARD_M_PRICE}
                  </span>
                </label>
                <label>
                  <input
                    className="sizeRadio"
                    type="radio"
                    name={`pizza_${newPizzaList.ID}_size`}
                    value={newPizzaList.BOARD_L_PRICE}
                    onChange={() => orderPrice("L")}
                  />
                  <span style={{ color: "#cb1919" }}>
                    {" "}
                    L {newPizzaList.BOARD_L_PRICE}
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
            <div className="pre-btn-area">
              <Link
                to={`/menuList/Detail/${newPizzaList.ID}`}
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
                className="button w100"
              >
                상세보기<span className="gt">&gt;</span>
              </Link>
              <button
                type="button"
                className="button w100"
                onClick={() => goCartHandle(newPizzaList)}
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
    </div>
  );
}

export default PreModal;
