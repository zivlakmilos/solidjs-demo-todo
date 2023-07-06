import { createSignal, type Component, Show, For, createMemo, onCleanup } from 'solid-js';

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
  const [showMode, setShowMode] = createSignal('all');

  const remainingCount = createMemo(() => {
    return todos().length - todos().filter(todo => todo.completed).length;
  });

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

  const toggleAll = (event: any) => {
    const completed = event.target.checked;
    setTodos(todos => todos.map(todo => ({ ...todo, completed })));
  }

  const clearCompleted = () => {
    setTodos(todos => todos.filter(todo => !todo.completed));
  }

  const filterTodos = (todos: Todo[]) => {
    if (showMode() === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (showMode() === 'completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  const locationHandler = () => {
    setShowMode(location.hash.slice(2) || 'all');
  }

  window.addEventListener('hashchange', locationHandler);
  onCleanup(() => {
    window.removeEventListener('hashchange', locationHandler);
  });

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
        <section class="main">
          <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox"
            checked={!remainingCount()}
            onInput={toggleAll} />
          <label for="toggle-all" />
          <ul class="todo-list">
            <For each={filterTodos(todos())}>
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
        </section>
        <footer class="footer">
          <span class="todo-count">
            <strong>{remainingCount()}</strong>
            {remainingCount() === 1 ? ' item ' : ' items '}left
          </span>
          <ul class="filters">
            <li>
              <a href="#/" classList={{ selected: showMode() === 'all' }}>
                All
              </a>
            </li>
            <li>
              <a href="#/active" classList={{ selected: showMode() === 'active' }}>
                Active
              </a>
            </li>
            <li>
              <a href="#/completed" classList={{ selected: showMode() === 'completed' }}>
                Completed
              </a>
            </li>
          </ul>
          <Show when={remainingCount() !== todos().length}>
            <button class="clear-completed" onClick={clearCompleted}>Clear completed</button>
          </Show>
        </footer>
      </Show>
    </section >
  );
};

export default App;
