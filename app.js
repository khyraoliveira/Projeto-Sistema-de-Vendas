document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('clientForm');
    const productForm = document.getElementById('productForm');
    const orderForm = document.getElementById('orderForm');
    const clientsTableBody = document.querySelector('#clientsTable tbody');
    const productsTableBody = document.querySelector('#productsTable tbody');
    const ordersTableBody = document.querySelector('#ordersTable tbody');

    // Função para atualizar as tabelas
    function updateTable(tableBody, data, fields) {
        tableBody.innerHTML = ''; // Limpa a tabela existente
        data.forEach(item => {
            const row = document.createElement('tr');
            fields.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = item[field];
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }

    // Função para buscar dados do servidor
    async function fetchData(endpoint, tableBody, fields) {
        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`);
            const data = await response.json();
            updateTable(tableBody, data, fields);
        } catch (error) {
            console.error(`Erro ao buscar ${endpoint}:`, error);
        }
    }

    // Adiciona um novo cliente
    clientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(clientForm);
        const data = {
            nome_cliente: formData.get('nome_cliente'),
            email: formData.get('email'),
            endereco: formData.get('endereco')
        };

        try {
            await fetch('http://localhost:3000/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            clientForm.reset(); // Limpa o formulário após a inserção
            fetchData('clientes', clientsTableBody, ['id_cliente', 'nome_cliente', 'email', 'endereco']);
            alert('Cliente adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar cliente:', error);
        }
    });

    // Adiciona um novo produto
    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(productForm);
        const data = {
            nome_produto: formData.get('nome_produto'),
            preco: parseFloat(formData.get('preco')),
            categoria: formData.get('categoria')
        };

        try {
            await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            productForm.reset(); // Limpa o formulário após a inserção
            fetchData('produtos', productsTableBody, ['id_produto', 'nome_produto', 'preco', 'categoria']);
            alert('Produto adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar produto:', error);
        }
    });

    // Adiciona um novo pedido
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(orderForm);
        const data = {
            data_pedido: formData.get('data_pedido'),
            id_cliente: parseInt(formData.get('id_cliente')),
            id_produto: parseInt(formData.get('id_produto'))
        };

        try {
            await fetch('http://localhost:3000/pedidos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            fetchData('pedidos', ordersTableBody, ['id_pedido', 'data_pedido', 'id_cliente', 'id_produto']);
            orderForm.reset(); // Limpa o formulário
            alert('Pedido adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
        }
    });

    // Inicializa as tabelas com dados existentes
    fetchData('clientes', clientsTableBody, ['id_cliente', 'nome_cliente', 'email', 'endereco']);
    fetchData('produtos', productsTableBody, ['id_produto', 'nome_produto', 'preco', 'categoria']);
    fetchData('pedidos', ordersTableBody, ['id_pedido', 'data_pedido', 'id_cliente', 'id_produto']);
});
