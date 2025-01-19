import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import useThemeContext from '../../../Hooks/useThemeContext';

const SwitchTOgole = () => {

  const { theme,setTheme } = useThemeContext();
  const [enabled, setEnabled] = useState(theme);
  useEffect(() => {
    setTheme(enabled)
  },[enabled, setTheme])
  return (
    <div className="">
      <label
        htmlFor="toggle3"
        className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            id="toggle3"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="block h-6 border dark:border-gray-800 w-10 rounded-full bg-secondaryS/30 shadow-sm "></div>
          <div
            className={`dot absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
              enabled &&
              '!right-1 !translate-x-full !bg-gray-800'
            }`}>
            <span className={`hidden ${enabled && '!block'}`}>
              <BiMoon />
            </span>
            <span className={`${enabled && 'hidden'}`}>
              <BiSun />
            </span>
          </div>
        </div>
      </label>
    </div>
  );
};

export default SwitchTOgole;
