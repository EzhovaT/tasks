const form = document.querySelector("#add-task-form"),
  button = document.querySelector("#add-task-btn"),
  card = document.querySelector(".task-card"),
  titleInput = document.querySelector("#add-title"),
  textarea = document.querySelector("#add-description"),
  selectImg = document.querySelector("#add-img"),
  btnAddTask = document.querySelector(".add-task__btn-task"),
  taskListCards = document.querySelector(".task-list__cards"),
  themesBlock = document.querySelector(".themes");

const arrTask = {
  1: {
    title: "Литература на лето",
    description: `Русские народные сказки: "Василиса Прекрасная", "Финист – Ясный Сокол"
      Жуковский В. "Спящая царевна"
      Пушкин А. Сказки Гоголь Н. "Майская ночь, или Утопленница"
      Куприн А. "Чудесный доктор"
      Зощенко М. "Великие путешественники"
      Платонов А. "Волшебное кольцо"`,
    img: "img/icon9.png",
    id: 1,
  },
  2: {
    title: "Продукты",
    description: `Молочные продукты, яйца. Сюда можно отнести кефир, молоко, творог, яйца, сметану, йогурты.
      Овощи/фрукты и консервы. ...
      Сыр и колбаса/сосиски ...
      Бытовая химия и сопутствующие товары.`,
    img: "img/icon8.png",
    id: 2,
  },
  3: {
    title: "Интересная цитата",
    description: `Всю жизнь ожидаешь встречи с Кем-то, кто поймёт тебя и примет таким, какой ты есть.
      А в самом конце обнаруживаешь, что этот Кто-то всегда с тобой. И это — ты сам.`,
    img: "img/icon10.png",
    id: 2,
  },
};

const themes = {
  default: {
    "--default-page-bg": "#5CCDC979",
    "--default-card-bg": "#009b9681",
    "--default-btn-bg": "#1D7471",
  },
  sun: {
    "--page-bg": "#FFDD7379",
    "--card-bg": "#FFC000",
    "--btn-bg": "#A67D00",
  },
  icon8: {
    "--page-bg": "#E969A879",
    "--card-bg": "#9E2862",
    "--btn-bg": "#890043",
  },
  icon9: {
    "--page-bg": "#B365D479",
    "--card-bg": "#A63CD4",
    "--btn-bg": "#4E026E",
  },
  icon10: {
    "--page-bg": "#60D6A779",
    "--card-bg": "#36D695",
    "--btn-bg": "#007143",
  },
};

//скрытие и открытие формы новой задачи
function addClassHidden() {
  form.classList.toggle("hidden");
  button.classList.toggle("hidden");
}

button.addEventListener("click", addClassHidden);
btnAddTask.addEventListener("click", addClassHidden);

//генерация задач из массива

(function (taskList) {
  if (!taskList) {
    console.error("oib,f");
    return;
  }

  const createCard = ({ title, description, id, img } = {}) => {
    const element = card.cloneNode(true);
    element.classList.remove("hidden");

    const taskTitle = element.querySelector(".task-card__title");
    taskTitle.textContent = title;

    const taskDescription = element.querySelector(".task-card__description");
    taskDescription.textContent = description;

    const taskImg = element.querySelector(".task-card__img");
    taskImg.src = `${img}`;

    element.setAttribute("data-id", id);

    return element;
  };

  const fragment = document.createDocumentFragment();
  Object.values(taskList).forEach((task) => {
    const newCard = createCard(task);
    fragment.appendChild(newCard);
  });
  taskListCards.appendChild(fragment);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const task = createNewCard(
      titleInput.value,
      textarea.value,
      selectImg.value
    );
    const newItemCard = createCard(task);
    taskListCards.insertAdjacentElement("afterbegin", newItemCard);
    form.reset();
  };

  const createNewCard = (titleValue, descrValue, selectImgValue) => {
    const newTask = {
      title: titleValue,
      description: descrValue,
      img: `img/${selectImgValue}.png`,
      id: Math.random(),
    };
    taskList[newTask.id] = newTask;
    return { ...newTask };
  };

  btnAddTask.addEventListener("submit", onFormSubmit);
  form.addEventListener("submit", onFormSubmit);

  const deleteTask = (id) => {
    const { title } = taskList[id];
    const isConfirm = confirm(`Удалить "${title}" ?`);
    if (!isConfirm) return isConfirm;
    delete taskList[id];
    return isConfirm;
  };

  const onDeleteTask = (e) => {
    if (e.target.classList.contains("task-card__btn-delete")) {
      //ищем ближайшего родителя кнопки с нашим дата атрибутом, находим контейнер
      const parentBtn = e.target.closest("[data-id]");
      const id = parentBtn.dataset.id; //dataset.id = [data-id]- получаем значение атрибута
      const isConfirm = deleteTask(id);
      if (isConfirm) {
        parentBtn.remove();
      }
    }
  };

  taskListCards.addEventListener("click", onDeleteTask);

  //смена темы
  let lastSelectedTheme = localStorage.getItem("theme") || "default";

  const onChangeTheme = (e) => {
    if (e.target.classList.contains("task-card__img")) {
      const boxBtn = e.target.closest("[data-btn]");
      const valueBoxBtn = boxBtn.dataset.btn;
      setTheme(valueBoxBtn);
      lastSelectedTheme = valueBoxBtn;
      localStorage.setItem("theme", valueBoxBtn);

    }
  };

  const setTheme = (name) => {
    //нужная тема из обьекта тем
    const selectedTheme = themes[name];
    Object.entries(selectedTheme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

  };

  setTheme(lastSelectedTheme);

  themesBlock.addEventListener("click", onChangeTheme);
})(arrTask);
