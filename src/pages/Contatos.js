import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contatos = () => {
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    assunto: "",
    categoria: "",
    mensagem: "",
  });

  // Atualiza qualquer campo
  const alterar = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Máscara automática de telefone
  const mascaraTelefone = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length <= 10) {
      return value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  // Validação simples
  const validarForm = () => {
    if (form.nome.trim().length < 3) {
      alert("Digite seu nome completo.");
      return false;
    }
    if (!form.email.includes("@") || !form.email.includes(".")) {
      alert("Digite um email válido.");
      return false;
    }
    if (form.mensagem.trim().length < 10) {
      alert("Descreva sua mensagem com mais detalhes.");
      return false;
    }
    return true;
  };

  // Enviar formulário
  const enviarForm = (e) => {
    e.preventDefault();
    if (!validarForm()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setEnviado(true);

      // limpa form
      setForm({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        assunto: "",
        categoria: "",
        mensagem: "",
      });

      // remove mensagem após 3s
      setTimeout(() => setEnviado(false), 3000);
    }, 1400);
  };

  return (
    <div className="container">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Fale Conosco
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ maxWidth: 700, marginBottom: 20 }}
      >
        Preencha o formulário abaixo e nossa equipe retornará o mais rápido possível.
      </motion.p>

      <motion.form
        onSubmit={enviarForm}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "#fff",
          padding: 30,
          borderRadius: 14,
          boxShadow: "0 12px 40px rgba(16,24,40,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* GRID DOS CAMPOS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          <div>
            <label>Nome Completo:</label>
            <input
              type="text"
              value={form.nome}
              onChange={(e) => alterar("nome", e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => alterar("email", e.target.value)}
              required
            />
          </div>

          <div>
            <label>Telefone:</label>
            <input
              type="tel"
              value={form.telefone}
              onChange={(e) => alterar("telefone", mascaraTelefone(e.target.value))}
              placeholder="(XX) XXXXX-XXXX"
              required
            />
          </div>

          <div>
            <label>Empresa (opcional):</label>
            <input
              type="text"
              value={form.empresa}
              onChange={(e) => alterar("empresa", e.target.value)}
            />
          </div>

          <div>
            <label>Assunto:</label>
            <input
              type="text"
              value={form.assunto}
              onChange={(e) => alterar("assunto", e.target.value)}
              required
            />
          </div>

          <div>
            <label>Categoria:</label>
            <select
              value={form.categoria}
              onChange={(e) => alterar("categoria", e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              <option>Orçamento</option>
              <option>Suporte Técnico</option>
              <option>Parcerias</option>
              <option>Dúvidas Gerais</option>
            </select>
          </div>
        </div>

        {/* MENSAGEM */}
        <div>
          <label>Mensagem:</label>
          <textarea
            rows={6}
            value={form.mensagem}
            onChange={(e) => alterar("mensagem", e.target.value)}
            required
          ></textarea>
        </div>

        {/* BOTÃO */}
        <motion.button
          type="submit"
          className="btn-primary"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 10,
            width: "100%",
            fontSize: 17,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Enviando..." : "Enviar Mensagem"}
        </motion.button>

        {/* FEEDBACK DE SUCESSO */}
        <AnimatePresence>
          {enviado && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                marginTop: 12,
                textAlign: "center",
                color: "green",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              ✔ Mensagem enviada com sucesso!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
};

export default Contatos;