import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function MainMidSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="midSlider">
      <div>
        <Slider {...settings}>
          <div className="midSlider-left">
            <img
              src="https://cdn.mrpizza.co.kr/2023_resources/images/main/20230612_SUB_BANNER.jpg"
              alt="Banner 1"
            />
          </div>
          <div className="midSlider-left">
            <img
              src="https://cdn.mrpizza.co.kr/2014_resources/images/main/img_evt_banner_210222.jpg"
              alt="Banner 2"
            />
          </div>
        </Slider>
      </div>
      <div>
        <Slider {...settings}>
          <div className="midSlider-right">
            <img
              src="https://cdn.mrpizza.co.kr/2024_resources/images/newstore/banner_pc_20240304.jpg"
              alt="Banner 3"
            />
          </div>
          <div className="midSlider-right">
            <img
              src="https://cdn.mrpizza.co.kr/2024_resources/images/newstore/pc_banner_20240507.jpg?timestamp=1722476725762"
              alt="Banner 4"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default MainMidSlider;
