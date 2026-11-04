# Pluga Flow — Landing Page Oficial

Landing page desenvolvida para a apresentação e captação de clientes do **Pluga Flow**, configurada para operar no subdomínio **`pluga.xpanel.com.br`** com identidade visual alinhada às diretrizes da marca (SXConnect).

---

## 🎨 Identidade Visual e Recursos

- **Identidade Fiel ao Mockup:** Paleta nas cores Verde Neon (`#00e676`), Ciano Brilhante (`#00d2ff`), Azul Profundo (`#07152b`) e Branco Puro.
- **Hero Section Completa:** Logo com plug neon, proposta de valor (*"Sua loja. Seu domínio. Seus clientes."*), CTAs de alta conversão e mockup flutuante em alta definição.
- **Os 6 Pilares de Entrega:**
  1. Loja digital no seu domínio
  2. Pedidos online organizados
  3. Clube de clientes (fidelização e benefícios)
  4. Entrega configurada (distâncias, taxas e raios)
  5. Pagamento integrado (online via gateway e Pix)
  6. Área do entregador (operação de delivery)
- **Split Section:** Comparativo *"Você continua sendo dono do seu canal"* + Case de Sucesso Real da **Polpe's** (com fotos e mockups de tela reais).
- **Como Funciona:** Linha do tempo em 3 passos com ícones e setas indicadoras.
- **Oferta Comercial / Pricing:** Barra de destaque com Implantação de **R$ 300** e mensalidade de **R$ 99,90/mês**.
- **Simulador Interativo de Subdomínio:** Permite ao visitante digitar o nome da loja e ver seu link instantâneo no XPanel.
- **Demonstração Interativa:** Modal alternando entre a visão do cliente (Polpe's) e a visão do lojista (painel administrativo).
- **FAQ com Accordion:** 5 dúvidas essenciais respondidas para quebrar objeções de venda.
- **WhatsApp Integrado:** Links dinâmicos com mensagem pré-formatada e botão flutuante pulsante.

---

## 📁 Estrutura da Pasta

```
site pluga/
├── index.html                  ← Página principal responsiva e semântica
├── server.js                   ← Servidor Node.js HTTP nativo (zero dependências)
├── package.json                ← Scripts npm (npm start, npm run dev)
├── nginx.conf                  ← Configuração otimizada para pluga.xpanel.com.br
├── Dockerfile                  ← Container Nginx Alpine (~20MB)
├── docker-compose.yml          ← Deploy com 1 comando
├── README.md                   ← Este manual
└── assets/
    ├── css/
    │   └── styles.css          ← Variáveis CSS, efeitos neon e transições
    ├── js/
    │   └── app.js              ← Interatividades, modais, FAQ e gerador de WhatsApp
    ├── icons/                  ← Ícones vetoriais SVG de alta resolução
    │   ├── plug-neon.svg
    │   ├── store.svg
    │   ├── clipboard-orders.svg
    │   ├── customer-club.svg
    │   ├── delivery-bike.svg
    │   ├── payment-gateway.svg
    │   ├── delivery-rider.svg
    │   ├── store-neon.svg
    │   ├── step-chat.svg
    │   ├── step-settings.svg
    │   └── step-rocket.svg
    └── img/                    ← Imagens e mockups oficiais da marca
        ├── logo-pluga.png      ← Logo oficial do Pluga Flow (PNG transparente)
        ├── logo-polpes.png     ← Logo oficial da Polpe's Açaí (alta definição)
        ├── hero-woman-transparent.png ← Imagem oficial recortada da Hero
        ├── polpes-phones.png   ← Mockup dos smartphones da Polpe's
        ├── acai-familia.webp   ← Imagem do cardápio demonstrativo
        └── mockup-referencia.jpg ← Referência visual completa
```

---

## 🚀 Como Executar Localmente

### Opção 1: Usando Node.js (Sem instalar nada extra)

```bash
cd "site pluga"
node server.js
```

Acesse: `http://localhost:3000`

### Opção 2: Usando Python

```bash
cd "site pluga"
python3 -m http.server 3000
```

### Opção 3: Usando Docker

```bash
cd "site pluga"
docker compose up -d
```

Acesse: `http://localhost:8085`

---

## 🌐 Configuração no XPanel (`pluga.xpanel.com.br`)

Para publicar no subdomínio:

1. **DNS / Apontamento:**
   - Crie uma entrada do tipo `A` ou `CNAME` no provedor DNS apontando:
     - Host: `pluga` (ou `pluga.xpanel.com.br`)
     - Destino: IP do servidor onde o XPanel/Nginx está rodando.

2. **No XPanel / Nginx:**
   - Crie um novo site para o domínio `pluga.xpanel.com.br`.
   - Aponte a pasta raiz para o caminho da pasta `site pluga`.
   - Ative o certificado SSL gratuito (Let's Encrypt).
   - O arquivo `nginx.conf` incluído neste diretório já contém as regras recomendadas de cache e compressão gzip.

---

## ⚙️ Personalização de Contato

O WhatsApp oficial configurado é o da **SxConnect** (empresa desenvolvedora do Pluga Flow):

```javascript
const CONFIG = {
  whatsappNumber: '5521987000079', // SxConnect Oficial: (21) 98700-0079
  subdomain: 'pluga.xpanel.com.br',
  companyName: 'Pluga Flow • SXConnect'
};
```
