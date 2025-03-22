import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import About from "./components/About";
import Favorites from "./components/Favorites";
import MyCards from "./components/MyCards";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Theme, ThemeContext } from "./context/ThemeContext";
import { useState, useEffect } from "react";
import ColorThemeToggle from "./components/ColorThemeToggle";
import Cards from "./components/cards/Cards";
import AddCard from "./components/cards/addCard";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import EditCard from "./components/cards/editCard";

function App() {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.classList.add(`theme-${theme}`);
    return () => {
      document.body.classList.remove(`theme-${theme}`);
    };
  }, [theme]);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ToastContainer />
          <ColorThemeToggle />
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Cards />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/addCard" element={<AddCard />} />
              <Route path="/about" element={<About />} />
              <Route path="/EditCard/:cardId" element={<EditCard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/MyCards" element={<MyCards />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeContext.Provider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
