const urlBase = "http://localhost:8080";

var funcaoChamada = false;



$(document).ready(function () {

	var token = localStorage.getItem("token");
	var userEmail = localStorage.getItem("email");

	fetch(urlBase + '/carts', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: userEmail 
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
			}

			return response.json();
		})
		.then(data => {

			var html = '';
			var produtos = data['products'];
			if (produtos.length != 0) {
				var qtde = data['quantities'];

				for (let i = 0; i < produtos.length; i++) {
					const produto = produtos[i];
					var valor = produto.value * qtde[i];

					html += '<div class="produto" id="produto_' + produto.productId + '">'; 
					html += '	<div class="flex">'; 
					html += '		<div class="produtoImg">'; 
					html += '			<img src="/src/cardapio_imagens'+produto.image+'" />';
					html += '		</div>';
					html += '		<div class="info_produto">';
					html += '			<div class="title">'+produto.title+'</div';
					html += '			<div class="obs">'+produto.note+'</div';
					html += '		</div>';
					html += '	</div>';
					html += '	<div class="qtde">';
					html += '		<button onclick="diminui(' + produto.productId + ')"><i class="fas fa-minus"></i></button> <div id="' + produto.productId + '">'+qtde[i]+'</div> <button onclick="aumenta('+produto.productId+')"><i class="fas fa-plus"></i></button>';
					html += '	</div>';
					html += '	<div class="valor">';
					html += '		R$ <div id="valor' + produto.productId + '">' + valor.toFixed(2) +'</div>';
					html += '	</div>';
					html += '	<div class="circle" onclick="produto_deleter(' + produto.productId + ')"><i class="fa-solid fa-trash"></i></div>';
					html += '</div>';
				}
			}else {
				html += '<div style="margin-top: 40px; font-size: 18px">Entre no delivery para fazer seu primeiro pedido</div>';
			}

			var produtos = document.getElementById("produtos");
			produtos.innerHTML = html;

			calcula_subtotal();
		})
		.catch(error => {

			window.location.href = '/';
			console.error('Erro durante a requisição:', error);
		});


});

function aumenta(number) {
	var token = localStorage.getItem('token');
	var email = localStorage.getItem('email');

	var numero = document.getElementById(number);
	var valor = document.getElementById('valor' + number);
	var valorTexto = parseFloat(valor.textContent);

	var qtde = parseFloat(numero.textContent);

	fetch(urlBase + '/carts/add', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userEmail: email,
			productId: number,
		})
	})
		.then(response => {
			if (response.ok) {

				valorTexto = valorTexto / qtde;

				qtde++;
				valorTexto = valorTexto * qtde;
				valor.innerHTML = valorTexto.toFixed(2);
				numero.innerText = qtde;

				calcula_subtotal();
			} else {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		})
		.catch(error => {
			console.error('Erro ao enviar a requisição:', error);
		});
}

function diminui(number) {

	var token = localStorage.getItem('token');
	var email = localStorage.getItem('email');

    var qtde = document.getElementById(number);
	var qtdeText = parseFloat(qtde.textContent);

	var valor = document.getElementById('valor' + number);
	var valorTexto = parseFloat(valor.textContent);

	if (qtdeText > 1) {
		fetch(urlBase + '/carts/subtract', {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userEmail: email,
				productId: number,
			})
		})
			.then(response => {
				if (response.ok) {

					valorTexto = valorTexto / qtdeText;

					qtdeText--;
					valorTexto = valorTexto * qtdeText;
					valor.innerHTML = valorTexto.toFixed(2);
					qtde.innerText = qtdeText;

					calcula_subtotal();
				} else {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
			})
			.catch(error => {
				console.error('Erro ao enviar a requisição:', error);
			});
	} 
    
}

function remove_item() {
	var id_produto = localStorage.getItem("itemDeletar");
	var div = document.getElementById("produto_" + id_produto);

	var email = localStorage.getItem("email");
	var token = localStorage.getItem("token");

	fetch(urlBase + '/carts/delete', {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userEmail: email,
			productId: id_produto,
		})
	})
		.then(response => {
			if (response.ok) {
				console.log(response);
				close_popup('fundo_Rem_Pedido', 'popup_Rem_Pedido');
				div.remove();
				calcula_subtotal();
				verifica_cupom();
			} else {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		})
		.catch(error => {
			console.error('Erro ao enviar a requisição:', error);
		});
}

function calcula_subtotal() {
	var valores = document.querySelectorAll(".valor");

	var subtotal = 0;

	valores.forEach(valor => {
		valor = valor.textContent;
		valor = valor.split(' ')[1];
		valor = parseFloat(valor);
		subtotal += valor;
	
	});

	var text_value = document.getElementById('valor_subtotal');
	text_value.innerHTML = 'R$ ' + subtotal.toFixed(2);

	calcula_total();
}

function verifica_cep() {
	var cep = document.getElementById('cep').value;
	cep = cep.replace(/\D/g, '');

	// Verificar se o CEP possui o formato correto
	var cepRegex = /^[0-9]{8}$/;
	if (!cepRegex.test(cep)) {
		alert('CEP inválido. Insira um CEP com 8 dígitos numéricos.');
		return;
	}

	// Limpar os campos antes de fazer a nova requisição
	document.getElementById('log').value = '';

	fetch(`https://viacep.com.br/ws/${cep}/json/`)
		.then(response => response.json())
		.then(data => {
			if (!data.erro) {
				document.getElementById('log').value = data.logradouro;
				if (document.getElementById('num').value === '') {
					document.getElementById('num').focus();
				} else {
					desbloqueiaPedido();
				}
			
			} else {
				alert('CEP não encontrado');
			}
		})
		.catch(error => {
			console.error('Erro na requisição:', error);
		});
}

function verifica_input() {
	var cep = document.getElementById('cep').value;
	cep = cep.replace(/\D/g, '');
	if (cep != '' && document.getElementById('log').value != '' && document.getElementById('num').value != '') {
		var cepRegex = /^[0-9]{8}$/;
		if (!cepRegex.test(cep)) {
			alert('CEP inválido. Insira um CEP com 8 dígitos numéricos.');
			bloqueia();
			return;
		}
		desbloqueiaPedido();
	} else {
		bloqueia();
	}
}

function desbloqueiaPedido() {
	var button = document.getElementById("botao_continuar");

	var frete = document.getElementById('result_frete');
	if (frete.offsetHeight == 0) {

		frete.style.display = 'flex';
		setTimeout(function () {
			frete.style.transform = "scaleY(1)";

			button.disabled = false;
		}, 300);
	}

	calcula_total();
}

function bloqueia() {
	var button = document.getElementById("botao_continuar");
	button.disabled = true;

	var frete = document.getElementById('result_frete');
	frete.style.transform = "scaleY(0)";

	setTimeout(function () {
		frete.style.display = 'none';
	}, 300);

	calcula_total();
}

function calcula_total() {
	var valor = document.getElementById('valor_subtotal').textContent;
	valor = valor.split(' ')[1];
	valor = parseFloat(valor);

	var frete = document.getElementById("result_frete");
	var freteDisplay = window.getComputedStyle(frete).getPropertyValue('display');

	var total = document.getElementById('total_pedido');

	if (freteDisplay != 'none') {
		valor += 10;
	}

	var cupom = document.getElementById('desconto_concedido');
	var cupomDisplay = window.getComputedStyle(cupom).getPropertyValue('display');

	if (cupomDisplay != 'none') {
		var desconto = document.getElementById('valor_desconto').textContent;
		desconto = desconto.split(' ')[1];
		desconto = parseFloat(desconto);
		valor = valor-desconto;
	}

	total.innerHTML = 'R$ ' + valor.toFixed(2);
}

function verifica_cupom() {
	var desconto = document.getElementById('valor_desconto');
	var cupom = document.getElementById('desconto_concedido');
	var codigo = document.getElementById('codigo_cupom').value;

	if (codigo === '1000EXPRESS') {
		if (cupom.offsetHeight == 0) {

			cupom.style.display = 'flex';
			setTimeout(function () {
				cupom.style.transform = "scaleY(1)";
			}, 300);

			var valor = document.getElementById('valor_subtotal').textContent;
			valor = valor.split(' ')[1];
			valor = parseFloat(valor);
			valor = valor * 0.15;
			desconto.innerHTML = '-R$ ' + valor.toFixed(2);
		}
	} else if (codigo === 'NATAL50') {
		if (cupom.offsetHeight == 0) {

			cupom.style.display = 'flex';
			setTimeout(function () {
				cupom.style.transform = "scaleY(1)";
			}, 300);

			var valor = document.getElementById('valor_subtotal').textContent;
			valor = valor.split(' ')[1];
			valor = parseFloat(valor);
			valor = valor * 0.50;
			desconto.innerHTML = '-R$ ' + valor.toFixed(2);
		}
	} else if (codigo === 'MEGASALE30') {
		if (cupom.offsetHeight == 0) {

			cupom.style.display = 'flex';
			setTimeout(function () {
				cupom.style.transform = "scaleY(1)";
			}, 300);

			var valor = document.getElementById('valor_subtotal').textContent;
			valor = valor.split(' ')[1];
			valor = parseFloat(valor);
			valor = valor * 0.30;
			desconto.innerHTML = '-R$ ' + valor.toFixed(2);
		}
	} else if (codigo === 'BURGUER OFF') {
		var burguer = false;
		var produtos = document.querySelectorAll('.produto');

		for (i = 0; i < produtos.length; i++) {
			if (produtos[i].id === "produto_17") {
				burguer = true;
			}
		}

		if (burguer) {
			if (cupom.offsetHeight == 0) {

				cupom.style.display = 'flex';
				setTimeout(function () {
					cupom.style.transform = "scaleY(1)";
				}, 300);


				valor = 20;
				desconto.innerHTML = '-R$ ' + valor.toFixed(2);
			}
		} else {
			alert('Cupom válida apenas para a compra de um X-completão');
			valor = 0;
			desconto.innerHTML = '-R$ ' + valor.toFixed(2);
		}
	} else if (codigo === 'BTT10%') {
		var batata = false;
		var produtos = document.querySelectorAll('.produto');
		console.log(produtos);
		for (i = 0; i < produtos.length; i++) {
			console.log(produtos[i].id);
			if (produtos[i].id === "produto_1") {
				batata = true;
			}
		}

		if (batata) {
			if (cupom.offsetHeight == 0) {

				cupom.style.display = 'flex';
				setTimeout(function () {
					cupom.style.transform = "scaleY(1)";
				}, 300);


				var valor = document.getElementById('valor_subtotal').textContent;
				valor = valor.split(' ')[1];
				valor = parseFloat(valor);
				valor = valor * 0.10;
				desconto.innerHTML = '-R$ ' + valor.toFixed(2);
			}
		} else {
			alert('Cupom válida apenas para a compra de batata-frita');
			valor = 0;
			desconto.innerHTML = '-R$ ' + valor.toFixed(2);
		}
	} 

	calcula_total();
}

function avanca_pedido() {
	var cupom = document.getElementById('desconto_concedido');
	var cupomDisplay = window.getComputedStyle(cupom).getPropertyValue('display');

	if (cupomDisplay != 'none') {
		var desconto = document.getElementById('valor_desconto').textContent;
		desconto = desconto.split(' ')[1];
		desconto = parseFloat(desconto);
		localStorage.setItem('desconto', desconto);
	} else {
		localStorage.setItem('desconto', 0);
	}

	var valor = document.getElementById('valor_subtotal').textContent;
	valor = valor.split(' ')[1];
	valor = parseFloat(valor);
	localStorage.setItem('subtotal', valor);

	var valorTotal = document.getElementById('total_pedido').textContent;
	valorTotal = valorTotal.split(' ')[1];
	valorTotal = parseFloat(valorTotal);
	localStorage.setItem('valorTotal', valorTotal);


	window.location.href = '/Pedido/pagamento';
}