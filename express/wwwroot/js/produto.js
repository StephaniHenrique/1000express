const urlBase = "http://192.168.15.5:8080";

$(document).ready(function () {
   /* var token = localStorage.getItem("token");

    fetch('/products', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisi��o: ${response.status} - ${response.statusText}`);
            }

            return response.json(); 
        })
        .then(data => {
            
        })
        .catch(error => {   
            console.error('Erro durante a requisi��o:', error);
        });
        */

	var data = [
		{
			"productId": 1,
			"title": "Batata Frita",
			"description": "Deliciosa batata frita, crocante por fora e macia por dentro. Uma explos�o de sabor em cada mordida.",
			"value": 15.0,
			"image": "/3.png",
			"note": null
		},
		{
			"productId": 2,
			"title": "Tiras de Frango",
			"description": "Suculentas tiras de frango, perfeitas para petiscar. Uma combina��o de texturas e temperos irresist�veis.",
			"value": 20.0,
			"image": "/2.png",
			"note": null
		},
		{
			"productId": 3,
			"title": "T�bua de Queijo",
			"description": "Sele��o de queijos finos em uma elegante t�bua de degusta��o. Uma experi�ncia gourmet para os amantes de queijo.",
			"value": 20.0,
			"image": "/1.png",
			"note": null
		},
		{
			"productId": 4,
			"title": "Fil� Mignon",
			"description": "Saboroso fil� mignon preparado com maestria. Uma indulg�ncia suculenta para os apreciadores de carne.",
			"value": 40.0,
			"image": "/4.png",
			"note": null
		},
		{
			"productId": 5,
			"title": "Carne Assada",
			"description": "Carne assada lentamente, desmanchando na boca. Uma explos�o de sabores que aquece o cora��o.",
			"value": 40.0,
			"image": "/5.png",
			"note": null
		},
		{
			"productId": 6,
			"title": "Picanha",
			"description": "Picanha suculenta, um cl�ssico da churrascaria. O sabor inconfund�vel que conquista paladares exigentes.",
			"value": 55.0,
			"image": "/6.png",
			"note": null
		},
		{
			"productId": 7,
			"title": "Lasanha",
			"description": "Camadas perfeitamente empilhadas de massa e molho. Uma viagem ao cora��o da culin�ria italiana.",
			"value": 35.0,
			"image": "/7.png",
			"note": null
		},
		{
			"productId": 8,
			"title": "Nhoque",
			"description": "Nhoque leve e macio, uma del�cia italiana. Acompanhado de molho arom�tico, � como um abra�o reconfortante.",
			"value": 32.0,
			"image": "/8.png",
			"note": null
		},
		{
			"productId": 9,
			"title": "Espaguete",
			"description": "Espaguete al dente com molho arom�tico. Uma cl�ssica harmonia de texturas e sabores.",
			"value": 30.0,
			"image": "/9.png",
			"note": null
		},
		{
			"productId": 10,
			"title": "Rondelli",
			"description": "Rondelli recheado, uma explos�o de sabores. Uma experi�ncia �nica que conquista paladares sofisticados.",
			"value": 30.0,
			"image": "/10.png",
			"note": null
		},
		{
			"productId": 11,
			"title": "Salada Caesar",
			"description": "Salada Caesar fresca e crocante, com molho especial. Uma explos�o de frescor em cada garfada.",
			"value": 36.0,
			"image": "/11.png",
			"note": null
		},
		{
			"productId": 12,
			"title": "Salada Tropical",
			"description": "Salada tropical colorida, com ingredientes frescos. Uma celebra��o de sabores vibrantes e saud�veis.",
			"value": 41.0,
			"image": "/12.png",
			"note": null
		},
		{
			"productId": 13,
			"title": "Salada do Chef",
			"description": "Salada do chef, uma combina��o �nica de sabores. Uma experi�ncia gastron�mica que surpreende a cada garfada.",
			"value": 35.0,
			"image": "/13.png",
			"note": null
		},
		{
			"productId": 14,
			"title": "Misto Quente",
			"description": "Sandu�che misto quente, simples e reconfortante. Um cl�ssico que nunca sai de moda.",
			"value": 10.0,
			"image": "/14.png",
			"note": null
		},
		{
			"productId": 15,
			"title": "X-Salada",
			"description": "Hamburguer suculento com queijo, alface e tomate. Uma explos�o de sabores em cada mordida.",
			"value": 15.0,
			"image": "/15.png",
			"note": null
		},
		{
			"productId": 16,
			"title": "X-Burguer",
			"description": "Hamburguer cl�ssico, uma op��o irresist�vel. Sabor aut�ntico que agrada a todos os paladares.",
			"value": 20.0,
			"image": "/16.png",
			"note": null
		},
		{
			"productId": 17,
			"title": "X-Completao",
			"description": "Hamburguer completo com tudo que voc� deseja. Um banquete de sabores em cada mordida.",
			"value": 25.0,
			"image": "/17.png",
			"note": null
		},
		{
			"productId": 18,
			"title": "Empada Doce",
			"description": "Empada doce, uma sobremesa deliciosa. Uma explos�o de do�ura que conquista os amantes de doces.",
			"value": 15.0,
			"image": "/18.png",
			"note": null
		},
		{
			"productId": 19,
			"title": "Mousse de Chocolate",
			"description": "Mousse de chocolate cremoso, uma tenta��o. A indulg�ncia perfeita para os amantes de chocolate.",
			"value": 18.0,
			"image": "/19.png",
			"note": null
		},
		{
			"productId": 20,
			"title": "Brownie",
			"description": "Brownie fudge, uma explos�o de chocolate. Textura densa e sabor marcante para os apaixonados por chocolate.",
			"value": 25.0,
			"image": "/20.png",
			"note": null
		},
		{
			"productId": 21,
			"title": "Sorvete de Creme",
			"description": "Sorvete de creme, o cl�ssico irresist�vel. Uma deliciosa pausa para refrescar o paladar.",
			"value": 10.0,
			"image": "/21.png",
			"note": null
		},
		{
			"productId": 22,
			"title": "Pink Lemonade",
			"description": "Refrescante pink lemonade, uma explos�o de frutas. Uma bebida vibrante que desperta os sentidos.",
			"value": 9.0,
			"image": "/22.png",
			"note": null
		},
		{
			"productId": 23,
			"title": "Ch� Gelado",
			"description": "Ch� gelado, a bebida perfeita para se refrescar. Um gole de frescor em cada sorvo.",
			"value": 9.0,
			"image": "/23.png",
			"note": null
		},
		{
			"productId": 24,
			"title": "Suco de Laranja",
			"description": "Suco natural de laranja, cheio de vitaminas. Uma explos�o c�trica que revitaliza o corpo.",
			"value": 10.0,
			"image": "/24.png",
			"note": null
		},
		{
			"productId": 25,
			"title": "Suco de Abacaxi",
			"description": "Suco refrescante de abacaxi, tropical e delicioso. Uma viagem aos sabores tropicais em cada gole.",
			"value": 10.0,
			"image": "/25.png",
			"note": null
		},
		{
			"productId": 26,
			"title": "Caipirinha",
			"description": "Caipirinha refrescante, com lim�o e cacha�a. Uma explos�o de sabores brasileiros em cada gole.",
			"value": 24.0,
			"image": "/26.png",
			"note": null
		},
		{
			"productId": 27,
			"title": "Pi�a Colada",
			"description": "Pi�a colada, a bebida tropical e cremosa. Um drink ex�tico que transporta para para�sos ensolarados.",
			"value": 24.0,
			"image": "/27.png",
			"note": null
		}
	];
	var html = '';

	for (let i = 0; i < data.length; i++) {
		const produto = data[i];

		// Exemplo: Imprime o t�tulo de cada produto
		console.log(`Produto ${i + 1}: ${produto.title}`);

		html += '<div class="card">';
		html += '	<div class="img_card">';
		html += '		<img src="/src/cardapio_imagens' + produto.image + '" />';
		html += '        </div >';
		html += '       <div class="title">' + produto.title + '</div>';
		html += '        <div class="desc">' + produto.description + '</div>';
		html += '        <div class="flex">';
		html += '            <div class="valor">R$ ' + produto.value + '</div>';
		html += '            <div class="button" onclick="adiciona_produto('+produto.id+')">Adicionar</div>';
		html += '        </div>';
		html += ' </div > '
	}

	var cards = document.getElementById("cards");

	cards.innerHTML = html;

	console.log(data);
});


function adiciona_produto(id) {
	localStorage.setItem('produtoAdd', id);
	open_popup('fundo_Add_Pedido','popup_Add_Pedido')
}
