import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContext";

const useThemeContext = () => {
  return useContext(ThemeContext)
}

export default useThemeContext;