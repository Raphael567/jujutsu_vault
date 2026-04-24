// Array para armazenar empresas cadastradas para validação de código de ativação 
let listaEmpresasCadastradas = [];

function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    // Verificando se há algum campo em branco

    const campos = [nomeVar, emailVar, senhaVar, confirmacaoSenhaVar];

    // Verifica campos vazios
    for(i = 0; i < campos.length; i++) {
        if (campos[i] == "") {
            alert("Preencha todos os campos!");
            return false;
        }
    }

    if (
        nomeVar.length < 1 ||
        (!emailVar.includes("@") || !emailVar.includes(".")) ||
        senhaVar != confirmacaoSenhaVar
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Campos inválidos!";

        return false;
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),
    })
        .then(function (resposta) {
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