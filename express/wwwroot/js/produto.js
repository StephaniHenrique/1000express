const urlBase = "http://localhost:8080";

$(document).ready(function () {
   var token = localStorage.getItem("token");
    fetch(urlBase+'/products', {
        method: 'GET',
       	headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json(); 
        })
        .then(data => {
			var html = '';

			for (let i = 0; i < data.length; i++) {
				const produto = data[i];

				html += '<div class="card">';
				html += '	<div class="img_card">';
				html += '		<img src="/src/cardapio_imagens' + produto.image + '" />';
				html += '        </div >';
				html += '       <div class="title">' + produto.title + '</div>';
				html += '        <div class="desc">' + produto.description + '</div>';
				html += '        <div class="flex">';
				html += '            <div class="valor">R$ ' + produto.value + '.00</div>';
				html += '            <div class="button" onclick="adiciona_produto(' + produto.productId + ')">Adicionar</div>';
				html += '        </div>';
				html += ' </div > '
			}

			var cards = document.getElementById("cards");

			cards.innerHTML = html;
        })
        .catch(error => {   
            console.error('Erro durante a requisição:', error);
        });
        

});


function adiciona_produto(id) {
	localStorage.setItem('produtoAdd', id);
	open_popup('fundo_Add_Pedido','popup_Add_Pedido')
}


function addProdutoCesta() {
	var idProduto = localStorage.getItem('produtoAdd');
	var email = localStorage.getItem('email');
	var token = localStorage.getItem('token');

	fetch(urlBase + '/carts/add', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userEmail: email,
			productId: idProduto,
		})
	})
		.then(response => {
			if (response.ok) {
				window.location.href = '/Cesta';
			} else {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			})
		.catch(error => {
			console.error('Erro ao enviar a requisição:', error);
		});
}