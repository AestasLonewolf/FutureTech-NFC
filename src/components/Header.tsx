import Logo from "../assets/logo.png";
import Hamburger from "../assets/hamburger.svg";

export default function Header() {
  return (
    <div className="bg-primary w-full h-14 flex relative">
      <img src={Hamburger} width={34} className="mx-3 fill-white" />
      <img
        src={Logo}
        width={150}
        className="absolute translate-y-[-32%] rotate-[5deg] left-1/2  -translate-x-1/2"
      ></img>
    </div>
  );
}
