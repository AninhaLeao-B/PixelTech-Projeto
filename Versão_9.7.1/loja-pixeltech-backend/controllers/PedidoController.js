
const Pedido = require('../models/Pedido');

exports.criarPedido = async (req, res) => {
  try {
    const novoPedido = new Pedido(req.body);
    await novoPedido.save();
    res.status(201).json({
      success: true,
      id: novoPedido._id,
      mensagem: "Pedido salvo com sucesso!"
    });
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
    res.status(500).json({
      success: false,
      mensagem: "Não foi possível salvar o pedido.",
      erro: error.message // Adiciona detalhes do erro
    });
  }
};

exports.listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json({ success: true, pedidos });
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao listar pedidos." });
  }
};

exports.buscarPedidoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findById(id);
    if (!pedido) {
      return res.status(404).json({ success: false, mensagem: "Pedido não encontrado." });
    }
    res.status(200).json({ success: true, pedido });
  } catch (error) {
    console.error("Erro ao buscar pedido:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao buscar pedido." });
  }
};

exports.deletarPedido = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByIdAndDelete(id);
    if (!pedido) {
      return res.status(404).json({ success: false, mensagem: "Pedido não encontrado." });
    }
    res.status(200).json({ success: true, mensagem: "Pedido deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar pedido:", error);
    res.status(500).json({ success: false, mensagem: "Erro ao deletar pedido." });
  }
};

module.exports = exports;
