import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      <div className="slider">
        <img
          src="https://cdn.mrpizza.co.kr/2024_resources/images/main/240809_PC.jpg"
          alt="Slide 4"
        />
      </div>
      <div className="slider">
        <img
          src="https://cdn.mrpizza.co.kr/2014_resources/images/main/banner/mainImg_210524.jpg"
          alt="Slide 1"
        />
      </div>
      <div className="slider">
        <img
          src="https://cdn.mrpizza.co.kr/2024_resources/images/main/menu_slide_2_pc_240328.jpg"
          alt="Slide 2"
        />
      </div>
      <div className="slider">
        <img
          src="https://cdn.mrpizza.co.kr/2023_resources/images/main/20230612_BANNER_PC.jpg"
          alt="Slide 3"
        />
      </div>
    </Slider>
  );
}

export default MainSlider;
