import wordleLogo from "../assets/wordle_logo.png";

const Header = () => {
  return (
    <nav class="bg-neutral-primary fixed w-full z-20 top-0 start-0 ">
      <div class="max-w-7x1 flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={wordleLogo} class="h-24" alt="Flowbite Logo" />
        <div class="w-full md:block md:w-auto">
          <ul class="flex md:flex-row md:space-x-4">
            <li>
              <a href="#" class="block py-2 px-3 text-red-600 pr-12">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr class="w-11/12 mx-auto border-default" />
    </nav>
  );
};

export default Header;
