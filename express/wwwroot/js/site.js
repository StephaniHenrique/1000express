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

$('.steps').on('click', '.step--active', function () {
    $(this).removeClass('step--incomplete').addClass('step--complete');
    $(this).removeClass('step--active').addClass('step--inactive');
    $(this).next().removeClass('step--inactive').addClass('step--active');
});


/*--VOLTA--*/

$('.steps').on('click', '.step--complete', function () {
    $(this).removeClass('step--complete').addClass('step--incomplete');
    $(this).removeClass('step--inactive').addClass('step--active');
    $(this).nextAll().removeClass('step--complete').addClass('step--incomplete');
    $(this).nextAll().removeClass('step--active').addClass('step--inactive');
});


document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});

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

    if (popup == "popup_Rem_Pedido") {
        var button = this.id;
        localStorage.setItem("idProduto", button.id);
    }
}

function aumenta(number) {
    var qtde = document.getElementById('number');
    var number = parseInt(qtde.textContent);
    number++;
    qtde.innerText = number;
}

function diminui(number) {
    var qtde = document.getElementById('number');
    var number = parseInt(qtde.textContent);

    if (number < 2) {
        number = 1;
    } else {
        number--;
    }
    qtde.innerText = number;
}

function remove_item() {
    var id_produto = localStorage.getItem("idProduto");
    var div = document.getElementById("produto_" + id_produto);
    div.remove();
    close_popup('fundo_Rem_Pedido', 'popup_Rem_Pedido');
}

function estende(id) {
    var elemento = document.getElementById(id);
    var button = document.getElementById("button_" + id)
    var seta = document.getElementById("chevron_" + id);

    if (elemento.offsetHeight == 0) {
        elemento.style.display = 'flex';

        setTimeout(function () {
            elemento.style.height = '40px';
            button.style.fontSize = "25px";
        }, 300);

        seta.style.transform = "rotate(185deg)";
    } else {
        elemento.style.height = '0px';
        button.style.fontSize = "0px";


        var frete = document.getElementById('result_frete');
        frete.style.transform = "scaleY(0)";


        setTimeout(function () {
            elemento.style.display = 'none';

            frete.style.display = 'none';
        }, 300);

        seta.style.transform = "rotate(0deg)";

    }
}

function verifica_cep() {
    var frete = document.getElementById('result_frete');
    if (frete.offsetHeight == 0) {

        frete.style.display = 'flex';
        setTimeout(function () {
            frete.style.transform = "scaleY(1)";
        }, 300);
    } 
}

function verifica_cupom() {
    var frete = document.getElementById('desconto_concedido');
    if (frete.offsetHeight == 0) {

        frete.style.display = 'flex';
        setTimeout(function () {
            frete.style.transform = "scaleY(1)";
        }, 300);
    }
}