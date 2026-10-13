# 👕 DRIPP CONCEITO | MODA MASCULINA

> **Estilo, qualidade e personalidade urbana.**  
> E-commerce premium completo desenvolvido para a loja física e virtual de **São Carlos - SP**.

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-black.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-blue.svg)](https://github.com/WiseLibs/better-sqlite3)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

---

## 📍 Sobre a Loja

- **Marca:** DRIPP CONCEITO
- **Nicho:** Moda Masculina & Streetwear Premium
- **Endereço Físico:** Av. Regit Arab, 703 • São Carlos - SP
- **Instagram:** [@dripp.conceito](https://www.instagram.com/dripp.conceito/)
- **Grupo VIP WhatsApp:** [Atendimento & Ofertas](https://chat.whatsapp.com/Em515edEkgbDg0j5ya08lu?mode=gi_t)
- **Disponível também:** [Shopee Oficial](https://shopee.com.br) e [Mercado Livre](https://www.mercadolivre.com.br)

---

## ✨ Funcionalidades do Projeto

### 🛍️ Loja Virtual (Storefront)
- **Design Streetwear Premium:** Identidade visual nas cores Preto (`#000000`), Cinza (`#27272A`, `#E4E4E7`) e Branco (`#FFFFFF`).
- **Logo Oficial com Fundo Transparente:** Tratamento com flood fill e suavização anti-aliasing.
- **Catálogo Dinâmico:** Filtros por categoria, faixa de preço, ordenação e pesquisa em tempo real.
- **Página de Produto Completa:** Seleção interativa de tamanho (P, M, G, GG) e cor, cálculo de frete para São Carlos e região via CEP (ViaCEP API), indicador de estoque.
- **Carrinho de Compras Interativo:** Atualização dinâmica de quantidades, cupom de desconto e cálculo de frete.
- **Checkout Seguro em 4 Passos:** Identificação, endereço de entrega, forma de pagamento (PIX com 5% de desconto, Cartão de Crédito com preview interativo e Boleto Bancário).
- **Área do Cliente:** Cadastro e login com autenticação JWT/Session, histórico de pedidos com timeline de rastreio e edição de perfil.
- **Botão Flutuante de WhatsApp:** Acesso rápido ao canal VIP com animação pulsante.
- **Integração Visual com Marketplaces:** Selos e alertas oficiais da presença da marca na Shopee e no Mercado Livre.

### 🛡️ Painel Administrativo Completo
> **Localização:** Link exclusivo e discreto posicionado no rodapé da loja (`/admin/`).

- **Dashboard:** Métricas em tempo real (Total de Vendas, Ticket Médio, Novos Clientes, Pedidos Recentes).
- **Gestão Financeira:** Relatório financeiro com filtros por período, gráficos de receita, divisão por método de pagamento (PIX, Cartão, Boleto) e exportação em CSV.
- **Cadastro e Edição de Produtos (CRUD):** Formulário completo com upload de imagens, controle de estoque, preço promocional, tamanhos e cores.
- **Gerenciador de Pedidos:** Acompanhamento de status (*Pendente*, *Processando*, *Enviado*, *Entregue*), inserção de código de rastreio e notas.
- **Gestão de Cupons:** Criação de cupons percentuais ou de valor fixo, limite de uso e data de validade.
- **Gestão de Categorias:** Organização visual de categorias e contagem de itens.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior instalado.

### Passo a Passo

1. **Clonar o Repositório:**
```bash
git clone https://github.com/mlino471-lgtm/DrippConceito.git
cd DrippConceito
```

2. **Instalar Dependências:**
```bash
npm install
```

3. **Configurar Variáveis de Ambiente:**
Crie um arquivo `.env` (ou utilize o padrão do `.env.example`):
```env
PORT=3000
JWT_SECRET=dripp-conceito-secret-key-2024
SESSION_SECRET=dripp-session-secret
```

4. **Iniciar o Servidor:**
```bash
npm start
```
O servidor inicializará automaticamente o banco SQLite (`dripp.db`) com produtos de demonstração, categorias e o usuário administrador.

5. **Acessar no Navegador:**
- Loja: `http://localhost:3000`
- Painel Admin: `http://localhost:3000/admin/`

---

## 🔑 Credenciais de Acesso Padrão

| Perfil | E-mail | Senha |
| :--- | :--- | :--- |
| 🛡️ **Administrador** | `admin@dripp.com.br` | `admin123` |
| 👤 **Cliente Teste** | `cliente@dripp.com.br` | `cliente123` |

---

## 📁 Estrutura de Pastas

```
dripp-conceito/
├── database.js          # Configuração e seed inicial do SQLite
├── middleware/          # Middlewares de autenticação (JWT) e perfil admin
├── package.json         # Dependências e scripts npm
├── public/              # Arquivos públicos e storefront
│   ├── admin/           # Painel Administrativo (HTML, CSS e JS)
│   ├── css/             # Folha de estilos principal (style.css)
│   ├── js/              # Motor JS da loja, carrinho e autenticação (app.js)
│   ├── uploads/         # Logo e imagens de produtos
│   ├── index.html       # Homepage
│   ├── loja.html        # Catálogo com filtros
│   ├── produto.html     # Detalhes do produto
│   ├── carrinho.html    # Carrinho de compras
│   ├── checkout.html    # Checkout multi-etapas
│   ├── conta.html       # Painel do cliente
│   └── login.html       # Autenticação e cadastro
├── routes/              # Endpoints da API REST (auth, products, orders, admin)
└── server.js            # Servidor Express
```

---

## 📄 Licença

Este projeto é desenvolvido para **DRIPP CONCEITO - Moda Masculina**. Todos os direitos reservados.
