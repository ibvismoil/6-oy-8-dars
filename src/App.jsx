import { useState, useEffect, createContext, useContext } from "react";
import { Menu, ShoppingCart, DollarSign } from "lucide-react";
import "./App.css";

const ThemeContext = createContext();
const LangContext = createContext();

function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { lang, toggleLang } = useContext(LangContext);
  const [products, setProducts] = useState([]);
 
  return (
    <nav className={`p-4 fixed top-0 w-full shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-green-600">STREET88</div>
        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li><a href="#" className="text-green text-lg flex items-center"><Menu size={20} className="mr-2" />{lang === "ru" ? "Меню" : "Menyu"}</a></li>
            <li><a href="#" className="text-green text-lg">{lang === "ru" ? "О нас" : "Biz haqimizda"}</a></li>
            <li><a href="#" className="text-green text-lg">{lang === "ru" ? "Контакты" : "Aloqa"}</a></li>
            <li><a href="#" className="text-green text-lg flex items-center"><ShoppingCart size={20} className="mr-2" /> {lang === "ru" ? "Корзина" : "Savat"}</a></li>
          </ul>
          <button onClick={toggleLang} className="text-green-500">{lang === "ru" ? "UZ" : "RU"}</button>
          <button onClick={toggleDarkMode} className="text-green-500">{darkMode ? "☀️" : "🌙"}</button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { darkMode } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  return (
    <section 
      className={`header_bg h-screen flex flex-col justify-center items-center bg-burger bg-cover bg-center ${darkMode ? "text-white" : "text-black"}`}
    >
      <h1 className="text-6xl font-bold text-green-400">
        {lang === "ru" ? "БОЛЬШОЙ ГАМБУРГЕР" : "KATTA GAMBURGER"}
      </h1>
      <h2 className="text-2xl mt-2 uppercase text-green-400">
        {lang === "ru" ? "Говядина" : "Mol go'shti"}
      </h2>
      <p className="max-w-2xl text-center mt-4">
        {lang === "ru" 
          ? "Свежая хрустящая булочка, листики салата..."
          : "Yangi pishirilgan non, salat barglari..."}
      </p>
      <button className="mt-6 bg-green-500 text-black py-3 flex items-center px-8 rounded text-lg font-bold shadow-lg">
        <DollarSign size={20} className="mr-2"/>14 500
      </button>
    </section>
  );
}


function MainSection({ products }) {
  const { darkMode } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  return (
    <section className={`bg-black text-white py-16 px-4 ${darkMode ? "bg-gray-900 text-black" : "bg-white text-black"}`} >
      <h3 className="text-4xl font-bold text-green-400 text-center">Наши товары</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 container mx-auto">
        {products.map(product => (
          <ProductCard key={product.id} image={product.image} title={product.title} price={product.price} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ image, title, price }) {
  const { darkMode } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  return (
    <div className={`bg-black  text-black rounded-lg p-4 shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <img src={image} alt={title} className="w-full h-40 object-contain mb-4" />
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-green-600 font-bold text-xl mt-2">${price}</p>
    </div>
  );
}

function BurgerShop() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("ru");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Ошибка загрузки данных:", error));
  }, []);  

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode: () => setDarkMode(!darkMode) }}>
      <LangContext.Provider value={{ lang, toggleLang: () => setLang(lang === "ru" ? "uz" : "ru") }}>
        <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
          <Navbar />
          <HeroSection />
          <MainSection products={products} />
        </div>
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

export default BurgerShop;
