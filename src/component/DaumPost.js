import React from "react";
import DaumPostcode from "react-daum-postcode";

function DaumPost({ toggleDaumPost }) {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
  };

  return (
    <>
      <div className="du-modal-backdrop" onClick={toggleDaumPost}></div>
      <div id="zipcode" className="du-pop_layer du-zipcode">
        <h1>주소찾기</h1>

        <div className="du-pop_cont">
          <div className="du-pop_post">
            <DaumPostcode className="du-postmodal" onComplete={complete} />
          </div>

          <div className="du-ziplist du-list" style={{ display: "none" }}>
            <p className="du-mt25 du-mb10">해당하는 주소를 선택해 주세요.</p>
            <select id="du-zipcheckList"></select>
          </div>
          <div className="du-store du-mt25 du-mb10">
            <strong className="du-t_black">배달가능매장</strong>{" "}
            <span id="du-storename" className="du-t_red du-f14"></span>
          </div>
          <div className="du-inp">
            <input
              type="text"
              id="du-orderAddress1"
              className="du-input du-w_100 du-readOnly du-full_address"
              readOnly
              title="기본주소"
              placeholder="기본주소"
            />
            <input
              type="text"
              id="du-orderAddress2"
              className="du-input du-w_100 du-mt5 du-addressDetail"
              title="상세주소"
              placeholder="상세주소"
            />
          </div>
          <p className="du-mt25 du-t_center">
            <a href="#" className="du-button du-w115 du-red du-addressSubmit">
              확인<span className="du-gt">&gt;</span>
            </a>
            <a href="#" className="du-button du-w115 du-searchAddrReset">
              재입력<span className="du-gt">&gt;</span>
            </a>
          </p>

          <p className="du-cont_tit du-tit3 du-mt25 du-mb10">유의사항</p>
          <ul className="du-txt_list">
            <li>번지/건물명이 없는 경우 배달이 불가능합니다.</li>
            <li>
              아파트/빌라 동호수, 사무실 층수, 기타 위치 정보는 상세주소에
              입력해 주세요.
            </li>
          </ul>
        </div>
        <button
          type="button"
          className="du-btn_close du-pop_close"
          onClick={toggleDaumPost}
        >
          팝업닫기
        </button>
      </div>
    </>
  );
}

export default DaumPost;
