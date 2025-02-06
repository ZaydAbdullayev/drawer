import logoAnimation from "../../assets/picmix.com_2335858.gif";
import logo from "../../assets/drawerweb.png";
import "./navbar.css"
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate();
  return (
    <div className="w100 df aic jcsb navbar" onClick={() => navigate("/")}>
      <div className="df aic logo ">
        <img src={logoAnimation} alt="logo" className="logo" />
        <img src={logo} alt="logo" className="logo" />
      </div>

      <div className="df aic gap-15 links">
        <a href="https://phantom.com/" target="blank">
          Connect
        </a>
        <a href="https://x.com/drawerdotcc" target="blank">X</a>
        <a href="https://t.me/Drawerdotcc" target="blank">Telegram</a>
        <a href="/">$DRAWER</a>
      </div>
    </div>
  );
};
