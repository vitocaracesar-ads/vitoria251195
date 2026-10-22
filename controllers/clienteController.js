var clientes = [
    {
        id: 1,
        nome: 'Maria Silva',
        idade: 28,
        cidade: 'Sorocaba',
        pedidos: [
            { codigo: 101, produto: 'Mouse', quantidade: 2 },
            { codigo: 102, produto: 'Teclado', quantidade: 1 }
        ]
    },
    {
        id: 2,
        nome: 'Carlos Souza',
        idade: 35,
        cidade: 'Campinas',
        pedidos: []
    },
    {
        id: 3,
        nome: 'Ana Lima',
        idade: 22,
        cidade: 'Sorocaba',
        pedidos: [
            { codigo: 103, produto: 'Monitor', quantidade: 1 }
        ]
    }
];

exports.listarClientes = (req, res) => {
    res.json(clientes);
};

exports.obterClientePorId = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ mensagem: 'Id não existente' });
    }
};

exports.listarPedidos = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        res.json(cliente.pedidos);
    } else {
        res.status(404).json({ mensagem: 'Id não existente' });
    }
};

exports.listarPorCidade = (req, res) => {
    const cidade = req.params.cidade.toLowerCase();
    const resultado = clientes.filter(c => c.cidade.toLowerCase() === cidade);
    res.json(resultado);
};

exports.atualizarCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }

    const { nome, idade, cidade } = req.body;
    cliente.nome = nome || cliente.nome;
    cliente.idade = idade || cliente.idade;
    cliente.cidade = cidade || cliente.cidade;

    res.json(cliente);
};

exports.adicionarPedido = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);

    if (!cliente) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }

    const { codigo, produto, quantidade } = req.body;
    const pedido = { codigo, produto, quantidade };

    cliente.pedidos.push(pedido);

    res.status(201).json(pedido);
};

exports.removerCliente = (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(c => c.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }

    clientes.splice(indice, 1);

    res.json({ mensagem: 'Cliente removido com sucesso' });
};