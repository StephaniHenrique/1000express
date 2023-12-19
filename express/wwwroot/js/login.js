const urlBase = "http://localhost:8080";

document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});
async function login() {

    var email = document.getElementById("emailLogin").value;
    var password = document.getElementById("senhaLogin").value;


    const response = await fetch(urlBase + '/user/authenticate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        window.location.href = '/Delivery';
    } else {
        alert('Erro ao fazer login. Verifique suas credenciais');
    }

}

async function cadastrarUsuario() {
    var nome = document.getElementById('nomeCad').value;
    var cpf = document.getElementById('cpfCad').value;
    var email = document.getElementById('emailCad').value;
    var senha = document.getElementById('senhaCad').value;
    var confirm = document.getElementById('confirmaSenha').value;

    if (!nome || !cpf || !email || !senha || !confirm) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (!validarCPF(cpf)) {
        alert('CPF inv�lido!');
        return;
    }

    if (!validarEmail(email)) {
        alert('E-mail inv�lido!');
        return;
    }

    if (senha != confirm) {
        alert('Senhas diferentes! Confirme sua senha.');
        return; 
    }


    const response = await fetch(urlBase + '/user/register', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: senha,
            name: nome, 
            cpf: cpf,
            role: "USER"
        }),
    });

    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
    } else {
        alert('Erro ao cadastrar');
    }

    document.getElementById('nomeCad').value = '';
    document.getElementById('cpfCad').value = '';
    document.getElementById('emailCad').value = '';
    document.getElementById('senhaCad').value = '';
    document.getElementById('confirmaSenha').value = '';

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

function validarEmail(email) {
    // Express�o regular para validar o formato do e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
