$('.steps').on('click', '.step--active', function () {
    $(this).removeClass('step--incomplete').addClass('step--complete');
    $(this).removeClass('step--active').addClass('step--inactive');
    $(this).next().removeClass('step--inactive').addClass('step--active');
});

$('.steps').on('click', '.step--complete', function () {
    $(this).removeClass('step--complete').addClass('step--incomplete');
    $(this).removeClass('step--inactive').addClass('step--active');
    $(this).nextAll().removeClass('step--complete').addClass('step--incomplete');
    $(this).nextAll().removeClass('step--active').addClass('step--inactive');
});

function pedido_entregue() {
    content = document.getElementById("acompanha");
    empty = document.getElementById("entregue");
    console.log(empty);
    content.style.display = "none";
    empty.style.display = "flex";
    setTimeout(() => { empty.style.transform = "scale(1)"; }, 100);
}

function changeToEmpty() {
    content = document.getElementById("content");
    empty = document.getElementById("empty");
    console.log(empty);
    content.style.display = "none";
    empty.style.display = "flex";
    setTimeout(() => { empty.style.transform = "scale(1)"; }, 100);
}

function change_content() {
    content = document.getElementById("profile");
    empty = document.getElementById("edit_profile");
    console.log(empty);
    content.style.display = "none";
    empty.style.display = "initial";
    setTimeout(() => { empty.style.transform = "scale(1)"; }, 100);
}

function change_content_pag(id, apagar) {
    content = document.getElementById("content_"+id);
    segunda_op = document.getElementById("content_" + apagar);
    empty = document.getElementById("content_image");

    empty.style.transform = "scale(0)";
    segunda_op.style.transform = "scale(0)";

    setTimeout(() => {
         empty.style.display = "none";
        segunda_op.style.display = "none";

        content.style.display = "flex"; 
    }, 200);
    

    setTimeout(() => {
        content.style.transform = "scale(1)";
    }, 200);
}

function back_content() {
    content = document.getElementById("edit_profile");
    empty = document.getElementById("profile");
    console.log(empty);
    content.style.display = "none";
    empty.style.display = "initial";
    setTimeout(() => { empty.style.transform = "scale(1)"; }, 100);
}

function scrollToDiv(divId) {
    var targetElement = document.getElementById(divId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function abrirPDF() {
    var caminhoPDF = '/src/cardapiopdf.pdf';

    window.open(caminhoPDF, '_blank');
}

function close_popup(fundo, popup) {
    var fundo = document.getElementById(fundo);
    var card = document.getElementById(popup);

    card.style.transform = 'scale(0)';
    fundo.style.background = 'transparent';
    setTimeout(function () {
        fundo.style.display = 'none';
    }, 300);

    if (popup == 'popup_avalia') {
        window.location.href = 'Index';
    }
}

function open_popup(fundo, popup) {
    var fundo = document.getElementById(fundo);
    var card = document.getElementById(popup);


    fundo.style.display = 'flex';

    setTimeout(function () {
        card.style.transform = 'scale(1)';
        fundo.style.background = '#000000b0';
    }, 300);

}

function produto_deleter(id) {
    localStorage.setItem('itemDeletar', id);
    open_popup('fundo_Rem_Pedido', 'popup_Rem_Pedido');
}

function estende(id) {
    var elemento = document.getElementById(id);
    var button = document.getElementById("button_" + id)
    var seta = document.getElementById("chevron_" + id);

    if (elemento.offsetHeight == 0) {
        elemento.style.opacity = 0;
        elemento.style.display = 'flex';

        setTimeout(function () {
            if (id == 'frete') {
                elemento.style.height = '130px';
            } else {
                elemento.style.height = '40px';

            }
            button.style.fontSize = "25px";
        }, 300);

        setTimeout(function () {
            elemento.style.opacity=1
        }, 350);

        seta.style.transform = "rotate(185deg)";
    } else {
        elemento.style.opacity = 0;
        elemento.style.height = '0px';
        button.style.fontSize = "0px";


        setTimeout(function () {
            elemento.style.display = 'none';

            frete.style.display = 'none';
        }, 300);

        seta.style.transform = "rotate(0deg)";

    }
}


function confirmar_pagamento() {
    var token = localStorage.getItem('token');

    fetch(urlBase + '/orders/create', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({
            subtotal: parseFloat(localStorage.getItem('subtotal')),
            tax: 10,
            total: parseFloat(localStorage.getItem('valorTotal')),
            discount: localStorage.getItem('desconto') ? parseFloat(localStorage.getItem('desconto')) : 0,
            status: "Andamento",
            userEmail: localStorage.getItem('email'),
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        })
        .then(data => {
            localStorage.setItem('pedidoRecente', data.orderId);
            window.location.href = '/Pedido/Acompanha';
        })
        .catch(error => {
            console.error('Erro ao enviar a requisição:', error);
        });
}


function logout() {
    localStorage.clear();
    window.location.href = '/';
}

