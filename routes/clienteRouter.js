const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.listarClientes);
router.get('/cidade/:cidade', clienteController.listarPorCidade);
router.get('/:id', clienteController.obterClientePorId);
router.get('/:id/pedidos', clienteController.listarPedidos);
router.put('/:id', clienteController.atualizarCliente);
router.post('/:id/pedidos', clienteController.adicionarPedido);
router.delete('/:id', clienteController.removerCliente);

module.exports = router;