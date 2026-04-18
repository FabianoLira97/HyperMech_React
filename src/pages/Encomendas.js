import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const precos = {
  'CLP Logo Siemens': 925.66,
  'Fonte Sitop Siemens': 1778.90,
  'Motor WEG': 1826.99,
  'Nobreak WEG': 427.49,
};

const Encomendas = () => {
  const [lista, setLista] = useState([]);
  const [editando, setEditando] = useState({ nome: '', produtoIndex: null, produtoId: null });
  const [form, setForm] = useState({ nome: '', produto: '', qtde: '', unitario: '' });

  // Carregar do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('encomendas');
    if (saved) setLista(JSON.parse(saved));
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem('encomendas', JSON.stringify(lista));
  }, [lista]);

  const adicionar = (e) => {
    e.preventDefault();

    if (!form.nome.trim()) return alert('Preencha o nome');
    if (!form.produto) return alert('Selecione o produto');

    const qt = Number(form.qtde);
    const unit = Number(form.unitario);
    if (!qt || qt < 1) return alert('Quantidade inválida');
    if (!unit || unit <= 0) return alert('Valor unitário inválido');

    setLista(prev => {
      const nomeNormalizado = form.nome.trim().toLowerCase();
      const indexUsuario = prev.findIndex(i => i.nome.toLowerCase() === nomeNormalizado);

      // Editando um produto existente
      if (editando.produtoId !== null && indexUsuario !== -1) {
        const novosUsuarios = [...prev];
        novosUsuarios[indexUsuario] = {
          ...novosUsuarios[indexUsuario],
          produtos: novosUsuarios[indexUsuario].produtos.map((p, idx) =>
            idx === editando.produtoIndex
              ? { produto: form.produto, qtde: qt, unitario: unit }
              : p
          )
        };
        setEditando({ nome: '', produtoIndex: null, produtoId: null });
        return novosUsuarios;
      }

      // Usuário já existe, adiciona produto
      if (indexUsuario !== -1) {
        const novosUsuarios = [...prev];
        novosUsuarios[indexUsuario] = {
          ...novosUsuarios[indexUsuario],
          produtos: [
            ...novosUsuarios[indexUsuario].produtos,
            { produto: form.produto, qtde: qt, unitario: unit }
          ]
        };
        return novosUsuarios;
      }

      // Novo usuário
      return [
        ...prev,
        {
          id: Date.now(),
          nome: form.nome,
          produtos: [{ produto: form.produto, qtde: qt, unitario: unit }],
          data: new Date().toLocaleDateString('pt-BR'),
        }
      ];
    });

    setForm({ nome: '', produto: '', qtde: '', unitario: '' });
  };

  const removerProduto = (nome, index) => {
    if (!window.confirm('Deseja excluir este produto?')) return;
    setLista(prev =>
      prev
        .map(user => {
          if (user.nome === nome) {
            return { ...user, produtos: user.produtos.filter((_, idx) => idx !== index) };
          }
          return user;
        })
        .filter(user => user.produtos.length > 0)
    );
  };

  const editarProduto = (item, index) => {
    setEditando({ nome: item.nome, produtoIndex: index, produtoId: item.id });
    const produto = item.produtos[index];
    setForm({
      nome: item.nome,
      produto: produto.produto,
      qtde: produto.qtde,
      unitario: produto.unitario
    });
  };

  const totalGeral = lista.reduce(
    (acc, user) => acc + user.produtos.reduce((s, p) => s + p.qtde * p.unitario, 0),
    0
  );

  const finalizarPedido = () => {
    if (!lista.length) return alert("Nenhum produto adicionado!");

    let resumo = 'Resumo do Pedido:\n\n';
    lista.forEach(user => {
      const totalUser = user.produtos.reduce((acc, p) => acc + p.qtde * p.unitario, 0);
      resumo += `${user.nome}: R$ ${totalUser.toFixed(2)}\n`;
    });
    resumo += `\nTotal Geral: R$ ${totalGeral.toFixed(2)}`;

    alert(resumo);

    setLista([]);
    setForm({ nome: '', produto: '', qtde: '', unitario: '' });
  };

  return (
    <div className="container">
      <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Encomendas
      </motion.h2>

      <p style={{ marginTop: 4 }}>
        Total geral: <strong>R$ {totalGeral.toFixed(2)}</strong>
      </p>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="tabela-box"
          style={{
            background: '#fff',
            padding: 20,
            borderRadius: 12,
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            marginTop: 20,
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: 'var(--primary)', color: '#fff' }}>
              <tr>
                <th style={{ padding: 12 }}>Nome</th>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Unit</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map(user =>
                user.produtos.map((p, index) => (
                  <tr key={user.id + '-' + index} style={{ background: index % 2 === 0 ? '#f7f9fc' : '#fff', transition: '0.2s' }}>
                    <td style={{ padding: 12 }}>{index === 0 ? user.nome : ''}</td>
                    <td style={{ textAlign: 'center' }}>{p.produto}</td>
                    <td style={{ textAlign: 'center' }}>{p.qtde}</td>
                    <td style={{ textAlign: 'center' }}>R$ {p.unitario.toFixed(2)}</td>
                    <td style={{ textAlign: 'center', fontWeight: index === 0 ? 'bold' : 'normal' }}>
                      {index === 0 ? `R$ ${user.produtos.reduce((acc, prod) => acc + prod.qtde * prod.unitario, 0).toFixed(2)}` : ''}
                    </td>
                    <td style={{ textAlign: 'center', padding: 12 }}>
                      <button
                        className="btn-primary"
                        style={{ padding: '4px 10px', marginRight: 6 }}
                        onClick={() => editarProduto(user, index)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-primary"
                        style={{ padding: '4px 10px', background: '#d9534f' }}
                        onClick={() => removerProduto(user.nome, index)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>
      </AnimatePresence>

      <h3 style={{ marginTop: 28 }}>
        {editando.produtoId !== null ? 'Editar Produto' : 'Adicionar Produto'}
      </h3>

      <motion.form
        onSubmit={adicionar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: '#fff',
          padding: 20,
          borderRadius: 12,
          marginTop: 12,
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 12,
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          }}
        >
          <input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

          <select
            value={form.produto}
            onChange={(e) =>
              setForm({
                ...form,
                produto: e.target.value,
                unitario: precos[e.target.value] || '',
              })
            }
          >
            <option value="">Selecione o Produto</option>
            {Object.keys(precos).map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Qtd"
            value={form.qtde}
            onChange={(e) => setForm({ ...form, qtde: e.target.value })}
          />

          <input
            type="number"
            placeholder="Valor Unitário"
            value={form.unitario}
            onChange={(e) => setForm({ ...form, unitario: e.target.value })}
          />
        </div>

        <button className="btn-primary" style={{ marginTop: 16, width: '100%' }}>
          {editando.produtoId !== null ? 'Salvar Alterações' : 'Adicionar'}
        </button>
      </motion.form>

      <button
        className="btn-primary"
        style={{ marginTop: 20, width: '100%', background: '#28a745' }}
        onClick={finalizarPedido}
      >
        Finalizar Pedido
      </button>
    </div>
  );
};

export default Encomendas;