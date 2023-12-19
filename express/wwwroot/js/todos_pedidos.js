const urlBase = "http://localhost:8080";

$(document).ready(function () {

   
    var token = localStorage.getItem("token");
    fetch(urlBase + '/orders/all', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('email'),
    })
        .then(response => {
            if (!response.ok) {
                console.log('oi');
                //window.location.href = '/';
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        })
        .then(data => {
            var pedidosJson = data.orderResponses;
            
            var html1 = '';
            var html = '';
            var pedidos = document.getElementById('pedidos');
            if (pedidosJson.length != 0) {
                for (i = 0; i < pedidosJson.length; i++) {
                    var items = data.orderItemsList[i];
                    var titulo = '';
                    for (j = 0; j < items.length; j++) {
                        if (j == items.length - 1) {
                            titulo += items[j].product.title;
                        } else {
                            titulo += items[j].product.title + ', ';
                        }
                    }

                    var date = new Date(pedidosJson[i].date);
                    var dia = date.getDate();
                    var nomeMes = new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(date);
                    var ano = date.getFullYear();
                    var dataFormatada = dia + ' ' + nomeMes + ' ' + ano;
                    if (pedidosJson[i].status === 'Andamento') {
                        html1 += ' <div class="card_pedido">';
                        html1 += '     <div>';
                        html1 += '         <div class="title">Data</div>';
                        html1 += '         <div class="info">' + dataFormatada + '</div>';
                        html1 += '    </div>';
                        html1 += '    <div>';
                        html1 += '        <div class="title">Itens</div>';
                        html1 += '        <div class="info_small">' + titulo + '</div>';
                        html1 += '    </div>';
                        html1 += '    <div>';
                        html1 += '        <div class="title">Total</div>';
                        html1 += '        <div class="info">R$ ' + parseFloat(pedidosJson[i].total).toFixed(2) + '</div>';
                        html1 += '    </div>';
                        html1 += '    <div>';
                        html1 += '        <div class="title">Status</div>';
                        html1 += '        <div class="status ' + pedidosJson[i].status + '">' + pedidosJson[i].status + '</div>';
                        html1 += '    </div>';
                        html1 += '    <i class="fa-solid fa-chevron-right" style="cursor: pointer;" onclick="sobre_pedido(' + pedidosJson[i].orderId + ',\'' + pedidosJson[i].status + '\')"></i>';
                        html1 += '</div>';
                    } else {
                        html += ' <div class="card_pedido">';
                        html += '     <div>';
                        html += '         <div class="title">Data</div>';
                        html += '         <div class="info">' + dataFormatada + '</div>';
                        html += '    </div>';
                        html += '    <div>';
                        html += '        <div class="title">Itens</div>';
                        html += '        <div class="info_small">' + titulo + '</div>';
                        html += '    </div>';
                        html += '    <div>';
                        html += '        <div class="title">Total</div>';
                        html += '        <div class="info">R$ ' + parseFloat(pedidosJson[i].total).toFixed(2) + '</div>';
                        html += '    </div>';
                        html += '    <div>';
                        html += '        <div class="title">Status</div>';
                        html += '        <div class="status ' + pedidosJson[i].status + '">' + pedidosJson[i].status + '</div>';
                        html += '    </div>';
                        html += '    <i class="fa-solid fa-chevron-right" style="cursor: pointer;" onclick="sobre_pedido(' + pedidosJson[i].orderId + ',\'' + pedidosJson[i].status + '\')"></i>';
                        html += '</div>';
                    }
                }
            } else {
                html = '<div style="margin-top: 40px; font-size: 18px; height: 300px;">Entre no delivery para fazer seu primeiro pedido</div>';
            }
            pedidos.innerHTML = html1+html;

        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
        })

})


function sobre_pedido(id, status) {
    if (status === 'Andamento') {
        localStorage.setItem('pedidoRecente', id);
        window.location.href = '/Pedido/acompanha';
    } else {
        preenche_popup(id);
    }
}


function preenche_popup(id) {
    var token = localStorage.getItem("token");
    fetch(urlBase + '/orders/' + id, {
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
                html += '<div class="produto" style="border:none; padding:5px;"><div class="primeira_metade" style="gap:5px">';
                html += '        <div class="title">' + data[i].product.title + '</div>';
                html += '        <div class="desc" style="font-size:12px">Qtde: '+data[i].quantity+'</div>';          
                html += '    </div>';
                html += '    <div class="segunda">R$ ' + parseFloat(data[i].product.value).toFixed(2) + '</div></div>';
            }

            space.innerHTML = html;
            open_popup('fundo_pedido_detalhe', 'popup_pedido_detalhe');

        })
        .catch(error => {
            console.error('Erro durante a requisição:', error);
        });
}

//open_popup(\'fundo_pedido_detalhe\', \'popup_pedido_detalhe\')