{
    const input = document.querySelector(".js-input");

    const tasks = [
        {
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet iure consequuntur itaque placeat debitis doloremque ab iusto aspernatur corporis, qui inventore sequi dignissimos cumque quisquam nisi earum id quasi sint!",
            done: false
        }
    ];

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const toggleTaskStatus = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const addNewTask = () => {
        tasks.push({
            content: input.value.trim(),
            done: false
        });

        input.value = "";
        render();
    };

    const bindEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");
        const doneButtons = document.querySelectorAll(".js-done");

        deleteButtons.forEach((deleteButton, index) => {
            deleteButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        doneButtons.forEach((doneButton, index) => {
            doneButton.addEventListener("click", () => {
                toggleTaskStatus(index);
            });
        });
    };

    const render = () => {
        const list = document.querySelector(".js-list");
        let htmlString = "";

        for (const task of tasks) {
            htmlString +=
            `<div class="list__container">
            <li class="list__item ${task.done ? "list__item--done" : ""}">
            ${task.content}
            </li>
            <button class="list__button list__button--done js-done">${task.done ? "✔" : ""}</button>
            <button class="list__button list__button--delete js-delete"></button>
            </div>`;
        };

        list.innerHTML = htmlString;

        bindEvents();
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