//Import lớp đối tượng
import {ToDo} from "./todo.js";
import { ToDoList } from "./todolist.js";

let todoList = new ToDoList();
let completeList = new ToDoList();
//Hàm rút gọn cú pháp getElementById
const getELE = id =>{
    return document.getElementById(id);
}

//Hàm thêm todo
const addToDo = () =>{
    let txtToDo = getELE("newTask").value;
    let ulToDo = getELE("todo");

    if(txtToDo != ""){
        let td = new ToDo(txtToDo, "todo");
        todoList.addToDo(td);
    }
    
    showToDoList(ulToDo);
    getELE("newTask").value = "";
}

getELE("addItem").addEventListener("click", ()=>{
    addToDo();
});

//Hàm hiển thị todo
const showToDoList = (ulToDo)=>{
    ulToDo.innerHTML = todoList.renderToDo();
}

const showCompleteList = (ulComplete)=>{
    ulComplete.innerHTML = completeList.renderToDo();
}

//Hàm delete todo
const deleteToDo = (e)=>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getELE("todo");
    let ulCompleted = getELE("completed");

    if(status == "todo"){
        todoList.removeToDo(tdIndex);
        showToDoList(ulToDo);
    }
    else if(status == "completed"){
        completeList.removeToDo(tdIndex);
        showCompleteList(ulCompleted);
    }
    else{
        alert("Cannot delete todo !");
    }
    
}
window.deleteToDo = deleteToDo;

const completeToDo = (e)=>{
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getELE("todo");
    let ulCompleted = getELE("completed");

    if(status == "todo"){
        //slice: start <= index < end
        let completeItem = todoList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(completeItem[0].textTodo, "completed");
        moveToDo(todoList, completeList, objToDo, tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    }
    else if(status == "completed"){
        let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(undoItem[0].textTodo, "todo");
        moveToDo(completeList, todoList, objToDo, tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    }
    else{
        alert("Cannot move todo !");
    }
}
window.completeToDo = completeToDo;

const moveToDo = (depart, arrival, obj, tdIndex)=>{
    //remove todo from depart
    depart.removeToDo(tdIndex);

    //add todo to arrival
    arrival.addToDo(obj);
}

const sortASC = (e)=>{
    let ulToDo = getELE("todo");
    todoList.sortToDoList(false);
    showToDoList(ulToDo);
}
window.sortASC = sortASC;

const sortDES = (e)=>{
    let ulToDo = getELE("todo");
    todoList.sortToDoList(true);
    showToDoList(ulToDo);
}
window.sortDES = sortDES;