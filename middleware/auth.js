const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'dripp-conceito-secret-key-2024';

/**
 * Middleware para autenticar requisições via JWT (Header Authorization ou Sessão)
 */
function authenticateToken(req, res, next) {
  let token = null;

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.session && req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Acesso não autorizado. Por favor, realize o login para continuar.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Busca usuário atualizado no banco de dados
    const user = db.prepare(`
      SELECT id, name, email, phone, cpf, 
             address_street, address_number, address_complement, 
             address_neighborhood, address_city, address_state, address_cep, 
             role, created_at 
      FROM users 
      WHERE id = ?
    `).get(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuário não encontrado ou sessão expirada.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Token de autenticação inválido ou expirado.'
    });
  }
}

/**
 * Middleware para validar se o usuário possui cargo de administrador
 */
function requireAdmin(req, res, next) {
  if (!req.user) {
    return authenticateToken(req, res, () => {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        return res.status(403).json({
          success: false,
          message: 'Acesso restrito. Esta área é exclusiva para administradores da DRIPP CONCEITO.'
        });
      }
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acesso restrito. Esta área é exclusiva para administradores da DRIPP CONCEITO.'
    });
  }

  next();
}

/**
 * Middleware opcional para capturar usuário caso esteja logado
 */
function optionalAuth(req, res, next) {
  let token = null;

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.session && req.session.token) {
    token = req.session.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.prepare(`
        SELECT id, name, email, phone, cpf, 
               address_street, address_number, address_complement, 
               address_neighborhood, address_city, address_state, address_cep, 
               role, created_at 
        FROM users 
        WHERE id = ?
      `).get(decoded.id);

      if (user) {
        req.user = user;
      }
    } catch {
      // Ignora erro no optionalAuth
    }
  }

  next();
}

module.exports = {
  authenticateToken,
  requireAdmin,
  optionalAuth
};
