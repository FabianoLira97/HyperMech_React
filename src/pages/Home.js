import React, { useState, useEffect } from 'react';
import imgSobreNos from '../assets/sobre_nos.png';
import bannerImg from '../assets/Banner.jpg';
import bannerImg2 from '../assets/Banner2.jpg';
import { motion } from 'framer-motion';

const banners = [bannerImg, bannerImg2];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const timer = setInterval(() => setIndex(prev => (prev + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* ---------------------- */}
      {/*       BANNER ROTATIVO  */}
      {/* ---------------------- */}
      <div style={{ width: '100%', height: 420, overflow: 'hidden', position: 'relative' }}>
        <motion.img
          key={index}
          src={banners[index]}
          alt="Banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Indicadores */}
        <div style={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 10
        }}>
          {banners.map((_, i) => (
            <div
              key={i}
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: i === index ? 'white' : 'rgba(255,255,255,0.4)',
                boxShadow: i === index ? '0 6px 18px rgba(0,0,0,0.25)' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="container" style={{ paddingTop: 36 }}>
        {/* ---------------------- */}
        {/*       SOBRE NÓS        */}
        {/* ---------------------- */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', fontSize: 28 }}
        >
          Sobre a HyperMech
        </motion.h2>

        <motion.div
          className="gradient-animated card-block fade-up"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            color: 'black',
            textAlign: 'center',
            marginTop: 20
          }}
        >
          <p style={{ maxWidth: 820, margin: '0 auto', lineHeight: 2, fontSize: 20 }}>
            A <strong>HyperMech</strong> é uma distribuidora especializada em soluções industriais de alta performance.
            Nosso foco é fornecer soluções completas para manutenção, reparo e operação (MRO), garantindo qualidade, eficiência e confiabilidade para nossos clientes.
          </p>

          <motion.img
            src={imgSobreNos}
            alt="Sobre"
            style={{
              width: '100%',
              maxWidth: 550,
              margin: '32px auto 0',
              display: 'block',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* ---------------------- */}
        {/*     ONDE ESTAMOS       */}
        {/* ---------------------- */}
        <motion.div
          style={{ marginTop: 60, textAlign: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 style={{ color: 'var(--primary)', fontSize: 28 }}>Nosso Estabelecimento</h3>
          <p style={{ fontSize: 20, lineHeight: 2 }}>Veja no mapa abaixo como nos encontrar!</p>

          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              background: 'linear-gradient(135deg, #1f356e, #152046)',
              padding: 20,
              borderRadius: 14,
              marginTop: 20,
              boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
              transition: 'transform 0.3s'
            }}
          >
            <iframe
              src="https://www.google.com/maps?q=R.+Boa+Vista,+825+-+Boa+Vista,+São+Caetano+do+Sul+-+SP,+09572-300&output=embed"
              width="100%"
              height="360"
              style={{ border: 0, borderRadius: 10 }}
              allowFullScreen=""
              loading="lazy"
              title="mapa"
            ></iframe>

            <a
              href="https://www.google.com/maps?q=R.+Boa+Vista,+825+-+Boa+Vista,+São+Caetano+do+Sul+-+SP,+09572-300"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: 16,
                padding: '10px 24px',
                borderRadius: 8,
                background: '#fff',
                color: '#152046',
                fontWeight: 'bold',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
              }}
            >
              Abrir no Google Maps
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;