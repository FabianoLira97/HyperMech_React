import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './produtos.css';

// IMPORTAR AS IMAGENS
import P1A from '../assets/Produto1_A.png';
import P1B from '../assets/Produto1_B.png';
import P1C from '../assets/Produto1_C.png';

import P2A from '../assets/Produto2_A.jpg';
import P2B from '../assets/Produto2_B.jpg';
import P2C from '../assets/Produto2_C.jpg';

import P3A from '../assets/Produto3_A.png';
import P3B from '../assets/Produto3_B.png';
import P3C from '../assets/Produto3_C.png';

import P4A from '../assets/Produto4_A.png';
import P4B from '../assets/Produto4_B.png';
import P4C from '../assets/Produto4_C.png';

// LISTA DE PRODUTOS
const produtosMock = [
  {
    id: 1,
    nome: 'CLP Siemens Logo!',
    preco: 925.66,
    desc: '24VCC, 8 entradas digitais. Ideal para automação compacta.',
    imgs: [P1A, P1B, P1C],
  },
  {
    id: 2,
    nome: 'Fonte Sitop Siemens',
    preco: 1778.9,
    desc: 'Fonte estabilizada industrial de alta confiabilidade.',
    imgs: [P2A, P2B, P2C],
  },
  {
    id: 3,
    nome: 'Motor WEG W22',
    preco: 1826.99,
    desc: 'Motor trifásico WEG W22 — alta performance e durabilidade.',
    imgs: [P3A, P3B, P3C],
  },
  {
    id: 4,
    nome: 'Nobreak Home Monofásico WEG 600VA',
    preco: 427.49,
    desc: 'Autonomia e segurança para computadores e pequenos equipamentos.',
    imgs: [P4A, P4B, P4C],
  },
];

const Produtos = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  const produtoSelecionado = produtosMock.find(p => p.id === selectedId);

  const nextImg = () => {
    if (!produtoSelecionado) return;
    setImgIndex(i => (i + 1) % produtoSelecionado.imgs.length);
  };

  const prevImg = () => {
    if (!produtoSelecionado) return;
    setImgIndex(i => (i - 1 + produtoSelecionado.imgs.length) % produtoSelecionado.imgs.length);
  };

  // AUTO-CARROSSEL (4s)
  useEffect(() => {
    if (!produtoSelecionado) return;
    const timer = setInterval(() => nextImg(), 4000);
    return () => clearInterval(timer);
  }, [produtoSelecionado]);

  return (
    <div className="container">
      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Nossos Produtos
      </motion.h2>

      {/* GRID */}
      <div className="grid-produtos" style={{ marginTop: 18 }}>
        {produtosMock.map(prod => (
          <div
            key={prod.id}
            className="card card-hover"
            onClick={() => {
              setSelectedId(prod.id);
              setImgIndex(0);
            }}
          >
            <div className="card-overlay-hover">Ver detalhes</div>

            <img src={prod.imgs[0]} alt={prod.nome} />
            <h3 style={{ marginTop: 12 }}>{prod.nome}</h3>
            <p style={{ color: 'var(--accent)', fontWeight: 700 }}>
              R$ {prod.preco.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedId && produtoSelecionado && (
          <motion.div
            className="modal-overlay blur-bg"
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="modal-inner"
              onClick={e => e.stopPropagation()}
              initial={{ y: 30 }}
              animate={{ y: 0 }}
              exit={{ y: 30 }}
            >
              <div className="carousel-container">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIndex}
                    src={produtoSelecionado.imgs[imgIndex]}
                    className="carousel-img"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45 }}
                  />
                </AnimatePresence>

                {/* MINIATURAS */}
                <div className="thumbs-container">
                  {produtoSelecionado.imgs.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      className={`thumb ${idx === imgIndex ? 'active' : ''}`}
                      onClick={() => setImgIndex(idx)}
                    />
                  ))}
                </div>

                {/* CONTROLES */}
                <div className="carousel-controls">
                  <button className="btn-primary mini" onClick={prevImg}>◀</button>
                  <button className="btn-primary mini" onClick={nextImg}>▶</button>
                </div>
              </div>

              <div className="modal-details">
                <h2>{produtoSelecionado.nome}</h2>
                <p>{produtoSelecionado.desc}</p>
                <h3>R$ {produtoSelecionado.preco.toFixed(2)}</h3>
              </div>

              <button className="btn-primary close-btn" onClick={() => setSelectedId(null)}>
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Produtos;