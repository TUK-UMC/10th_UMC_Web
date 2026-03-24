import { THEME, useTheme } from "../contexts/ThemeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === THEME.LIGHT;

  return (
    <>
      <button onClick={toggleTheme} className="theme__button">
        {isLight ? "라이트모드" : "다크모드"}
      </button>
    </>
  );
};

export default ThemeButton;
