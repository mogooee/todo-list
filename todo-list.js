const $ = (selector) => document.querySelector(selector);

const unComplete = "fa-square";
const complete = "fa-check-square";

class ToDo {
  constructor() {
    this.id = 0;
    this.storage = [];
    this.init();
  }

  init() {
    this.InitEventListeners();
    this.LoadLocalStorage();
  }

  LoadLocalStorage() {
    const loadToDos = localStorage.getItem("TODO");
    if (loadToDos) {
      const parsedToDos = JSON.parse(loadToDos);
      parsedToDos.forEach((e) => {
        if (!e.trash) {
          this.Rendering(e.id, e.newTask, e.done);
        }
      });
      this.storage = parsedToDos;
      this.id = parsedToDos.length;
    }
  }

  Rendering(id, newTask, done) {
    if (!newTask) return;

    const task = `<li>
     <div class="todo__column"><i id="${id}" class="done far ${
      done ? complete : unComplete
    }"></i></div>
     <div class="todo__column">${newTask}</div>
     <div class="todo__column"><i id="${id}" class="remove fas fa-trash"></i></div>
     </li> 
     `;
    const position = "beforeend";
    $(".todo__list").insertAdjacentHTML(position, task);
    $(".todo__input-text").value = "";
  }

  AddStorage(id, newTask) {
    this.storage.push({ id, newTask, done: 0, trash: 0 });
  }

  DoneList(id) {
    const doneElement = document.getElementById(`${id}`);
    doneElement.classList.toggle(complete);
    doneElement.classList.toggle(unComplete);
    this.storage[id].done = this.storage[id].done ? 0 : 1;
    this.SaveLocalStorage();
  }

  DeleteList(id) {
    const li = document.getElementById(`${id}`).parentNode.parentNode;
    li.parentNode.removeChild(li);
    this.storage[id].trash = 1;
    this.SaveLocalStorage();
  }

  SaveLocalStorage() {
    localStorage.setItem("TODO", JSON.stringify(this.storage));
  }

  InitEventListeners() {
    $(".todo__input-btn").addEventListener("click", (e) => {
      const inputValue = $(".todo__input-text").value;
      this.Rendering(this.id, inputValue);
      this.AddStorage(this.id, inputValue);
      this.SaveLocalStorage();
      this.id++;
    });
    $(".todo__input").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $(".todo__list").addEventListener("click", (e) => {
      if (e.target.classList.contains("done")) {
        this.DoneList(e.target.id);
        return;
      }

      if (e.target.classList.contains("remove")) {
        this.DeleteList(e.target.id);
        return;
      }
    });
  }
}

const todo = new ToDo();
