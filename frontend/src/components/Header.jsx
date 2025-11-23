// React component for the header of the page

import wordleLogo from "../assets/wordle_logo.png";

const Header = () => {
  return (
    //wole div
    <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 ">
      {/* left side */}
      <div className="max-w-7x1 flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={wordleLogo} className="h-24" alt="Flowbite Logo" />
        {/* right side list */}
        <div className="w-full md:block md:w-auto">
          <ul className="flex md:flex-row md:space-x-4">
            <li>
              <a href="#" className="block py-2 px-3 text-red-600 pr-12">
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
