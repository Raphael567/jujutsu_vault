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
    error_msg.innerHTML = mensagem;
}

function cadastrar() {
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

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

                setTimeout(() => {
                    window.location = './login.html';
                });

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