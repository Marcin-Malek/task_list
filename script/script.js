{
    const input = document.querySelector(".js-input");

    let tasks = [];

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
            {...tasks[index], done: !tasks[index].done},
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
            htmlString +=
                `<div class="list__container">
            <li class="list__item ${task.done ? "list__item--done" : ""}">
            ${task.content}
            </li>
            <button class="list__button js-done">${task.done ? "✔" : ""}</button>
            <button class="list__button list__button--delete js-delete"></button>
            </div>`;
        };

        document.querySelector(".js-list").innerHTML = htmlString;
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


    const render = () => {
        renderTasks();

        bindRemoveEvents();
        bindToggleStateEvents();
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