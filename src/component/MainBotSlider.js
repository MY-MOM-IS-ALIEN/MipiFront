import Slider from "react-slick";

function MainBotSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="botSlider">
      <h3 className="botSlider-header">
        <img
          src="https://cdn.mrpizza.co.kr/2014_resources/images/main/bg_main_tit.png"
          alt="특별한 할인혜택 배경 이미지"
          className="botSlider-img"
        />
        <span className="botSlider-text">특별한 할인혜택</span>
      </h3>
      <div className="botSlider-area">
        <Slider {...settings}>
          <div className="botSlider-slide">
            <div className="botSlider-slide-mt">
              <a href="#">
                <span>신규회원 가입시</span>
                <br />
                <strong>20%</strong>
              </a>
            </div>
          </div>
          <div className="botSlider-slide">
            <div className="botSlider-slide-mt">
              <a href="#">
                <span>회원정보 수정시</span>
                <br />
                <strong>20%</strong>
              </a>
            </div>
          </div>
          <div className="botSlider-slide">
            <div className="botSlider-slide-mt">
              <a href="#">
                <span>생일기념</span>
                <br />
                <strong>20%</strong>
              </a>
            </div>
          </div>
          <div className="botSlider-slide">
            <div className="botSlider-slide-mt">
              <a href="#">
                <span>방문포장 최대</span>
                <br />
                <strong>30%</strong>
              </a>
            </div>
          </div>
          <div className="botSlider-slide">
            <div className="botSlider-slide-mt">
              <a href="#">
                <strong className="group_order">
                  단체주문
                  <br />
                  안내
                </strong>
              </a>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default MainBotSlider;
