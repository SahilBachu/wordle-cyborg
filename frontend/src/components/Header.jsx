// React component for the header of the page

import wordleLogo from "../assets/wordle_logo.png";
import wordleLogoRed from "../assets/wordle_logo_red.png";

const Header = ({ cyberModeBool }) => {
  //Controlling the tailwind classes based on the cyborgToggle
  let bgColor = "bg-white";
  let imgSrc = wordleLogo;
  let textColorNav = "text-red-600";
  if (cyberModeBool) {
    bgColor = "bg-[#B91C1C]";
    imgSrc = wordleLogoRed;
    textColorNav = "text-white";
  }
  return (
    //wole div
    <nav className={`${bgColor} fixed w-full z-20`}>
      {/* left side */}
      <div className="w-max md:w-auto flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={imgSrc} className="h-24" alt="Flowbite Logo" />
        {/* right side list */}
        <div className="w-full md:block md:w-auto hidden">
          <ul className="flex md:flex-row md:space-x-4">
            <li>
              <a href="#" className={`block py-2 px-3 ${textColorNav} pr-12`}>
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* horizontal line to seperate */}
      <hr className="w-11/12 mx-auto border-default" />
    </nav>
  );
};

export default Header;
