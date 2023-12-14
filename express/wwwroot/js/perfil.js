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
       body: localStorage.getItem("email")
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }

            return response.json();
        }).catch(error => {

            window.location.href = '/';
            console.error('Erro durante a requisição:', error);
        });
});

function update() {
    var input = document.querySelectorAll("input");
    for (i = 0; i < input.length; i++) {
        if (input[i].value == null || input[i].value == '') {
            alert("Preencha todos os dados");
            return;
        }
    }

    fetch(urlBase + '/user/authenticate', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: localStorage.getItem("email"),
            password: document.getElementById("senhaCad").value,
        }),
    }).then(response => {
        if (response.ok) {
            const data = response.json();
            const token = data.token;

            localStorage.setItem('token', token);
            alert("Infelizmente essa funcionalidade ainda não foi desenvolvida!");
        } else {
            alert('Senha incorreta. Não foi possível alterar seus dados!');
        }
    })
        .catch(error => {
            console.error('Erro ao enviar a requisição:', error);
        });

 
}

