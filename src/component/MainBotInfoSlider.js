import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

function MainBotInfoSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  return (
    <div className="botInfoSlider">
      <div>
        <h3 className="notice-h3">
          <img
            src="https://cdn.mrpizza.co.kr/2014_resources/images/main/bg_main_tit.png"
            alt="특별한 할인혜택 배경 이미지"
            className="botSlider-img"
          />
          <span className="botInfoSlider-text">NOTICE & NEWS</span>
        </h3>
        <div className="botInfoSlider-left">
          <Slider {...settings}>
            <div className="botInfo-item">
              <strong>[공지] 월래 수지맞은 금요일 1+1 행사장 안내</strong>
              <span>2024.07.05</span>
              <div className="notice-area">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/main/ico_notice.png" />
              </div>
            </div>
            <div className="botInfo-item">
              <strong>[공지] 한몫잡은 화요일 행사 방문포장 40% 진행매장</strong>
              <span>2024.08.01</span>
              <div className="notice-area">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/main/ico_notice.png" />
              </div>
            </div>
            <div className="botInfo-item">
              <strong>[공지] 24년 8월 피자뷔페 운영매장 안내</strong>
              <span>2024.07.31</span>
              <div className="notice-area">
                <img src="https://cdn.mrpizza.co.kr/2014_resources/images/main/ico_notice.png" />
              </div>
            </div>
          </Slider>
        </div>
      </div>
      <div>
        <h3 className="notice-h3">
          <img
            src="https://cdn.mrpizza.co.kr/2014_resources/images/main/bg_main_tit.png"
            alt="특별한 할인혜택 배경 이미지"
            className="botSlider-img"
          />
          <span className="botInfoSlider-text">창업문의</span>
        </h3>
        <div className="botInfoSlider-right">
          <div className="botInfoSlider-right-font">
            <img
              src="https://cdn.mrpizza.co.kr/2014_resources/images/main/bg_franchise.png"
              alt="franchise"
            />
            <p>미스터피자 가족점 점주님을 모집합니다.</p>
            <strong>1670-8253</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBotInfoSlider;
