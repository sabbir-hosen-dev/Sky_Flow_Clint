import { BiMoon, BiSun } from 'react-icons/bi';
import useThemeContext from '../../../Hooks/useThemeContext';

function ThemeTogole() {
  const { theme, setTheme } = useThemeContext();

  return (
    <div
      className="cursor-pointer relative w-8 h-5 flex justify-center items-center  mt-3 text-text text hover:text/80 transition-colors duration-300"
      onClick={() => {
        setTheme(prev => !prev);
      }}>
      {theme ? (
        <BiMoon className="text-xl absolute -top-[5px] hover:text-primaryP duration-300 transition-colors" />
      ) : (
        <BiSun className=" hover:text-primaryP duration-300 transition-colorstext-xl absolute -top-[5px]" />
      )}
    </div>
  );
}

export default ThemeTogole;
