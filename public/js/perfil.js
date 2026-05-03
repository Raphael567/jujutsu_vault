const buttons = document.querySelectorAll('.item');
const sections = document.querySelectorAll('.section');

function inicializarMenu() {
    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];

        btn.onclick = () => alternarSecao(btn, i);
    }
}

function alternarSecao(btn, index) {
    atualizarBotoes(btn);
    atualizarSecoes(index);
}

function atualizarBotoes(btn) {
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }

    btn.classList.add('active');
}

function atualizarSecoes(index) {
    for (let k = 0; k < sections.length; k++) {
        sections[k].classList.remove('active');
    }

    sections[index].classList.add('active');
}

inicializarMenu();