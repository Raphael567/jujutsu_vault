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
    var emailVar = email_login.value;
    var senhaVar = senha_login.value;

    if (emailVar == "" || senhaVar == "" || (!emailVar.includes("@") || !emailVar.includes("."))) {
        error_msg_login.innerHTML = "Preencha os campos corretamente!";
        return false;
    }
    else {
        setTimeout(sumirMensagem, 5000)
    }

    let encontrou = false;
    for(let i = 0; i < usuariosCadastrados.length; i++) {
        if(usuariosCadastrados[i].email === emailVar && usuariosCadastrados[i].senha === senhaVar) {
            encontrou = true;
            break;
        }
    }

    if (!encontrou) {
        error_msg_login.innerHTML = "Usuário não encontrado!";
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
            });
        }

    }).catch(erro => {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    error_msg_login.innerHTML = "";
}

function verificarUsuarioCadastrado(nome, email) {
    const erros = [];

    for (let i = 0; i < usuariosCadastrados.length; i++) {
        const usuario = usuariosCadastrados[i];

        if (usuario.nome === nome && !erros.includes("nome")) {
            erros.push("nome");
        }
        if (usuario.email === email && !erros.includes("email")) {
            erros.push("email");
        }
    }

    return erros;
}

function temCamposVazios(campos) {
    for (let i = 0; i < campos.length; i++) {
        if (campos[i] === "") {
            return true;
        }
    }
    return false;
}

function temCamposInvalidos(campos) {
    const [nome, email, senha, confirmacaoSenha] = campos;

    return (
        nome.trim().length < 1 ||
        (!email.includes("@") || !email.includes(".")) ||
        senha != confirmacaoSenha
    );
}

function verificarCampos(campos) {
    if (temCamposVazios(campos)) {
        exibirMensagemErro("Todos os campos devem ser preenchidos!");
        return false;
    }

    if (temCamposInvalidos(campos)) {
        exibirMensagemErro("Campos inválidos!");
        return false;
    }

    return true;
}

function exibirMensagemErro(mensagem) {
    error_msg_cadastro.innerHTML = mensagem;
}

function cadastrar() {
    var nomeVar = nome_cadastro.value;
    var emailVar = email_cadastro.value;
    var senhaVar = senha_cadastro.value;
    var confirmacaoSenhaVar = confirmacao_senha_cadastro.value;

    const campos = [nomeVar, emailVar, senhaVar, confirmacaoSenhaVar];

    if (!verificarCampos(campos)) return false;

    const erros = verificarUsuarioCadastrado(nomeVar, emailVar);
    if (erros.length > 0) {
        exibirMensagemErro(`Já existe um usuário cadastrado com esse ${erros.join(" e ")}!`);
        return false;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),
    })
        .then(resposta => {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

listarUsuarios();
