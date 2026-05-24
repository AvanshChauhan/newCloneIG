import "../features/auth/styles/Nav.scss"
import { useNavigate } from "react-router-dom";
const Nav = () => {
    const navigate=useNavigate()
  return (
    <nav className="nav-bar">
      <span className="nav-logo">
        <img src="/assets/background/namaste-removebg-preview.png" alt="" />
      </span>
      <div className="nav-actions">
        <button 
        onClick={()=>{navigate('/create-post')}}
        className="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
