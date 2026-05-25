const usuarioLogado = sessionStorage.getItem("ID_USUARIO");

// Listar tentativas
function listarTentativasPorUsuario(idUsuario) {
    fetch(`/tentativas/usuario/${idUsuario}`)
        .then(response => response.json())
        .then(data => {
            exibirTentativas(data);
        })
        .catch(error => {
            console.error("Erro ao listar tentativas:", error);
        });
}

// Exibir tentativas
function exibirTentativas(tentativas) {

    const tentativasContainer = document.querySelector(".tentativas-list");

    tentativasContainer.innerHTML = "";

    for (let i = 0; i < tentativas.length; i++) {

        const item = tentativas[i];

        const row = document.createElement("div");

        row.classList.add("tentativa-row");

        row.innerHTML = `
            <span class="date">${item.data_tentativa}</span>
            <span class="score">${item.pontuacao}</span>
            <span class="time">${item.tempo}s</span>
        `;

        tentativasContainer.appendChild(row);
    }
}

const editBtn = document.getElementById("edit-btn");

const cancelBtn = document.getElementById("cancel-btn");

const saveBtn = document.getElementById("save-btn");

const actions = document.querySelector(".actions");

const inputs = document.querySelectorAll(".form-grid input");

const avatars = document.querySelectorAll(".avatar-list .avatar");

const perfilAvatar = document.querySelectorAll(".perfil-avatar");

const nomePerfil = document.querySelectorAll(".user h3");

const emailPerfil = document.querySelectorAll(".user span");

let avatarSelecionado =
    sessionStorage.getItem("AVATAR_USUARIO") || "./assets/icon/no_user.png";

let avatares = document.querySelectorAll(".avatar-list .avatar");

function carregarPerfil() {
    const nomeUsuario = document.querySelectorAll(".user h3");
    const emailUsuario = document.querySelectorAll(".user span");
    const nomeUsuarioInput = document.getElementById("input-name");
    const emailUsuarioInput = document.getElementById("input-email");

    nomeUsuarioInput.value = sessionStorage.getItem("NOME_USUARIO");
    emailUsuarioInput.value = sessionStorage.getItem("EMAIL_USUARIO");

    for (let i = 0; i < nomeUsuario.length; i++) {
        nomeUsuario[i].innerText = sessionStorage.getItem("NOME_USUARIO");
        emailUsuario[i].innerText = sessionStorage.getItem("EMAIL_USUARIO");
    }

    for (let i = 0; i < perfilAvatar.length; i++) {
        perfilAvatar[i].src = sessionStorage.getItem("AVATAR_USUARIO") || "./assets/icon/no_user.png";
    }

    // Marcar o avatar selecionado
    for (let i = 0; i < avatares.length; i++) {
        if (avatares[i].src.includes(avatarSelecionado)) {
            avatares[i].classList.add("selected");
        }
    }
}

carregarPerfil();

//Entrar no modo de edição
editBtn.addEventListener("click", () => {

    editBtn.classList.add("editing");

    actions.classList.remove("hidden");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }

    for (let i = 0; i < avatars.length; i++) {
        avatars[i].style.cursor = "pointer";
        avatars[i].addEventListener("click", selecionarAvatar);
    }
});

//Selecionar avatar
function selecionarAvatar(event) {

    for (let i = 0; i < avatars.length; i++) {
        avatars[i].classList.remove("selected");
    }

    const avatar = event.target;

    avatar.classList.add("selected");

    avatarSelecionado = avatar.src;

    perfilAvatar[0].src = avatarSelecionado;
}

//Cancelar edição
cancelBtn.addEventListener("click", () => {

    //Restaurar os dados do perfil para os valores atuais do sessionStorage
    carregarPerfil();

    // Restaurar o avatar selecionado para o original
    avatarSelecionado =
        sessionStorage.getItem("AVATAR_USUARIO")
        || "./assets/icon/avatar1.svg";

    perfilAvatar.src = avatarSelecionado;

    //Voltar ao avatar selecionado
    for (let i = 0; i < avatars.length; i++) {
        avatars[i].classList.remove("selected");

        if (avatars[i].src.includes(avatarSelecionado.split("/").pop())) {
            avatars[i].classList.add("selected");
        }

    }

    //Resetar campos de senha
    document.getElementById("current-password").value = "";

    document.getElementById("new-password").value = "";

    //Sair da Edição
    editBtn.classList.remove("editing");

    actions.classList.add("hidden");

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
    }

});

function verificarSenhaAtual(senhaAtual) {

    return fetch("/usuarios/verificarSenha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: usuarioLogado,
            senhaAtualServer: senhaAtual
        })
    })
        .then(resposta => resposta.json())
        .then(resultado => {

            return resultado.length > 0;

        });

}

//Salvar as alterações
saveBtn.addEventListener("click", () => {

    const senhaAtual = document.getElementById("current-password").value;

    verificarSenhaAtual(senhaAtual)
        .then(senhaValida => {

            if (!senhaValida) {

                alert("Senha atual incorreta");

                return;
            }

            console.log("Senha correta");

            const novoNome = document.getElementById("input-name").value;

            const novoEmail = document.getElementById("input-email").value;

            const novaSenha = document.getElementById("new-password").value;

            //Atualiza o nome apenas se o usuário tiver digitado um novo diferente do atual
            if (novoNome !== sessionStorage.getItem("NOME_USUARIO")) {

                fetch("/usuarios/atualizarNome", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idUsuarioServer: usuarioLogado,
                        novoNomeServer: novoNome
                    })
                });

                sessionStorage.setItem("NOME_USUARIO", novoNome);
            }


            //Atualiza o email apenas se o usuário tiver digitado um novo diferente do atual
            if (novoEmail !== sessionStorage.getItem("EMAIL_USUARIO")) {

                fetch("/usuarios/atualizarEmail", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idUsuarioServer: usuarioLogado,
                        novoEmailServer: novoEmail
                    })
                });

                sessionStorage.setItem("EMAIL_USUARIO", novoEmail);
            }


            if (novaSenha.trim() !== "") {

                //Atualizar a senha apenas se o usuário tiver digitado uma nova diferente da atual
                if (novaSenha === senhaAtual) {

                    alert("A nova senha deve ser diferente da atual");

                    return;
                }

                fetch("/usuarios/atualizarSenha", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idUsuarioServer: usuarioLogado,
                        novaSenhaServer: novaSenha
                    })
                });
            }


            //Atualiza o avatar apenas se o usuário tiver selecionado um diferente do atual
            if (avatarSelecionado !== sessionStorage.getItem("AVATAR_USUARIO")) {

                fetch("/usuarios/atualizarAvatar", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        idUsuarioServer: usuarioLogado,
                        novoAvatarServer: avatarSelecionado
                    })
                });

                sessionStorage.setItem("AVATAR_USUARIO", avatarSelecionado);
            }

            //Atualiza a tela com os novos dados
            carregarPerfil();

            perfilAvatar.src = avatarSelecionado;

            // Sair da Edição
            editBtn.classList.remove("editing");

            actions.classList.add("hidden");

            for (let i = 0; i < inputs.length; i++) {
                inputs[i].disabled = true;
            }

            document.getElementById("current-password").value = "";

            document.getElementById("new-password").value = "";

            alert("Perfil atualizado com sucesso");

            window.location.reload();
        });
});

listarTentativasPorUsuario(usuarioLogado);
