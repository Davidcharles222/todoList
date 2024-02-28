'use strict';

/* 
<label class="todo__item">
<input type="checkbox">
<div>teste de item 1</div>
<input type="button" value="X">
</label> 
*/

/*
let banco = [
    {'tarefa': 'Esdudar JS', 'status': ''},
    {'tarefa': 'netflix', 'status': 'checked'},
    {'tarefa': 'teste' , 'status' : 'checked'}
];
*/

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []; // ??se minha todo lista for null 'vazia' mantém o array, desta forma não gera erro.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));// enviar dados para o localStorage

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {//elimina duplicidade em caso da função atualizarTela ser chamada mais de uma vez
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa' : texto, 'status' : ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if(elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();