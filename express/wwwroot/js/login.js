const urlBase = "http://192.168.15.5:8080";

async function login() {

    var username = document.getElementById("emailLogin").value;
    var password = document.getElementById("senhaLogin").value;

    const response = await fetch(url + '/user/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password, 
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('token', token);
        window.location.href = '/Delivery';
    } else {
        alert('Erro ao fazer login. Verifique suas credenciais');
    }

}

function cadastrarUsuario() {
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
        alert('CPF inválido!');
        return;
    }

    if (!validarEmail(email)) {
        alert('E-mail inválido!');
        return;
    }

    if (senha != confirm) {
        alert('Senhas diferentes! Confirme sua senha.');
        return; 
    }

    var novoUsuario = {
        email: nome,
        password: senha,
        name: nome,
        cpf: cpf,
        role: "USER"

    };

    console.log(novoUsuario);

    fetch(urlBase +'/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
    })
        .then(response => {
            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar usuário.');
            }
        })
        .catch(error => {
            alert('Erro na requisição:', error);
        });
}

function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var digito1 = (resto === 10 || resto === 11) ? 0 : resto;

    // Verifica se o primeiro dígito verificador está correto
    if (digito1 !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (var j = 0; j < 10; j++) {
        soma += parseInt(cpf.charAt(j)) * (11 - j);
    }
    resto = 11 - (soma % 11);
    var digito2 = (resto === 10 || resto === 11) ? 0 : resto;

    // Verifica se o segundo dígito verificador está correto
    if (digito2 !== parseInt(cpf.charAt(10))) {
        return false;
    }

    // CPF válido
    return true;
}

function validarEmail(email) {
    // Expressão regular para validar o formato do e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
