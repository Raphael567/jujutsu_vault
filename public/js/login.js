let usuariosCadastrados = [];

function listarUsuarios() {
    fetch("/usuarios").then(resposta => {
        if (resposta.ok) {
            resposta.json().then(data => {
                usuariosCadastrados = data;
            });
        }
    }).catch(erro => {
        console.log(erro);
    });
}

function entrar() {
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;

    if (emailVar == "" || senhaVar == "" || (!emailVar.includes("@") || !emailVar.includes("."))) {
        error_msg.innerHTML = "Preencha os campos corretamente!";
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    let encontrou = false;
    for(let i = 0; i < usuariosCadastrados.length; i++) {
        if(usuariosCadastrados[i].email === emailVar && usuariosCadastrados[i].senha === senhaVar) {
            encontrou = true;
            break;
        }
    }

    if (!encontrou) {
        error_msg.innerHTML = "Usuário não encontrado!";
        return;
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(resposta => {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "./index.html";
                });
            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(erro => {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    error_msg.innerHTML = "";
}

listarUsuarios();