import "./App.css";
import "./css/Style.css";
import "./css/OderModal.css";
import "./css/EventPage.css";
import "./css/MyOrder.css";
import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import SideBar from "./component/SideBar";
import DropDown from "./component/DropDown";
import MenuList from "./component/MenuList";
import Cart from "./component/Cart";
import preModal from "./component/PreModal";
import { Routes, Route, useLocation } from "react-router-dom";
import JoinForm from "./component/JoinForm";
import { LoginForm } from "./component/LoginForm";
import Home from "./component/Home";
import Detail from "./component/Detail";
import { OderModal } from "./component/OderModal";
import Store from "./component/Store";
import EventPage from "./component/EventPage";
import MyOrder from "./component/MyOrder";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(null);
  const [tempCartList, setTempCartList] = useState([]);
  const [openOderModal, setOpenOderModal] = useState(false);
  const cartList = JSON.parse(sessionStorage.getItem("cartList"));
  const stores = [
    {
      name: "서울지점",
      lat: 37.4799696,
      lng: 126.8825073,
      tel: "02-1111-1111",
      address: "서울특별시 금천구 가산동 371-28",
    }, // 서울
    {
      name: "인천지점",
      lat: 37.4927365,
      lng: 126.7285634,
      tel: "032-222-2222",
      address: "인천광역시 부평구 부평동 568-1",
    }, // 인천
    {
      name: "부산지점",
      lat: 35.154835,
      lng: 129.0600326,
      tel: "051-333-3333",
      address: "부산광역시 부산진구 전포동 171-2 ",
    }, // 부산
  ];
  const [pizzaList, setPizzaList] = useState([
    {
      ID: 1,
      BOARD_TITLE: "시크릿가든",
      BOARD_CONTENT:
        "케이준치킨과 시금치로 더 라이트하고 담백하게 즐길 수 있는 웰빙 피자!",
      BOARD_M_PRICE: 10000,
      BOARD_INFO: "담백한 웰빙피자!",
      BOARD_SIZE1: "M",
      BOARD_L_PRICE: 20000,
      BOARD_IMG:
        "https://cdn.mrpizza.co.kr/2011/uploadV1/product_new/20243713488592.jpg",
      BOARD_SIZE2: "L",
    },
    {
      ID: 2,
      BOARD_TITLE: "미트러버",
      BOARD_CONTENT:
        "다양한 육류 토핑이 가득한 미트러버! 육즙 가득한 고기의 풍미를 만끽하세요.",
      BOARD_M_PRICE: 12000,
      BOARD_INFO: "육류가 가득한 피자!",
      BOARD_SIZE1: "M",
      BOARD_L_PRICE: 25000,
      BOARD_IMG:
        "https://cdn.mrpizza.co.kr/2011/uploadV1/product_new/20243792316094.jpg",
      BOARD_SIZE2: "L",
    },
    {
      ID: 3,
      BOARD_TITLE: "베지터블",
      BOARD_CONTENT:
        "신선한 채소와 풍부한 맛의 조화! 베지터블로 건강하고 맛있게.",
      BOARD_M_PRICE: 9000,
      BOARD_INFO: "신선한 채소가 가득한 피자!",
      BOARD_SIZE1: "M",
      BOARD_L_PRICE: 18000,
      BOARD_IMG:
        "https://cdn.mrpizza.co.kr/2011/uploadV1/product_new/20201112153536343.jpg",
      BOARD_SIZE2: "L",
    },
    {
      ID: 4,
      BOARD_TITLE: "페퍼로니",
      BOARD_CONTENT: "매콤하고 짭짤한 페퍼로니가 특징인 클래식 피자.",
      BOARD_M_PRICE: 11000,
      BOARD_INFO: "매콤한 페퍼로니 피자!",
      BOARD_SIZE1: "M",
      BOARD_L_PRICE: 22000,
      BOARD_IMG:
        "https://cdn.mrpizza.co.kr/2011/uploadV1/product_new/20207131895047.jpg",
      BOARD_SIZE2: "L",
    },
    {
      ID: 5,
      BOARD_TITLE: "하와이안",
      BOARD_CONTENT: "달콤한 파인애플과 햄의 조화가 일품인 하와이안 피자.",
      BOARD_M_PRICE: 9500,
      BOARD_INFO: "달콤한 파인애플과 햄의 피자!",
      BOARD_SIZE1: "M",
      BOARD_L_PRICE: 19000,
      BOARD_IMG:
        "https://cdn.mrpizza.co.kr/2011/uploadV1/product_new/2023316133821010.png",
      BOARD_SIZE2: "L",
    },
    {
      ID: 6,
      BOARD_TITLE: "고르곤졸라",
      BOARD_CONTENT: "짭짤하고 크리미한 고르곤졸라 치즈가 가득!",
      BOARD_M_PRICE: 13000,
      BOARD_INFO: "풍부한 치즈의 맛!",
      BOARD_SIZE1: "M",
      BOARD_L_PRICE: 27000,
      BOARD_IMG:
        "https://cdn.mrpizza.co.kr/2011/uploadV1/product_new/2018530133324258.jpg",
      BOARD_SIZE2: "L",
    },
  ]);
  const initialUsers = JSON.parse(sessionStorage.getItem("testIdPw")) || [
    {
      ID: 1,
      MEMBER_ID: "test",
      MEMBER_PASSWORD: "test",
      MEMBER_ADRESS: "서울 특별시 가산디지털1로 168",
      MEMBER_NAME: "방문자",
      MEMBER_PHONE: "010-1234-1234",
    },
  ];
  const [testIdPw, setTestIdPw] = useState(initialUsers);

  // Haversine 공식을 이용한 거리 계산 함수
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반경 (단위: km)
    const dLat = deg2rad(lat2 - lat1); // 라디안으로 변환
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 간 거리 (km)
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const location = useLocation();

  const goDetail = (detailList) => {
    console.log(detailList);
  };

  const oderModal = (isOpen) => {
    if (openOderModal) {
      setOpenOderModal(!isOpen);
    } else {
      setOpenOderModal(isOpen);
    }
  };

  // useEffect(() => {
  //   fetch("/getCartList", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCartList(data);
  //     })
  //     .catch((error) => {
  //       setError(error.toString());
  //       console.error("Fetch error:", error);
  //     });
  // }, [location.pathname]);

  // useEffect(() => {
  //   fetch("/getPizzaList")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPizzaList(data);
  //     })
  //     .catch((error) => {
  //       setError(error.toString());
  //       console.error("Fetch error:", error);
  //     });
  // }, []);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const logout = () => {
    sessionStorage.removeItem("isLogin");
    sessionStorage.removeItem("logedInUser");
    sessionStorage.removeItem("cartList");
    alert("로그아웃되었습니다.");
    window.location.href = "/MipiFront";
  };

  // const joinProc = async (user) => {
  //   try {
  //     const response = await fetch("/joinProc", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const result = await response.json();
  //     console.log("Success:", result);

  //     if (result.status === "ok") {
  //       alert("가입 완료");
  //       window.location.href = "/LoginForm";
  //     } else {
  //       alert("가입 실패. 다시 시도해주세요.");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("오류가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };

  const joinProc = (user) => {
    if (user) {
      const newUser = {
        ID: testIdPw.length + 1,
        MEMBER_ID: user.custId,
        MEMBER_PASSWORD: user.password,
        MEMBER_ADRESS: user.adress,
        MEMBER_NAME: user.name,
        MEMBER_PHONE: user.phone,
      };

      const updatedUsers = [...testIdPw, newUser];
      setTestIdPw(updatedUsers);

      sessionStorage.setItem("testIdPw", JSON.stringify(updatedUsers));

      alert("가입 완료.");
      window.location.href = "/MipiFront";
    } else {
      alert("가입 정보를 확인해주세요.");
    }
  };

  // 상태 변경 시 sessionStorage 업데이트
  useEffect(() => {
    sessionStorage.setItem("testIdPw", JSON.stringify(testIdPw));
  }, [testIdPw]);

  const loginProc = (loginUser) => {
    if (loginUser && loginUser.ID && loginUser.PASSWORD) {
      const user = testIdPw.find(
        (el) =>
          el.MEMBER_ID === loginUser.ID &&
          el.MEMBER_PASSWORD === loginUser.PASSWORD
      );

      if (user) {
        setIsLogin(true);
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("logedInUser", JSON.stringify(user));

        alert("환영합니다 " + user.MEMBER_NAME + "님!");
        window.location.href = "/MipiFront";
      } else {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    } else {
      alert("아이디 또는 비밀번호를 입력해주세요.");
    }
  };

  // const loginProc = async (loginUser) => {
  //   try {
  //     console.log("로그인프로세스::::::::::");
  //     console.log("로그인 할" + loginUser);

  //     // POST 요청을 보냄
  //     const response = await fetch("/reactLoginProc", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginUser),
  //     });

  //     // 네트워크 응답이 정상인지 확인
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     // 서버 응답을 JSON으로 파싱
  //     const result = await response.json();
  //     console.log("Success:", result);

  //     // 서버에서 반환한 응답을 바탕으로 동작 결정
  //     if (
  //       result.user != null &&
  //       result.user != "" &&
  //       result.user != undefined
  //     ) {
  //       setIsLogin(true);
  //       sessionStorage.setItem("isLogin", isLogin);
  //       sessionStorage.setItem("logedInUser", JSON.stringify(result.user));
  //       console.log("받아온 정보", JSON.stringify(result.user));
  //       window.location.href = "/";
  //     } else {
  //       alert(result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("오류가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };

  // const insertCart = async (cartList) => {
  //   try {
  //     const response = await fetch("/insertCart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cartList),
  //     });

  //     if (!response.ok) {
  //       throw new Error("인서트요청 중 에러");
  //     }

  //     const result = await response.json();
  //     console.log("Response result:", result);
  //     if (result.status === "ok") {
  //       alert(result.message);
  //     } else if (result.status === "done") {
  //     } else {
  //       alert(result.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     alert("오류가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };
  const [cartListLength, setCartListLength] = useState(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cartList")) || [];
    return storedCart.reduce((sum, el) => sum + el.CART_COUNT, 0);
  });

  const insertCart = (addCartList) => {
    console.log("호출");
    console.log(addCartList);

    const length = Object.keys(addCartList).length;
    console.log(length);

    const storedCart = JSON.parse(sessionStorage.getItem("cartList")) || [];
    const menus = [...pizzaList];
    const selectList = menus.find(
      (el) => el.BOARD_TITLE === addCartList.CART_TITLE
    );

    // 기존에 있는 항목인지 검증
    const prevCart = storedCart.find(
      (el) =>
        el.CART_TITLE === addCartList.CART_TITLE &&
        el.CART_SIZE === addCartList.CART_SIZE &&
        el.CART_DOW === addCartList.CART_DOW
    );

    let updatedCartList;

    if (prevCart) {
      console.log("이미 존재하는 항목:", prevCart);
      // 기존 항목의 CART_COUNT 증가
      console.log(selectList[`BOARD_${addCartList.CART_SIZE}_PRICE`]);
      prevCart.CART_COUNT += 1;
      console.log(typeof prevCart.CART_PRICE);
      console.log(typeof selectList[`BOARD_${addCartList.CART_SIZE}_PRICE`]);
      prevCart.CART_PRICE =
        parseInt(prevCart.CART_PRICE) +
        selectList[`BOARD_${addCartList.CART_SIZE}_PRICE`];

      // 기존 storedCart를 유지하면서 변경된 항목을 반영
      updatedCartList = storedCart.map((el) =>
        el.CART_ID === prevCart.CART_ID ? prevCart : el
      );
    } else {
      console.log("새로운 항목 추가");
      // 새로운 항목 추가
      addCartList.CART_IMG = selectList
        ? selectList.BOARD_IMG
        : "default_image_url";
      const lastIndex = storedCart[storedCart.length - 1] || { CART_ID: 0 };

      addCartList.CART_ID = lastIndex.CART_ID + 1;

      addCartList.CART_COUNT = 1;
      updatedCartList = [...storedCart, addCartList];
    }

    // 세션 스토리지에 업데이트된 장바구니 저장
    sessionStorage.setItem("cartList", JSON.stringify(updatedCartList));
    setCartListLength(
      updatedCartList.reduce((sum, el) => sum + el.CART_COUNT, 0)
    );
    alert("상품이 장바구니에 담겼습니다.");
  };

  const deleteCart = (id) => {
    const prevCart = JSON.parse(sessionStorage.getItem("cartList"));
    const newCart = prevCart.filter((el) => el.CART_ID !== id);

    sessionStorage.setItem("cartList", JSON.stringify(newCart));
    window.location.href = "/Cart";
  };

  return (
    <div className="content">
      <Header
        toggleDropdown={toggleDropdown}
        oderModal={oderModal}
        cartListLength={cartListLength}
      />
      {openOderModal && (
        <OderModal setOpenOderModal={setOpenOderModal} loginProc={loginProc} />
      )}
      <DropDown closeDropdown={closeDropdown} isOpen={isOpen} />
      <SideBar logout={logout} cartListLength={cartListLength} />
      <Routes>
        <Route path="/MipiFront" element={<Home />} />
        <Route path="/JoinForm" element={<JoinForm joinProc={joinProc} />} />
        <Route
          path="/LoginForm"
          element={<LoginForm loginProc={loginProc} />}
        />
        <Route
          path="/MenuList"
          element={
            <MenuList
              pizzaList={pizzaList}
              insertCart={insertCart}
              goDetail={goDetail}
            />
          }
        />
        <Route
          path="/Store"
          element={
            <Store
              stores={stores}
              getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
            />
          }
        />
        <Route path="/EventPage" element={<EventPage />} />
        <Route
          path="/MyOrder/:code"
          element={
            <MyOrder
              stores={stores}
              getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
            />
          }
        />
        <Route
          path="/Cart"
          element={
            <Cart
              insertCart={insertCart}
              deleteCart={deleteCart}
              setCartListLength={setCartListLength}
            />
          }
        />
        <Route
          path="/menuList/Detail/:code"
          element={<Detail pizzaList={pizzaList} insertCart={insertCart} />}
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
