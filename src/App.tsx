import { createSignal, type Component, Show, For } from 'solid-js';

let counter = 0;

const App: Component = () => {
  const [todos, setTodos] = createSignal([
    {
      id: 1,
      title: 'Learn SolidJS',
      completed: false,
    },
  ]);

  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?" />
      </header>
      <Show when={todos().length > 0}>
        <ul class="todo-list">
          <For each={todos()}>
            {
              todo => (
                <li class="todo">
                  <div class="view">
                    <input type="checkbox" class="toggle" />
                    <label>{todo.title}</label>
                    <button class="destroy" />
                  </div>
                </li>
              )
            }
          </For>
        </ul>
      </Show>
    </section>
  );
};

export default App;
