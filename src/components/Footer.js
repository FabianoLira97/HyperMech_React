import React from 'react';
import { Phone, Instagram } from 'lucide-react';
import './headerFooter.css';
import logo from '../assets/Logo.png';


function Footer() {
return (
<footer className="footer-container">
<div className="footer-content container">
<img src={logo} alt="HyperMech" className="logo_footer" />
<p style={{ marginTop: 4 }}>Faça o seu pedido:</p>
<div className="contatos-footer">
<a href="https://wa.me/5511992368297" className="link-icon" target="_blank" rel="noreferrer">
<Phone size={18} /> (11) 99236-8297
</a>
<span className="separador">|</span>
<a href="https://instagram.com/HyperMechOficial" className="link-icon" target="_blank" rel="noreferrer">
<Instagram size={18} /> @HyperMechOficial
</a>
</div>
</div>
</footer>
);
}


export default Footer;