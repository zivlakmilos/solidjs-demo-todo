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

  const toggle = (todoId: number) => {
    setTodos(todos => todos.map((todo => {
      if (todo.id !== todoId) return todo;
      return { ...todo, completed: !todo.completed };
    })))
  }

  const remove = (todoId: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== todoId));
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
                <li class="todo" classList={{ completed: todo.completed }}>
                  <div class="view">
                    <input
                      type="checkbox"
                      class="toggle"
                      checked={todo.completed}
                      onInput={() => toggle(todo.id)} />
                    <label>{todo.title}</label>
                    <button class="destroy" onClick={() => remove(todo.id)} />
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
