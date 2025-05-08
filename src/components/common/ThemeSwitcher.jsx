import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../utils/ThemeContext';

function ThemeSwitcher() {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-[#34335A] hover:bg-gray-300 dark:hover:bg-[#4d447a] text-gray-800 dark:text-white transition-colors duration-200"
            aria-label="Toggle theme"
        >
            {isDarkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
    );
}

export default ThemeSwitcher; 