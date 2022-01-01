const $ = (selector) => document.querySelector(selector);

const unComplete = "fa-square";
const complete = "fa-check-square";

class ToDo {
  constructor() {
    this.id = 0;
    this.init();
  }

  init() {
    this.InitEventListeners();
  }

  AddList() {
    const newTask = $(".todo__input-text").value;
    if (!newTask) return;
    const task = `<li>
     <div class="todo__column"><i id="${this.id}" class="done far ${unComplete}"></i></div>
     <div class="todo__column">${newTask}</div>
     <div class="todo__column"><i id="${this.id}" class="remove fas fa-trash"></i></div>
     </li> 
     `;
    const position = "beforeend";
    $(".todo__list").insertAdjacentHTML(position, task);
    $(".todo__input-text").value = "";
    this.id++;
  }

  DoneList(id) {
    const doneElement = document.getElementById(`${id}`);
    doneElement.classList.toggle(complete);
    doneElement.classList.toggle(unComplete);
  }

  DeleteList(id) {
    const li = document.getElementById(`${id}`).parentNode.parentNode;
    li.parentNode.removeChild(li);
  }

  InitEventListeners() {
    $(".todo__input-btn").addEventListener("click", (e) => {
      this.AddList();
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
