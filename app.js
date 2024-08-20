document.addEventListener('DOMContentLoaded', () => {
    const clientForm = document.getElementById('clientForm');
    const productForm = document.getElementById('productForm');
    const orderForm = document.getElementById('orderForm');
    const clientsTableBody = document.querySelector('#clientsTable tbody');
    const productsTableBody = document.querySelector('#productsTable tbody');
    const ordersTableBody = document.querySelector('#ordersTable tbody');

    // Função para atualizar as tabelas
    function updateTable(tableBody, data, fields, deleteEndpoint) {
        tableBody.innerHTML = ''; // Limpa a tabela existente
        data.forEach(item => {
            const row = document.createElement('tr');
            fields.forEach(field => {
                const cell = document.createElement('td');
                cell.textContent = item[field];
                row.appendChild(cell);
            });

            // Cria botão de deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.addEventListener('click', async () => {
                if (confirm('Tem certeza que deseja deletar este item?')) {
                    try {
                        await fetch(`http://localhost:3000/${deleteEndpoint}/${item[fields[0]]}`, {
                            method: 'DELETE',
                        });
                        alert('Item deletado com sucesso!');
                        fetchData(deleteEndpoint, tableBody, fields, deleteEndpoint); // Atualiza a tabela após deletar
                    } catch (error) {
                        console.error(`Erro ao deletar ${deleteEndpoint}:`, error);
                    }
                }
            });
            const actionCell = document.createElement('td');
            actionCell.appendChild(deleteButton);
            row.appendChild(actionCell);

            tableBody.appendChild(row);
        });
    }

    // Função para buscar dados do servidor
    async function fetchData(endpoint, tableBody, fields, deleteEndpoint) {
        try {
            const response = await fetch(`http://localhost:3000/${endpoint}`);
            const data = await response.json();
            updateTable(tableBody, data, fields, deleteEndpoint);
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
            fetchData('clientes', clientsTableBody, ['id_cliente', 'nome_cliente', 'email', 'endereco'], 'clientes');
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
            fetchData('produtos', productsTableBody, ['id_produto', 'nome_produto', 'preco', 'categoria'], 'produtos');
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
            fetchData('pedidos', ordersTableBody, ['id_pedido', 'data_pedido', 'id_cliente', 'id_produto'], 'pedidos');
            orderForm.reset(); // Limpa o formulário
            alert('Pedido adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar pedido:', error);
        }
    });

    // Inicializa as tabelas com dados existentes
    fetchData('clientes', clientsTableBody, ['id_cliente', 'nome_cliente', 'email', 'endereco'], 'clientes');
    fetchData('produtos', productsTableBody, ['id_produto', 'nome_produto', 'preco', 'categoria'], 'produtos');
    fetchData('pedidos', ordersTableBody, ['id_pedido', 'data_pedido', 'id_cliente', 'id_produto'], 'pedidos');
});
