import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Encomendas from './pages/Encomendas';
import Contatos from './pages/Contatos';
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
useEffect(() => {
AOS.init({ duration: 700, once: true });
}, []);


return (
<Router>
<Header />
<main>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/produtos" element={<Produtos />} />
<Route path="/encomendas" element={<Encomendas />} />
<Route path="/contatos" element={<Contatos />} />
</Routes>
</main>
<Footer />
</Router>
);
}


export default App;