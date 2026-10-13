const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const { authenticateToken } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'dripp-conceito-secret-key-2024';

/**
 * POST /api/auth/register
 * Cadastro de novo cliente
 */
router.post('/register', (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      cpf,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_state,
      address_cep
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nome, e-mail e senha são campos obrigatórios para o cadastro.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Verifica se já existe um usuário cadastrado com esse e-mail
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Já existe uma conta cadastrada com este e-mail.'
      });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const insertUser = db.prepare(`
      INSERT INTO users (
        name, email, password_hash, phone, cpf,
        address_street, address_number, address_complement,
        address_neighborhood, address_city, address_state, address_cep,
        role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'customer')
    `);

    const result = insertUser.run(
      name.trim(),
      normalizedEmail,
      passwordHash,
      phone ? phone.trim() : null,
      cpf ? cpf.trim() : null,
      address_street ? address_street.trim() : null,
      address_number ? address_number.trim() : null,
      address_complement ? address_complement.trim() : null,
      address_neighborhood ? address_neighborhood.trim() : null,
      address_city ? address_city.trim() : null,
      address_state ? address_state.trim() : null,
      address_cep ? address_cep.trim() : null
    );

    const userId = result.lastInsertRowid;
    const token = jwt.sign(
      { id: userId, email: normalizedEmail, role: 'customer' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    if (req.session) {
      req.session.token = token;
      req.session.userId = userId;
    }

    const newUser = db.prepare(`
      SELECT id, name, email, phone, cpf,
             address_street, address_number, address_complement,
             address_neighborhood, address_city, address_state, address_cep,
             role, created_at
      FROM users WHERE id = ?
    `).get(userId);

    return res.status(201).json({
      success: true,
      message: 'Cadastro realizado com sucesso! Seja bem-vindo à DRIPP CONCEITO.',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    return res.status(500).json({
      success: false,
      message: 'Ocorreu um erro interno ao processar seu cadastro. Tente novamente mais tarde.'
    });
  }
});

/**
 * POST /api/auth/login
 * Autenticação de usuário com JWT e Sessão
 */
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Por favor, informe seu e-mail e sua senha de acesso.'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'E-mail ou senha incorretos. Verifique suas credenciais.'
      });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'E-mail ou senha incorretos. Verifique suas credenciais.'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    if (req.session) {
      req.session.token = token;
      req.session.userId = user.id;
    }

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      address_street: user.address_street,
      address_number: user.address_number,
      address_complement: user.address_complement,
      address_neighborhood: user.address_neighborhood,
      address_city: user.address_city,
      address_state: user.address_state,
      address_cep: user.address_cep,
      role: user.role,
      created_at: user.created_at
    };

    return res.json({
      success: true,
      message: 'Login realizado com sucesso!',
      token,
      user: userProfile
    });
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao processar o login. Tente novamente mais tarde.'
    });
  }
});

/**
 * POST /api/auth/logout
 * Finalizar sessão
 */
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.json({
        success: true,
        message: 'Sessão encerrada com sucesso.'
      });
    });
  } else {
    res.json({
      success: true,
      message: 'Sessão encerrada com sucesso.'
    });
  }
});

/**
 * GET /api/auth/me
 * Retorna os dados do usuário autenticado
 */
router.get('/me', authenticateToken, (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
});

/**
 * PUT /api/auth/profile
 * Atualiza os dados de perfil e endereço do usuário autenticado
 */
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const {
      name,
      phone,
      cpf,
      address_street,
      address_number,
      address_complement,
      address_neighborhood,
      address_city,
      address_state,
      address_cep,
      current_password,
      new_password
    } = req.body;

    const userRecord = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);

    // Se o usuário deseja alterar a senha
    if (new_password) {
      if (!current_password) {
        return res.status(400).json({
          success: false,
          message: 'Informe a senha atual para cadastrar uma nova senha.'
        });
      }

      const isCurrentCorrect = bcrypt.compareSync(current_password, userRecord.password_hash);
      if (!isCurrentCorrect) {
        return res.status(400).json({
          success: false,
          message: 'A senha atual informada está incorreta.'
        });
      }

      const newHash = bcrypt.hashSync(new_password, 10);
      db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, req.user.id);
    }

    const updateProfile = db.prepare(`
      UPDATE users SET
        name = COALESCE(?, name),
        phone = COALESCE(?, phone),
        cpf = COALESCE(?, cpf),
        address_street = COALESCE(?, address_street),
        address_number = COALESCE(?, address_number),
        address_complement = COALESCE(?, address_complement),
        address_neighborhood = COALESCE(?, address_neighborhood),
        address_city = COALESCE(?, address_city),
        address_state = COALESCE(?, address_state),
        address_cep = COALESCE(?, address_cep)
      WHERE id = ?
    `);

    updateProfile.run(
      name !== undefined ? name.trim() : null,
      phone !== undefined ? phone.trim() : null,
      cpf !== undefined ? cpf.trim() : null,
      address_street !== undefined ? address_street.trim() : null,
      address_number !== undefined ? address_number.trim() : null,
      address_complement !== undefined ? address_complement.trim() : null,
      address_neighborhood !== undefined ? address_neighborhood.trim() : null,
      address_city !== undefined ? address_city.trim() : null,
      address_state !== undefined ? address_state.trim() : null,
      address_cep !== undefined ? address_cep.trim() : null,
      req.user.id
    );

    const updatedUser = db.prepare(`
      SELECT id, name, email, phone, cpf,
             address_street, address_number, address_complement,
             address_neighborhood, address_city, address_state, address_cep,
             role, created_at
      FROM users WHERE id = ?
    `).get(req.user.id);

    return res.json({
      success: true,
      message: 'Perfil atualizado com sucesso!',
      user: updatedUser
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao atualizar os dados de perfil.'
    });
  }
});

module.exports = router;
