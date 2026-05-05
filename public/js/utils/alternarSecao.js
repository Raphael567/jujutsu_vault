const buttons = document.querySelectorAll('.item');
const sections = document.querySelectorAll('.section');

function inicializarMenu() {
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];

        btn.onclick = () => {
            const isForm = btn.parentElement.parentElement.classList.contains('form');

            if (isForm) {
                const index = btn.classList.contains('login-btn') ? 0 : 1;
                alternarSecao(btn, index);
            } else alternarSecao(btn, i);
        };
    }
}

function alternarSecao(btn, index) {
    atualizarBotoes(btn, index);
    atualizarSecoes(index);
}

function atualizarBotoes(btn, index) {
    const todosBotoes = document.querySelectorAll('.item');

    for (let i = 0; i < todosBotoes.length; i++) {
        todosBotoes[i].classList.remove('active');
    }

    const menus = document.querySelectorAll('.menu');

    for (let k = 0; k < menus.length; k++) {
        const botoes = menus[k].querySelectorAll('.item');
        botoes[index].classList.add('active');
    }
}

function atualizarSecoes(index) {
    for (let k = 0; k < sections.length; k++) {
        sections[k].classList.remove('active');
    }

    sections[index].classList.add('active');
}

inicializarMenu();
