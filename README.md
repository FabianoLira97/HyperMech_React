# 🚀 HyperMech - Sistema Web Industrial

Aplicação web desenvolvida em React para gerenciamento de produtos industriais, encomendas e contato com clientes.

---

## 📌 Sobre o projeto

O **HyperMech** é uma aplicação front-end que simula um sistema de uma distribuidora industrial, permitindo:

* 📦 Visualização de produtos
* 🛒 Gerenciamento de encomendas
* 📞 Envio de mensagens via formulário
* 🏢 Apresentação institucional da empresa

---

## ⚙️ Tecnologias utilizadas

* React
* JavaScript (ES6+)
* CSS3
* Framer Motion (animações)
* LocalStorage (persistência de dados)

---

## 📂 Estrutura do projeto

```
src/
│
├── pages/
│   ├── Home.js
│   ├── Produtos.js
│   ├── Encomendas.js
│   └── Contatos.js
│
├── assets/
│   └── imagens do projeto
│
├── styles/
│   └── produtos.css
│
├── App.js
├── index.js
└── index.css
```

---

## ✨ Funcionalidades

### 🏠 Home

* Banner rotativo automático
* Seção institucional
* Integração com Google Maps

### 🛍️ Produtos

* Listagem de produtos
* Modal com detalhes
* Carrossel de imagens
* Navegação por miniaturas

### 📦 Encomendas

* Adicionar produtos por cliente
* Editar e remover itens
* Cálculo automático de total
* Persistência com LocalStorage

### 📞 Contato

* Formulário com validação
* Máscara de telefone
* Feedback de envio com animação

---

## 🧠 Lógica principal

* Gerenciamento de estado com `useState`
* Persistência com `localStorage`
* Animações com `framer-motion`
* Manipulação dinâmica de listas e formulários
