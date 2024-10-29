import { Link } from "react-router-dom";

function DropDown({ isOpen, closeDropdown }) {
  return (
    <div className="dropdown">
      {isOpen && (
        <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
          <ul>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                피자
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                1인용 피자
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                특가세트
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                샐러드&사이드
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                매장 찾기
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                뷔페 매장
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                매장 전용 메뉴
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                신제품 소개
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                진행중 이벤트
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                종료된 이벤트
              </Link>
            </li>
            <li>
              <Link to="/Menu/#" onClick={closeDropdown}>
                할인 안내
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;
