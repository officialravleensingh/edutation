import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Resources from "./pages/Resources";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoading, setIsThemeLoading] = useState(true);
  const [isAppLoading, setIsAppLoading] = useState(true);
  
  const appLoadingTimeoutRef = useRef(null);
  const themeTimeoutRef = useRef(null);

  const toggleTheme = () => {
    setIsThemeLoading(true);
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
    
    if (themeTimeoutRef.current) {
      clearTimeout(themeTimeoutRef.current);
    }
    themeTimeoutRef.current = setTimeout(() => {
      setIsThemeLoading(false);
      themeTimeoutRef.current = null;
    }, 150);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDark = storedTheme === "dark";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setIsThemeLoading(false);
    
    // Use actual loading completion instead of arbitrary timeout
    const handleLoad = () => {
      if (appLoadingTimeoutRef.current) {
        clearTimeout(appLoadingTimeoutRef.current);
      }
      appLoadingTimeoutRef.current = setTimeout(() => {
        setIsAppLoading(false);
        appLoadingTimeoutRef.current = null;
      }, 300);
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (appLoadingTimeoutRef.current) {
        clearTimeout(appLoadingTimeoutRef.current);
      }
      if (themeTimeoutRef.current) {
        clearTimeout(themeTimeoutRef.current);
      }
    };
  }, []);

  if (isAppLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading Education...</p>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index toggleTheme={toggleTheme} isDarkMode={isDarkMode} isThemeLoading={isThemeLoading} />} />
        <Route path="/videos" element={<Videos toggleTheme={toggleTheme} isDarkMode={isDarkMode} isThemeLoading={isThemeLoading} />} />
        <Route path="/resources" element={<Resources toggleTheme={toggleTheme} isDarkMode={isDarkMode} isThemeLoading={isThemeLoading} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;