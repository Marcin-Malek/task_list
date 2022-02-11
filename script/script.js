{
    const input = document.querySelector(".js-input");

    let tasks = [];
    let hideDoneTasks = false;

    const isDone = (tasks) => tasks.done === true;

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const toggleTaskState = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1)
        ];
        render();
    };

    const addNewTask = () => {
        tasks = [
            ...tasks,
            {
                content: input.value.trim(),
                done: false
            }
        ]

        input.value = "";
        input.focus();
        render();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            if (hideDoneTasks && task.done) {
            } else {
                htmlString +=
                    `<div class="list__container">
            <li class="list__item ${task.done ? "list__item--done" : ""}">
            ${task.content}
            </li>
            <button class="list__button js-done">${task.done ? "✔" : ""}</button>
            <button class="list__button list__button--delete js-delete"></button>
            </div>`;
            }
        };

        document.querySelector(".js-list").innerHTML = htmlString;
    }

    const renderButtons = () => {
        let htmlString = "";
        if (tasks.length > 0) {
            htmlString +=
                `<button class="container__button js-allDone" ${tasks.every(isDone) ? "disabled" : ""}>Ukończ wszystkie</button>`;
        }
        if (tasks.some(isDone)) {
            htmlString +=
                `<button class="container__button js-hideDone">${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>`;
        }
        document.querySelector(".js-buttonContainer").innerHTML = htmlString;
    }

    const bindRemoveEvents = () => {
        document.querySelectorAll(".js-delete").forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleStateEvents = () => {
        document.querySelectorAll(".js-done").forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskState(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        if (tasks.length > 0) {
            document.querySelector(".js-allDone").addEventListener("click", () => {
                tasks = tasks.map(tasks => ({ ...tasks, done: true }));
                render();
            });
        }
        if (tasks.find(isDone)) {
            document.querySelector(".js-hideDone").addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;
                render();
            });
        }
    }

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleStateEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        if (input.value.trim() === "") {
            input.focus();
            return;
        };

        addNewTask();
    };

    const init = () => {
        const form = document.querySelector(".js-form");

        render();
        form.addEventListener("submit", onFormSubmit);
    };

    init();

};