import "./bg.css";
import boya from "../../assets/mor boya.png";
import boya1 from "../../assets/boya1.png";
import boya2 from "../../assets/boya2.png";
import boya3 from "../../assets/boya3.png";
import boya5 from "../../assets/boya5.png";

export const Bg = () => {
  return (
    <div className="bg">
      <img src={boya} alt="boya" className="boya" />
      <img src={boya1} alt="boya1" className="boya1" />
      <img src={boya2} alt="boya2" className="boya2" />
      <img src={boya3} alt="boya3" className="boya3" />
      <img src={boya} alt="boya4" className="boya4" />
      <img src={boya5} alt="boya5" className="boya5" />
      <i></i>
    </div>
  );
};
