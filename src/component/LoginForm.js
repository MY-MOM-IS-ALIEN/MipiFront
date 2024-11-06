import React from "react";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

function LoginForm({ loginProc }) {
  const location = useLocation();
  const pathName = location.pathname;
  const hashName = location.hash;
  let userId = useRef(null);
  let password = useRef(null);

  const loginProcHandel = () => {
    if (userId.current.value == "" && password.current.value == "") {
      alert("정보를 입력해주세요");
    } else {
      const loginUser = {
        ID: userId.current.value,
        PASSWORD: password.current.value,
      };
      loginProc(loginUser);
    }
  };
  return (
    <div id="container">
      <aside id="lnb">
        <h1>회원공간</h1>
        <ul>
          <li className="tab01">
            <a
              href="/LoginForm#login"
              title="로그인"
              className={pathName === "/LoginForm" ? "on" : null}
            >
              로그인
            </a>
          </li>
          <li>
            <a href="/JoinForm" title="회원가입">
              회원가입
            </a>
          </li>
          <li>
            <a href="/#" title="아이디/비밀번호 찾기">
              아이디/비밀번호 찾기
            </a>
          </li>
        </ul>
      </aside>

      <section id="login-contents">
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
            <strong>로그인</strong>
          </li>
        </ul>

        <div className="cont_top">
          <h1>회원로그인</h1>
        </div>

        <ul className="tabmenu tabMotion">
          <li className="tab01">
            <a href="#login" className={hashName === "#login" ? "on" : null}>
              회원로그인
            </a>
          </li>
          <li className="tab02">
            <a href="#guest" className={hashName === "#guest" ? "on" : null}>
              비회원주문조회
            </a>
          </li>
        </ul>

        <form id="loginForm" name="loginForm">
          <input type="hidden" id="reurl" name="reurl" value="" />
          <div id="tab01" className="tab_cont">
            <h2 className="tit">LOGIN</h2>

            <div className="login_wrap">
              <div className="login_box">
                <ul id="login_ul">
                  <li>
                    <input
                      type="text"
                      id="input_user_id"
                      name="input_user_id"
                      placeholder="아이디"
                      title="아이디 입력"
                      maxLength="16"
                      ref={userId}
                    />
                  </li>
                  <li>
                    <input
                      type="password"
                      id="input_user_pwd"
                      name="input_user_pwd"
                      placeholder="비밀번호"
                      title="비밀번호 입력"
                      maxLength="16"
                      ref={password}
                    />
                  </li>
                  <li className="btn">
                    <button
                      type="button"
                      className="button red h80"
                      onClick={loginProcHandel}
                    >
                      로그인 <span className="gt">&gt;</span>
                    </button>
                  </li>
                  <li className="chk">
                    <label>
                      <input
                        id="idcheck"
                        name="idcheck"
                        type="checkbox"
                        className="checkbox"
                        title="아이디저장"
                      />
                      <span className="lbl">아이디저장</span>
                    </label>

                    <a
                      href="https://sepay.org/spm/join?regSiteCode=NM&ctgCode=1&subCode=1"
                      className="btn_login_phone"
                    >
                      <img
                        src="//cdn.mrpizza.co.kr/2014_resources/images/member/img_login_btn_phone_m.png"
                        alt="휴대폰간편입력 로그인버튼"
                      />
                    </a>
                  </li>
                  <span className="test">
                    test용 계정 <br />
                    ID : test || PW : test
                  </span>
                </ul>
              </div>
              <p
                className="t_red"
                id="userLoginResult"
                style={{ visibility: "hidden" }}
              >
                *아이디 또는 비밀번호를 다시 확인해 주세요.
              </p>
            </div>
            <p className="mt40">
              <a href="#" className="button grad btn_move w120 f12">
                아이디/비밀번호찾기
              </a>
              <a href="/joinForm" className="button grad btn_move w90 f12">
                회원가입하기
              </a>
              <span id="naver_id_login">
                <a
                  href="https://nid.naver.com/oauth2.0/authorize?response_type=token&client_id=HrPgLEnk0VGTGSOYakKo&redirect_uri=https%3A%2F%2Fwww.mrpizza.co.kr%2Flogin_join%2FNaverResult&state=d0ab71e6-391b-497e-95ad-c66762f62ebb"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      e.currentTarget.href,
                      "naverloginpop",
                      "titlebar=1, resizable=1, scrollbars=yes, width=600, height=550"
                    );
                  }}
                  id="naver_id_login_anchor"
                  className="naver_btn"
                >
                  <img
                    src="http://static.nid.naver.com/oauth/big_g.PNG"
                    border="0"
                    title="네이버 아이디로 로그인"
                    width="152.625px"
                    height="33px"
                  />
                </a>
              </span>
            </p>

            <h3 className="cont_tit tit3">
              회원혜택안내{" "}
              <span className="txt">(마이페이지 내 내쿠폰에서 확인하세요)</span>
            </h3>
            <ul className="login_list">
              <li>
                <p>
                  <img
                    src="//cdn.mrpizza.co.kr/2014_resources/images/member/img_login01.gif"
                    alt="회원가입"
                  />
                </p>
                <h4>회원가입</h4>
                <div>
                  신규회원가입 시 <br />
                  <strong className="t_red">프리미엄 피자 20% 할인쿠폰</strong>
                </div>
              </li>
              <li>
                <p>
                  <img
                    src="//cdn.mrpizza.co.kr/2014_resources/images/member/img_login02.gif"
                    alt="정보수정"
                  />
                </p>
                <h4>정보수정</h4>
                <div>
                  회원 정보 업데이트 시 <br />
                  <strong className="t_red">프리미엄 피자 20% 할인쿠폰</strong>
                </div>
              </li>
              <li>
                <p>
                  <img
                    src="//cdn.mrpizza.co.kr/2014_resources/images/member/img_login03.gif"
                    alt="생일쿠폰"
                  />
                </p>
                <h4>생일쿠폰</h4>
                <div>
                  회원정보 기준 생일 시 <br />
                  <strong className="t_red">프리미엄 피자 20% 할인쿠폰</strong>
                </div>
              </li>
            </ul>
          </div>
          <input type="hidden" id="order_id" name="order_id" value="" />
        </form>
      </section>
    </div>
  );
}

export { LoginForm };
