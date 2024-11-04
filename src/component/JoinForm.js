import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function JoinForm({ joinProc }) {
  const [user, setUser] = useState([]);
  const [allCheckedTerms, setAllCheckedTerms] = useState(false); // 약관동의 전체 체크
  const [allCheckedMarketing, setAllCheckedMarketing] = useState(false); // 마케팅 동의 전체 체크
  const [serviceCheck, setServiceCheck] = useState(false);
  const [privacyCheck, setPrivacyCheck] = useState(false);
  const [privacyCheck2, setPrivacyCheck2] = useState(false);
  const [eventEmailCheck, setEventEmailCheck] = useState(false);
  const [eventSmsCheck, setEventSmsCheck] = useState(false);
  const [eventDmCheck, setEventDmCheck] = useState(false);
  const [disagree, setDisagree] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const [isDifferent, setIsDifferent] = useState("");
  let name = useRef(null);
  let userId = useRef(null);
  let password = useRef(null);
  let passwordRe = useRef(null);
  let mobile1 = useRef(null);
  let mobile2 = useRef(null);
  let mobile3 = useRef(null);
  let email1 = useRef(null);
  let email2 = useRef(null);
  let adress1 = useRef(null);
  let adress2 = useRef(null);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const emailInputRef = useRef(null);
  const emailSelectRef = useRef(null);
  const [address, setAddress] = useState("");
  const location = useLocation();
  const pathName = location.pathname;

  const idDuplicate = () => {
    const users = JSON.parse(sessionStorage.getItem("testIdPw"));
    const resultId = users.find((el) => el.MEMBER_ID === userId.current.value);
    const Idinput = document.getElementById("cust_id");
    if (userId.current.value != null && userId.current.value != undefined) {
      if (resultId) {
        Idinput.value = "";
        alert("이미 존재하는 ID입니다.");
      } else {
        alert("사용 가능한 ID입니다.");
      }
    }
  };

  const loadPostcode = () => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const { daum } = window;
      new daum.Postcode({
        oncomplete: (data) => {
          let fullAddress = data.address;
          let extraAddress = "";

          if (data.addressType === "R") {
            if (data.bname !== "") {
              extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
              extraAddress +=
                extraAddress !== ""
                  ? `, ${data.buildingName}`
                  : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
          }

          setAddress(fullAddress); // 주소 상태 업데이트
          document.getElementById("cust_haddr").value = fullAddress;
        },
      }).open();
    };
  };

  const JoinProcHandel = () => {
    const checkedBoxes = document.querySelectorAll(
      '.agree1 input[type="checkbox"]:checked:not(#all_chk)'
    ).length;
    console.log(checkedBoxes);

    const checkedBoxes2 = document.querySelectorAll(
      '.agree2 input[type="checkbox"]:checked'
    ).length;
    if (checkedBoxes < 3) {
      alert("약관동의는 필수입니다.");
    } else if (checkedBoxes2 < 1) {
      alert("마케팅 정보 동의를 선택해주세요");
    } else {
      if (
        (name.current.value &&
          userId.current.value &&
          password.current.value &&
          mobile1.current.value &&
          mobile2.current.value &&
          mobile3.current.value &&
          adress1.current.value &&
          adress2.current.value) != ""
      ) {
        const joinUser = {
          name: name.current.value,
          custId: userId.current.value,
          password: password.current.value,
          phone:
            mobile1.current.value +
            "-" +
            mobile2.current.value +
            "-" +
            mobile3.current.value,
          adress: adress1.current.value + " " + adress2.current.value,
        };
        setUser(joinUser);
        joinProc(joinUser);
      } else {
        alert("정보를 입력해주세요");
      }
    }
  };

  const handleEmailInput = () => {
    const selectedDomain = emailSelectRef.current.value;
    const emailDomain = document.getElementById("email_domain");

    // 선택된 값이 비어 있지 않으면 readonly 속성을 추가
    if (selectedDomain) {
      emailDomain.value = "";
      setIsReadOnly(true);
      email2 = selectedDomain;
      console.log(email2);
    } else {
      setIsReadOnly(false);
      email2 = emailInputRef.current.value;
      console.log(email2);
    }
  };

  const passReCheck = () => {
    const custPass = password.current.value;
    const custPassRe = passwordRe.current.value;

    if (custPass == custPassRe || custPass == "" || custPassRe == "") {
      setIsDifferent("");
    } else {
      setIsDifferent("invalid");
    }
  };

  const passCheck = () => {
    const custPass = password.current.value;
    const regex = /^[a-zA-Z0-9]{6,}$/;
    if (custPass === null || custPass === "") {
      setIsPassword("");
    } else if (regex.test(custPass)) {
      setIsPassword("valid");
    } else {
      setIsPassword("invalid");
    }
  };

  const idCheck = () => {
    const custId = userId.current.value;
    const regex = /^[a-zA-Z0-9]{6,}$/;
    const idDuplicateBtn = document.querySelector(".Dbtn");
    if (custId === null || custId === "") {
      setIsEmail("");
      idDuplicateBtn.disabled = true;
    } else if (regex.test(custId)) {
      setIsEmail("valid");
      idDuplicateBtn.disabled = false;
    } else {
      setIsEmail("invalid");
      idDuplicateBtn.disabled = true;
    }
  };

  const checkAllTerms = (e) => {
    const isChecked = e.target.checked;
    setServiceCheck(isChecked);
    setPrivacyCheck(isChecked);
    setPrivacyCheck2(isChecked);
    setAllCheckedTerms(isChecked);
  };

  const checkAllMarketing = (e) => {
    const isChecked = e.target.checked;
    setEventEmailCheck(isChecked);
    setEventSmsCheck(isChecked);
    setEventDmCheck(isChecked);
    setDisagree(!isChecked); // 전체 동의 시 '동의하지 않음' 해제
    setAllCheckedMarketing(isChecked);
  };

  const handleServiceCheck = (e) => setServiceCheck(e.target.checked);
  const handlePrivacyCheck = (e) => setPrivacyCheck(e.target.checked);
  const handlePrivacyCheck2 = (e) => setPrivacyCheck2(e.target.checked);
  const handleEventEmailCheck = (e) => setEventEmailCheck(e.target.checked);
  const handleEventSmsCheck = (e) => setEventSmsCheck(e.target.checked);
  const handleEventDmCheck = (e) => setEventDmCheck(e.target.checked);
  const handleDisagree = (e) => setDisagree(e.target.checked);

  return (
    <div id="container">
      <aside id="lnb">
        <h1>회원공간</h1>
        <ul>
          <li>
            <a href="/loginForm" title="로그인">
              로그인
            </a>
          </li>
          <li>
            <a
              href="/joinForm"
              className={pathName === "/JoinForm" ? "on" : null}
            >
              회원가입
            </a>
          </li>
          <li>
            <a href="#" title="아이디/비밀번호 찾기">
              아이디/비밀번호 찾기
            </a>
          </li>
        </ul>
        <span className="test">
          test용 계정 <br />
          ID : test || PW : test
        </span>
      </aside>

      <section id="join-contents">
        <ul id="location">
          <li>
            <a className="home" href="/">
              HOME
            </a>
          </li>
          <li>
            <span>회원공간</span>
          </li>
          <li>
            <strong>회원가입</strong>
          </li>
        </ul>

        <div className="cont_top">
          <h1>회원가입</h1>
        </div>

        <h2 className="line_tit">1. 약관동의</h2>
        <div className="join_form agree1">
          <p className="agree_all">
            <label>
              <input
                id="all_chk"
                name="all_chk"
                type="checkbox"
                className="checkbox"
                checked={allCheckedTerms}
                onChange={checkAllTerms}
              />
              <strong className="lbl f14">모든 약관에 동의합니다.</strong>
            </label>
          </p>
          <article className="txt_terms">
            <p className="mt110">
              <label>
                <input
                  id="agree_chk"
                  name="agree_chk"
                  className="checkbox agree_chk"
                  type="checkbox"
                  checked={serviceCheck}
                  onChange={handleServiceCheck}
                />
                <span className="lbl">서비스 이용약관 동의 (필수)</span>
              </label>
              <a
                href="#popRules"
                tabIndex="1"
                className="button popRules h25 f_right"
              >
                약관 전체보기
              </a>
            </p>
            <p className="mt110">
              <label>
                <input
                  id="agree_chk2"
                  name="agree_chk2"
                  className="checkbox agree_chk"
                  type="checkbox"
                  checked={privacyCheck}
                  onChange={handlePrivacyCheck}
                />
                <span className="lbl">
                  개인정보처리방침_개인정보 수집 및 이용안내 동의 (필수)
                </span>
              </label>
              <a
                href="#popRules"
                tabIndex="2"
                className="button popRules h25 f_right"
              >
                약관 전체보기
              </a>
            </p>
            <p className="mt110">
              <label>
                <input
                  id="agree_chk3"
                  name="agree_chk3"
                  className="checkbox agree_chk"
                  type="checkbox"
                  checked={privacyCheck2}
                  onChange={handlePrivacyCheck2}
                />
                <span className="lbl">
                  개인정보처리방침_개인정보의 취급위탁 동의(필수)
                </span>
              </label>
              <a
                href="#popRules"
                tabIndex="3"
                className="button popRules h25 f_right"
              >
                약관 전체보기
              </a>
            </p>
          </article>
        </div>

        <h2 className="line_tit mt50">3. 정보입력 (필수입력사항)</h2>

        <div className="join_form">
          <p>
            <input
              type="text"
              id="name"
              name="name"
              className="inp1 inp_use"
              title="회원이름"
              placeholder="이름"
              ref={name}
              required
            />
          </p>
          <div className="mt110 tip_box">
            <input
              type="text"
              className="inp1 inp_use"
              id="cust_id"
              name="cust_id"
              maxLength="12"
              ref={userId}
              onChange={idCheck}
              title="아이디 입력"
              placeholder="아이디 입력, 6-12자리로 아이디 생성"
            />
            <button
              type="button"
              className="button Dbtn"
              onClick={idDuplicate}
              style={{ width: "150px", height: "35px", marginLeft: "5px" }}
            >
              중복확인
            </button>
            {isEmail === "invalid" && (
              <p style={{ color: "red" }}>
                아이디는 영어와 숫자로 이루어진 6-12자리 이상이어야 합니다.
              </p>
            )}
          </div>
          <p className="mt110 f12">
            <span id="resultID" style={{ visibility: "hidden" }}>
              *사용 가능한 아이디입니다.
            </span>
          </p>

          <div className="mt20 tip_box">
            <input
              type="password"
              className="inp1 inp_use"
              id="cust_pwd"
              name="cust_pwd"
              maxLength="12"
              ref={password}
              onChange={passCheck}
              title="비밀번호 입력"
              placeholder="비밀번호 입력, 6-12자리 영문,숫자 조합"
            />
          </div>
          <div className="mt110">
            <input
              type="password"
              className="inp1 inp_use"
              id="cust_pwd_chk"
              name="cust_pwd_chk"
              maxLength="16"
              ref={passwordRe}
              onChange={passReCheck}
              title="비밀번호 재입력"
              placeholder="비밀번호 재입력"
            />
            {isPassword === "invalid" && (
              <div style={{ color: "red" }}>
                <span>
                  패스워드는 영어와 숫자로 이루어진 6-12자리 이상이어야 합니다.
                </span>
              </div>
            )}
            {isDifferent === "invalid" && (
              <div style={{ color: "red" }}>패스워드가 동일하지 않습니다.</div>
            )}
          </div>
          <div className="mt110 f12">
            <span id="resultPwd" style={{ visibility: "hidden" }}>
              6-12자의 영문,숫자로 만들어주세요.
            </span>
          </div>

          <p className="mt20">
            <select
              className="sel1 inp_use"
              id="mobile1"
              name="mobile1"
              title="연락처 앞자리 선택"
              ref={mobile1}
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </select>

            <input
              type="text"
              className="inp2 ml6 inp_use"
              id="mobile2"
              name="mobile2"
              maxLength="4"
              title="연락처 앞자리 입력"
              ref={mobile2}
            />

            <input
              type="text"
              className="inp2 ml6 inp_use"
              id="mobile3"
              name="mobile3"
              maxLength="4"
              title="연락처 뒷자리 입력"
              ref={mobile3}
            />
          </p>

          <p>
            <input
              type="text"
              className="inp2 inp_use"
              id="email_id"
              name="email_id"
              maxLength="25"
              title="이메일주소 앞자리 입력"
              placeholder="이메일"
              ref={email1}
            />
            <span className="ml6">@</span>
            <input
              type="text"
              className="inp2 ml6 inp_use"
              id="email_domain"
              name="email_domain"
              title="이메일주소 뒷자리 입력"
              onChange={handleEmailInput}
              ref={emailInputRef}
              readOnly={isReadOnly} // readonly 속성 적용
            />
            <select
              className="ml6 sel2 inp_use"
              id="email_sample"
              name="email_sample"
              title="이메일주소 뒷자리 선택"
              onChange={handleEmailInput}
              ref={emailSelectRef}
            >
              <option value="">직접입력</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
            </select>
          </p>

          <div className="mt30">
            <p>
              <input
                type="text"
                className="inp4 inp_use"
                id="cust_haddr"
                name="cust_haddr"
                title="회원 기본주소"
                placeholder="시/군/구"
                ref={adress1}
              />
              <a
                href="#zipcode"
                className="button ml6 pop_open zip_open"
                style={{ width: "150px", height: "35px" }}
                onClick={loadPostcode}
              >
                주소찾기<span className="gt">&gt;</span>
              </a>
            </p>
            <p className="mt110">
              <input
                type="text"
                className="inp4 inp_use"
                id="cust_daddr"
                name="cust_daddr"
                title="회원 상세주소"
                placeholder="상세주소"
                ref={adress2}
              />
            </p>
            <p className="mt5 bullet_red">
              입력하신 주소는 기본 배송지로 설정됩니다.
            </p>
          </div>

          <p className="mt25 f16">
            <strong>마케팅 활용 동의 (선택)</strong>
          </p>
          <p className="mt5">
            마케팅/홍보를 위해 아래 항목의 정보를 이용하는데 동의하십니까? 동의
            거부시 할인 및 이벤트 정보안내 서비스가 제한됩니다. <br />
            <strong className="t_red">
              이메일, SMS, 주소(전단) 모두 수신 동의 시 프리미엄 피자 20% 할인
              쿠폰을 드립니다.
            </strong>
          </p>
          <div className="agree2">
            <table className="tbl_style line mt20">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <tbody>
                <tr>
                  <th rowSpan="2">
                    동의함 <br />
                    <br />
                    <label>
                      <input
                        id="all_chk_marketing"
                        name="all_chk_marketing"
                        type="checkbox"
                        className="checkbox"
                        checked={allCheckedMarketing}
                        onChange={checkAllMarketing}
                      />
                      <span className="lbl">전체 동의</span>
                    </label>
                  </th>
                  <td>이메일</td>
                  <td>SMS</td>
                  <td>주소(전단)</td>
                  <th>동의하지 않음</th>
                </tr>
                <tr>
                  <td className="bor_left">
                    <label>
                      <input
                        id="event_email_check"
                        name="event_email_check"
                        type="checkbox"
                        title="이메일 및 주소 수신 동의"
                        className="checkbox mkt_chk evt_chk"
                        checked={eventEmailCheck}
                        onChange={handleEventEmailCheck}
                      />
                      <span className="lbl hide">
                        <i>이메일 및 주소 수신 동의</i>
                      </span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        id="event_sms_check"
                        name="event_sms_check"
                        type="checkbox"
                        title="SMS 수신 동의"
                        className="checkbox mkt_chk evt_chk"
                        checked={eventSmsCheck}
                        onChange={handleEventSmsCheck}
                      />
                      <span className="lbl hide">
                        <i>SMS 수신 동의</i>
                      </span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        id="event_dm_check"
                        name="event_dm_check"
                        type="checkbox"
                        title="주소(전단)"
                        className="checkbox mkt_chk evt_chk"
                        checked={eventDmCheck}
                        onChange={handleEventDmCheck}
                      />
                      <span className="lbl hide">
                        <i>주소</i>
                      </span>
                    </label>
                  </td>
                  <td>
                    <label>
                      <input
                        id="disagree"
                        name="disagree"
                        type="checkbox"
                        className="checkbox"
                        checked={disagree}
                        onChange={handleDisagree}
                      />
                      <span className="lbl hide">
                        <i>동의하지 않음</i>
                      </span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt40 t_center">
          <button
            onClick={JoinProcHandel}
            className="button red h45 w170 joinbtn"
            id="submitJoinCheck"
          >
            회원가입<span className="gt">&gt;</span>
          </button>
          <a href="/index" className="button h45 w170">
            취소<span className="gt">&gt;</span>
          </a>
        </p>
      </section>
    </div>
  );
}

export default JoinForm;
