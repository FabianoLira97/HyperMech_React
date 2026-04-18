import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './headerFooter.css';
import logo from '../assets/Logo.png';


const navItems = [
{ label: 'Home', to: '/' },
{ label: 'Produtos', to: '/produtos' },
{ label: 'Contato', to: '/contatos' },
{ label: 'Encomendas', to: '/encomendas' },
];


function Header() {
const [open, setOpen] = useState(false);
return (
<header className="header-container">
<div className="container-flex">
<Link to="/" className="brand">
<img src={logo} alt="HyperMech" className="logo" />
</Link>


<nav className="nav-desktop" aria-label="principal">
<ul>
{navItems.map((item) => (
<li key={item.to}><Link to={item.to}>{item.label}</Link></li>
))}
</ul>
</nav>


<button className="btn-mobile" onClick={() => setOpen(s => !s)} aria-expanded={open} aria-label="Abrir menu">
{open ? <X color="white" size={26} /> : <Menu color="white" size={26} />}
</button>
</div>


<AnimatePresence>
{open && (
<motion.div
className="menu-mobile-content"
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.28 }}
>
{navItems.map(item => (
<Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="mobile-link">{item.label}</Link>
))}
</motion.div>
)}
</AnimatePresence>
</header>
);
}


export default Header;