import { useLocation } from "react-router-dom";
function EventPage() {
  const location = useLocation();
  const hashName = location.hash;

  return (
    <div id="container">
      <aside id="lnb">
        <h1>이벤트</h1>
        <ul>
          <li>
            <a
              href="#NewArrival"
              className={hashName === "#NewArrival" ? "on" : null}
            >
              신제품소개
            </a>
          </li>
          <li>
            <a
              href="#OnGoingEvent"
              className={hashName === "#OnGoingEvent" ? "on" : null}
            >
              진행중 이벤트
            </a>
          </li>
          <li>
            <a
              href="#EndedEvent"
              className={hashName === "#EndedEvent" ? "on" : null}
            >
              종료된 이벤트
            </a>
          </li>
          <li>
            <a href="#Sale" className={hashName === "#Sale" ? "on" : null}>
              할인 안내
            </a>
          </li>
        </ul>
      </aside>
      <section id="join-contents">
        <ul id="location">
          <li>
            <a className="home" href="/">
              HOME
            </a>
          </li>
          <li>
            <span>이벤트</span>
          </li>
          <li>
            <strong>진행중 이벤트</strong>
          </li>
        </ul>

        <div className="cont_top">
          <h1>진행중 이벤트</h1>
        </div>
        <ul className="event_list new_event_list" id="ImgList">
          <li>
            <a href="#" className="img">
              <img
                src="//cdn.mrpizza.co.kr/2011/uploadV1/now/2023612175728447.jpg"
                alt="월래 수지맞은 금요일 1+1 프로모션                              "
              />
            </a>
            <div>
              <p className="date">월래 수지맞은 금요일 1+1 프로모션 </p>
              <p className="date">진행기간 : 2023.06.19 ~ 2024.10.31</p>
              <p className="ic">
                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/event/ic_packageOn.gif"
                  alt="방문포장"
                />
              </p>
            </div>
          </li>

          <li>
            <a href="#" className="img">
              <img
                src="//cdn.mrpizza.co.kr/2011/uploadV1/now/20231124161214523.jpg"
                alt="이제 미스터피자에서 롯데카드 15% 할인!                           "
              />
            </a>
            <div>
              <p className="date">이제 미스터피자에서 롯데카드 15% 할인! </p>
              <p className="date">진행기간 : 2017.11.08 ~ 2024.12.31</p>
              <p className="ic">
                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/event/ic_onlineOn_new.gif"
                  alt="온라인"
                />

                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/event/ic_packageOn.gif"
                  alt="방문포장"
                />

                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/event/ic_storeOn.gif"
                  alt="매장식사"
                />

                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/event/ic_callOn.gif"
                  alt="전화주문"
                />
              </p>
            </div>
          </li>

          <li>
            <a href="#" className="img">
              <img
                src="//cdn.mrpizza.co.kr/2011/uploadV1/now/2021223101244634.jpg"
                alt="[한몫잡은 화요일] 방문포장 시 프리미엄 3종 라지 40% 할인               "
              />
            </a>
            <div>
              <p className="date">
                [한몫잡은 화요일] 방문포장 시 프리미엄 3종 라지 40% 할인{" "}
              </p>
              <p className="date">진행기간 : 2021.02.23 ~ 2024.10.31</p>
              <p className="ic">
                <img
                  src="//cdn.mrpizza.co.kr/2014_resources/images/event/ic_packageOn.gif"
                  alt="방문포장"
                />
              </p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default EventPage;
