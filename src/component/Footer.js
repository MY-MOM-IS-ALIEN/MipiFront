function Footer() {
  return (
    <div className="footer-content">
      <div className="footer-link-area">
        <ul>
          <li>개인정보 처리방침</li>
          <li>이용 약관</li>
          <li>가족점 모집</li>
          <li>고객 만족센터</li>
          <li>단체주문/상품권</li>
        </ul>
      </div>
      <div className="footer-info-area">
        <p style={{ marginTop: "10px" }}>
          경기도 안양시 만안구 예술공원로 153-32, 패미리월드G7 일부 3층(석수동)
          대표이사:윤경열 개인정보 관리책임자:한상근
          통신판매업:2023-안양만안-0966
          <br />
          사업자등록번호 666-81-02675
        </p>
        <ul className="sns-list">
          <li>
            <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/img_sns_facebook.png" />
          </li>
          <li>
            <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/img_sns_kakaostory.png" />
          </li>
          <li>
            <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/img_sns_instagram.png" />
          </li>
          <li>
            <img src="https://cdn.mrpizza.co.kr/2014_resources/images/common/img_sns_blog.png" />
          </li>
        </ul>

        <p className="copy">Copyright © Mr.Pizza All rights reserved.</p>
      </div>
      <div className="footer-award-area">
        <ul>
          <li>
            <img
              src="//cdn.mrpizza.co.kr/2014_resources/images/common/img_award_01.jpg"
              alt=""
            />
            <span>
              대한민국 대표
              <br />
              고객만족도 조사
              <br />
              7회 수상
              <br />
              (2007·2009-2014)
            </span>
          </li>
          <li>
            <img
              src="//cdn.mrpizza.co.kr/2014_resources/images/common/img_award_02.jpg"
              alt=""
            />
            <span>
              좋은기업 대상 <br />
              9회 연속수상
            </span>
          </li>
          <li>
            <img
              src="//cdn.mrpizza.co.kr/2014_resources/images/common/img_award_03.jpg"
              alt=""
            />
            <span>
              브랜드스타
              <br />
              12회 연속수상
            </span>
          </li>
          <li>
            <img
              src="//cdn.mrpizza.co.kr/2014_resources/images/common/img_award_04_210119.jpg"
              alt=""
            />
            <span>
              2021년
              <br />
              세계일류상품
              <br />
              차세대부분수상
            </span>
          </li>
          <li>
            <img
              src="//cdn.mrpizza.co.kr/2014_resources/images/common/img_award_05.jpg"
              alt=""
            />
            <span>
              세계 피자대회
              <br />
              2019년 2관왕
            </span>
          </li>
        </ul>
        <p className="num">
          전화주문 <strong>1577-0077</strong>
        </p>
      </div>
    </div>
  );
}

export default Footer;
