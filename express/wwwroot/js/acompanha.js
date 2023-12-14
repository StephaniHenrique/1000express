const urlBase = "http://localhost:8080";

$(document).ready(function () {
    var token = localStorage.getItem("token");
    fetch(urlBase + '/orders/' + localStorage.getItem('pedidoRecente'), {
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
            data = data.orderItemsList;
            var sub = document.getElementById('subtotal');
            sub.innerHTML = 'R$ ' + data[0].order.subtotal.toFixed(2);

            var total = document.getElementById('total');
            total.innerHTML = 'R$ ' + data[0].order.total.toFixed(2);
            var div = document.getElementById('div_desconto');
            if (data[0].order.discount != 0) {
                div.style.display = 'flex';

                var desconto = document.getElementById('desconto');
                desconto.innerHTML = '- R$ ' + data[0].order.discount.toFixed(2);
            } else {
                div.style.display = 'none';
            }

            var space = document.getElementById('lista_produtos');
            var html = '';
            for (i = 0; i < data.length; i++) {
                html += '<div><p>'+data[i].product.title+'</p> <p>'+data[i].quantity+'</p></div>';
            }

            space.innerHTML = html;
            
        })
        .catch(error => {
            window.location.href = '/';
            console.error('Erro durante a requisição:', error);
        });

    setTimeout(() => {
        document.getElementById("fase3").click();
    }, "2000");

    setTimeout(() => {
        document.getElementById("fase4").click();
        var button = document.getElementById('button_finaliza');
        button.disabled = false;
    }, "4000");

})

function finalizarPedido() {
    var token = localStorage.getItem("token");

    fetch(urlBase + '/orders/update', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: localStorage.getItem('pedidoRecente'),
            status: "Entregue",
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        })
        .then(data => {
                changeToEmpty();
        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
        })
}

function avaliarPedido() {
    var token = localStorage.getItem("token");
    var stars = document.querySelectorAll('input[type="radio"]:checked');
    stars = stars[0].id;
    stars = stars.split("-")[1];

    if (stars === 'empty') {
        starts = 0;
    } else {
        stars = parseInt(stars);
    }

    fetch(urlBase + '/orders/rate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            orderId: localStorage.getItem('pedidoRecente'),
            starRating: stars,
            note: document.getElementById("myTextarea").value,
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        })
        .then(data => {
            close_popup('fundo_avalia', 'popup_avalia')
        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
        })
}