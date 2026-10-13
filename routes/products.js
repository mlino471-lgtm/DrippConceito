const express = require('express');
const router = express.Router();
const db = require('../database');

/**
 * Função utilitária para desserializar campos JSON dos produtos
 */
function formatProduct(product) {
  if (!product) return null;
  return {
    ...product,
    sizes: typeof product.sizes === 'string' ? JSON.parse(product.sizes || '[]') : (product.sizes || []),
    colors: typeof product.colors === 'string' ? JSON.parse(product.colors || '[]') : (product.colors || []),
    images: typeof product.images === 'string' ? JSON.parse(product.images || '[]') : (product.images || []),
    featured: Boolean(product.featured),
    active: Boolean(product.active)
  };
}

/**
 * GET /api/categories
 * Lista todas as categorias ativas com contagem de produtos
 */
router.get('/categories', (req, res) => {
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
      message: 'Erro interno ao listar categorias.'
    });
  }
});

/**
 * GET /api/products/featured
 * Retorna produtos em destaque da DRIPP CONCEITO
 */
router.get('/featured', (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 8;

    const rows = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.active = 1 AND p.featured = 1
      ORDER BY p.id DESC
      LIMIT ?
    `).all(limit);

    const products = rows.map(formatProduct);

    return res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar produtos em destaque.'
    });
  }
});

/**
 * GET /api/products
 * Lista de produtos com filtros avançados, ordenação e paginação
 */
router.get('/', (req, res) => {
  try {
    const {
      category,
      search,
      min_price,
      max_price,
      sort,
      featured,
      page = 1,
      limit = 12
    } = req.query;

    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.active = 1
    `;
    const params = [];

    // Filtro por Categoria (slug ou id)
    if (category) {
      if (!isNaN(category)) {
        query += ` AND p.category_id = ?`;
        params.push(Number(category));
      } else {
        query += ` AND c.slug = ?`;
        params.push(category.toLowerCase().trim());
      }
    }

    // Filtro por Busca (nome, descrição, marca)
    if (search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ? OR p.brand LIKE ?)`;
      const searchTerm = `%${search.trim()}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Filtro por Faixa de Preço
    if (min_price) {
      query += ` AND p.price >= ?`;
      params.push(parseFloat(min_price));
    }
    if (max_price) {
      query += ` AND p.price <= ?`;
      params.push(parseFloat(max_price));
    }

    // Filtro por Destaque
    if (featured !== undefined) {
      query += ` AND p.featured = ?`;
      params.push(featured === 'true' || featured === '1' ? 1 : 0);
    }

    // Contagem total para paginação
    const countSql = `SELECT COUNT(*) as total FROM (${query})`;
    const countRow = db.prepare(countSql).get(...params);
    const total = countRow ? countRow.total : 0;

    // Ordenação
    switch (sort) {
      case 'price_asc':
        query += ` ORDER BY p.price ASC`;
        break;
      case 'price_desc':
        query += ` ORDER BY p.price DESC`;
        break;
      case 'name_asc':
        query += ` ORDER BY p.name ASC`;
        break;
      case 'name_desc':
        query += ` ORDER BY p.name DESC`;
        break;
      case 'oldest':
        query += ` ORDER BY p.id ASC`;
        break;
      case 'newest':
      default:
        query += ` ORDER BY p.id DESC`;
        break;
    }

    // Paginação
    const pageNum = Math.max(1, parseInt(page, 10));
    const pageSize = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * pageSize;

    query += ` LIMIT ? OFFSET ?`;
    params.push(pageSize, offset);

    const rows = db.prepare(query).all(...params);
    const products = rows.map(formatProduct);

    return res.json({
      success: true,
      total,
      page: pageNum,
      limit: pageSize,
      total_pages: Math.ceil(total / pageSize),
      products
    });
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao consultar o catálogo de produtos.'
    });
  }
});

/**
 * GET /api/products/:slug
 * Detalhes de um produto específico com produtos relacionados
 */
router.get('/:slug', (req, res) => {
  try {
    const { slug } = req.params;

    // Busca por slug ou por ID numérico
    let product;
    if (!isNaN(slug)) {
      product = db.prepare(`
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.id = ? AND p.active = 1
      `).get(Number(slug));
    } else {
      product = db.prepare(`
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.slug = ? AND p.active = 1
      `).get(slug);
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produto não encontrado ou indisponível.'
      });
    }

    const formattedProduct = formatProduct(product);

    // Produtos relacionados da mesma categoria
    const relatedRows = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ? AND p.active = 1
      ORDER BY RANDOM()
      LIMIT 4
    `).all(product.category_id, product.id);

    return res.json({
      success: true,
      product: formattedProduct,
      related: relatedRows.map(formatProduct)
    });
  } catch (error) {
    console.error('Erro ao obter detalhes do produto:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno ao carregar detalhes do produto.'
    });
  }
});

module.exports = router;
