import { FunctionComponent, useContext } from "react";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";

interface ColorThemeToggleProps {}

const ColorThemeToggle: FunctionComponent<ColorThemeToggleProps> = () => {
  const themeContext = useContext(ThemeContext) as ThemeContextType;

  return <></>;
};

export default ColorThemeToggle;
