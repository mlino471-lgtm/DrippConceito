require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

// Inicialização do Banco de Dados SQLite
const db = require('./database');

// Importação das rotas
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Garantir que diretórios de uploads existam
const uploadDir = path.join(__dirname, 'public', 'uploads', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração de CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Middlewares para parsing de requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de Sessão
app.use(session({
  secret: process.env.SESSION_SECRET || 'dripp-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
  }
}));

// Servir arquivos estáticos da pasta /public
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Multer para uploads gerais
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `upload-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem (JPEG, PNG, WebP, SVG) são permitidos.'));
    }
  }
});

// Rota independente para upload de imagens
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'Nenhum arquivo enviado para upload.'
    });
  }

  const fileUrl = `/uploads/products/${req.file.filename}`;
  return res.json({
    success: true,
    message: 'Upload realizado com sucesso!',
    url: fileUrl,
    filename: req.file.filename
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    store: 'DRIPP CONCEITO',
    city: 'São Carlos, SP',
    timestamp: new Date().toISOString()
  });
});

// Rota direta para categorias (/api/categories)
app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id AND p.active = 1
      WHERE c.active = 1
      GROUP BY c.id
      ORDER BY c.name ASC
    `).all();

    return res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao consultar categorias.'
    });
  }
});

// Montagem das rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/admin', adminRoutes);

// Tratamento de rotas não encontradas (404)
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Recurso da API não encontrado.'
  });
});

// Middleware Global de Tratamento de Erros
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Ocorreu um erro interno no servidor da DRIPP CONCEITO.'
  });
});

// Detectar IP local da rede
function getLocalIP() {
  const os = require('os');
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

// Inicialização do servidor em 0.0.0.0 (acessível pela rede)
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  const localIP = getLocalIP();
  console.log(`====================================================`);
  console.log(`  🔥 DRIPP CONCEITO - Servidor Online!`);
  console.log(`  📍 São Carlos - SP, Brasil`);
  console.log(`  🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  `);
  console.log(`  Acesso Local:    http://localhost:${PORT}`);
  console.log(`  Acesso na Rede:  http://${localIP}:${PORT}`);
  console.log(`  Admin Panel:     http://${localIP}:${PORT}/admin/`);
  console.log(`  `);
  console.log(`  🔑 Admin: admin@dripp.com.br / admin123`);
  console.log(`====================================================`);
});

module.exports = app;
