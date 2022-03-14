const getBanco = () => JSON.parse(localStorage.getItem("toDoList")) ?? [];

const setBanco = (banco) => localStorage.setItem("toDoList", JSON.stringify(banco));

function criarItem(tarefa, status, indice) {
    const item = document.createElement("label");
    item.classList.add("item")
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input class="button" type="button" value="X" data-indice=${indice}>`;
    document.getElementById("listinha").appendChild(item);
}

function atualizarTela() {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

function limparTarefas() {
    const listinha = document.getElementById('listinha');
    while (listinha.firstChild) {
        listinha.removeChild(listinha.lastChild);
    }
}

function addItem(event) {
    const tecla = event.key;
    const texto = event.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({ 'tarefa': texto, 'status': '' });
        setBanco(banco);
        atualizarTela();
        event.target.value = '';
    }
}

function removerItem(indice) {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

function clickItem(event) {
    const elemento = event.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);

    }
}

function atualizarItem(indice) {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

document.getElementById('lista').addEventListener('keypress', addItem);
document.getElementById('listinha').addEventListener('click', clickItem);

atualizarTela();