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
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json(); 
        })
        .then(data => {
            
        })
        .catch(error => {   
            console.error('Erro durante a requisição:', error);
        });
        */

	var data = [
		{
			"productId": 1,
			"title": "Batata Frita",
			"description": "Deliciosa batata frita, crocante por fora e macia por dentro. Uma explosão de sabor em cada mordida.",
			"value": 15.0,
			"image": "/3.png",
			"note": null
		},
		{
			"productId": 2,
			"title": "Tiras de Frango",
			"description": "Suculentas tiras de frango, perfeitas para petiscar. Uma combinação de texturas e temperos irresistíveis.",
			"value": 20.0,
			"image": "/2.png",
			"note": null
		},
		{
			"productId": 3,
			"title": "Tábua de Queijo",
			"description": "Seleção de queijos finos em uma elegante tábua de degustação. Uma experiência gourmet para os amantes de queijo.",
			"value": 20.0,
			"image": "/1.png",
			"note": null
		},
		{
			"productId": 4,
			"title": "Filé Mignon",
			"description": "Saboroso filé mignon preparado com maestria. Uma indulgência suculenta para os apreciadores de carne.",
			"value": 40.0,
			"image": "/4.png",
			"note": null
		},
		{
			"productId": 5,
			"title": "Carne Assada",
			"description": "Carne assada lentamente, desmanchando na boca. Uma explosão de sabores que aquece o coração.",
			"value": 40.0,
			"image": "/5.png",
			"note": null
		},
		{
			"productId": 6,
			"title": "Picanha",
			"description": "Picanha suculenta, um clássico da churrascaria. O sabor inconfundível que conquista paladares exigentes.",
			"value": 55.0,
			"image": "/6.png",
			"note": null
		},
		{
			"productId": 7,
			"title": "Lasanha",
			"description": "Camadas perfeitamente empilhadas de massa e molho. Uma viagem ao coração da culinária italiana.",
			"value": 35.0,
			"image": "/7.png",
			"note": null
		},
		{
			"productId": 8,
			"title": "Nhoque",
			"description": "Nhoque leve e macio, uma delícia italiana. Acompanhado de molho aromático, é como um abraço reconfortante.",
			"value": 32.0,
			"image": "/8.png",
			"note": null
		},
		{
			"productId": 9,
			"title": "Espaguete",
			"description": "Espaguete al dente com molho aromático. Uma clássica harmonia de texturas e sabores.",
			"value": 30.0,
			"image": "/9.png",
			"note": null
		},
		{
			"productId": 10,
			"title": "Rondelli",
			"description": "Rondelli recheado, uma explosão de sabores. Uma experiência única que conquista paladares sofisticados.",
			"value": 30.0,
			"image": "/10.png",
			"note": null
		},
		{
			"productId": 11,
			"title": "Salada Caesar",
			"description": "Salada Caesar fresca e crocante, com molho especial. Uma explosão de frescor em cada garfada.",
			"value": 36.0,
			"image": "/11.png",
			"note": null
		},
		{
			"productId": 12,
			"title": "Salada Tropical",
			"description": "Salada tropical colorida, com ingredientes frescos. Uma celebração de sabores vibrantes e saudáveis.",
			"value": 41.0,
			"image": "/12.png",
			"note": null
		},
		{
			"productId": 13,
			"title": "Salada do Chef",
			"description": "Salada do chef, uma combinação única de sabores. Uma experiência gastronômica que surpreende a cada garfada.",
			"value": 35.0,
			"image": "/13.png",
			"note": null
		},
		{
			"productId": 14,
			"title": "Misto Quente",
			"description": "Sanduíche misto quente, simples e reconfortante. Um clássico que nunca sai de moda.",
			"value": 10.0,
			"image": "/14.png",
			"note": null
		},
		{
			"productId": 15,
			"title": "X-Salada",
			"description": "Hamburguer suculento com queijo, alface e tomate. Uma explosão de sabores em cada mordida.",
			"value": 15.0,
			"image": "/15.png",
			"note": null
		},
		{
			"productId": 16,
			"title": "X-Burguer",
			"description": "Hamburguer clássico, uma opção irresistível. Sabor autêntico que agrada a todos os paladares.",
			"value": 20.0,
			"image": "/16.png",
			"note": null
		},
		{
			"productId": 17,
			"title": "X-Completao",
			"description": "Hamburguer completo com tudo que você deseja. Um banquete de sabores em cada mordida.",
			"value": 25.0,
			"image": "/17.png",
			"note": null
		},
		{
			"productId": 18,
			"title": "Empada Doce",
			"description": "Empada doce, uma sobremesa deliciosa. Uma explosão de doçura que conquista os amantes de doces.",
			"value": 15.0,
			"image": "/18.png",
			"note": null
		},
		{
			"productId": 19,
			"title": "Mousse de Chocolate",
			"description": "Mousse de chocolate cremoso, uma tentação. A indulgência perfeita para os amantes de chocolate.",
			"value": 18.0,
			"image": "/19.png",
			"note": null
		},
		{
			"productId": 20,
			"title": "Brownie",
			"description": "Brownie fudge, uma explosão de chocolate. Textura densa e sabor marcante para os apaixonados por chocolate.",
			"value": 25.0,
			"image": "/20.png",
			"note": null
		},
		{
			"productId": 21,
			"title": "Sorvete de Creme",
			"description": "Sorvete de creme, o clássico irresistível. Uma deliciosa pausa para refrescar o paladar.",
			"value": 10.0,
			"image": "/21.png",
			"note": null
		},
		{
			"productId": 22,
			"title": "Pink Lemonade",
			"description": "Refrescante pink lemonade, uma explosão de frutas. Uma bebida vibrante que desperta os sentidos.",
			"value": 9.0,
			"image": "/22.png",
			"note": null
		},
		{
			"productId": 23,
			"title": "Chá Gelado",
			"description": "Chá gelado, a bebida perfeita para se refrescar. Um gole de frescor em cada sorvo.",
			"value": 9.0,
			"image": "/23.png",
			"note": null
		},
		{
			"productId": 24,
			"title": "Suco de Laranja",
			"description": "Suco natural de laranja, cheio de vitaminas. Uma explosão cítrica que revitaliza o corpo.",
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
			"description": "Caipirinha refrescante, com limão e cachaça. Uma explosão de sabores brasileiros em cada gole.",
			"value": 24.0,
			"image": "/26.png",
			"note": null
		},
		{
			"productId": 27,
			"title": "Piña Colada",
			"description": "Piña colada, a bebida tropical e cremosa. Um drink exótico que transporta para paraísos ensolarados.",
			"value": 24.0,
			"image": "/27.png",
			"note": null
		}
	];
	var html = '';

	for (let i = 0; i < data.length; i++) {
		const produto = data[i];

		// Exemplo: Imprime o título de cada produto
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
