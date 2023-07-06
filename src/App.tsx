import { createSignal, type Component, Show, For } from 'solid-js';

let counter = 0;

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

type Todo = {
  id: number,
  title: string,
  completed: boolean,
}

const App: Component = () => {
  const [todos, setTodos] = createSignal<Todo[]>([]);

  const addTodo = (event: any) => {
    const title = event.target.value.trim();
    if (event.keyCode === ENTER_KEY && title) {
      setTodos(todos => [
        ...todos,
        { id: counter++, title, completed: false }
      ]);
      event.target.value = '';
    }
  }

  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={addTodo} />
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
