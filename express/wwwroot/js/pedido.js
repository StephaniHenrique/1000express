const urlBase = "http://localhost:8080";
$(document).ready(function () {

    var token = localStorage.getItem("token");
    var userEmail = localStorage.getItem("email");

    fetch(urlBase + '/user/getUser', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body:localStorage.getItem("email")
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisi��o: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        }).catch(error => {

            window.location.href = '/';
            console.error('Erro durante a requisi��o:', error);
        });
});

function verificaCartao(id) {
    var elemento = document.getElementById(id);
    var textoElemento = elemento.value;
    var button = document.getElementById("button_confirm");
    var desbloqueia = true;
    var texto = document.getElementById('invalid_' + id);

    if (textoElemento != '' && textoElemento != null) {
        if (id === 'cpf') {
            if (!validarCPF(textoElemento)) {      
                desbloqueia = false;
            }
        }

        if (id === 'cartao') {
            if (!/^\d{16}$/.test(textoElemento)) {   
                desbloqueia = false;
            }
        }

        if (id === 'val') {
            const validadeRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!validadeRegex.test(textoElemento)) {
                desbloqueia = false;
            }
        }

        if (!desbloqueia) {
            texto.style.display = 'flex';
            elemento.classList.add('invalido');
        } else if(id==='cartao'||id==='cpf'||id==='val'){
            texto.style.display = 'none';
            elemento.classList.remove('invalido');
        }
    }
    var elementos = document.querySelectorAll('input');

    elementos.forEach(input => {
        if (input.value == null || input.value === '' || input.classList.contains("invalido")) {
            desbloqueia = false;
        }
    });

    if (desbloqueia) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }

}
function validarCPF(cpf) {
    // Remove caracteres n�o num�ricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 d�gitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os d�gitos s�o iguais, o que torna o CPF inv�lido
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro d�gito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var digito1 = (resto === 10 || resto === 11) ? 0 : resto;

    // Verifica se o primeiro d�gito verificador est� correto
    if (digito1 !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcula o segundo d�gito verificador
    soma = 0;
    for (var j = 0; j < 10; j++) {
        soma += parseInt(cpf.charAt(j)) * (11 - j);
    }
    resto = 11 - (soma % 11);
    var digito2 = (resto === 10 || resto === 11) ? 0 : resto;

    // Verifica se o segundo d�gito verificador est� correto
    if (digito2 !== parseInt(cpf.charAt(10))) {
        return false;
    }

    // CPF v�lido
    return true;
}
