import { useState } from 'react';

import { Input, Button }  from './components';

import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addItems = (event) => {
    event.preventDefault();

    if (inputValue === '') {
      return;
    }

    let trimmedTitle = inputValue;
    if (inputValue.length > 30) {
      trimmedTitle = inputValue.slice(0, 35) + ' ...';
    }

    setTodos((prevTodos) => [...prevTodos, {
        id: todos.length + 1,
        title: trimmedTitle,
        completed: false
    }]);

    setInputValue('');
  }

  const toggleTodo = (id) => {
      setTodos((prevTodos) => prevTodos.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed: !todo.completed};
        }

        return todo;
      }));
  };

  const deleteItem = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <>
      <h1 className={'title'}>Todo list</h1>
      <h4>total tasks {todos.length}</h4>

      <form onSubmit={addItems}>
        <Input value={inputValue} placeholder={'Enter a task'} onChange={handleInputChange} />
        <Button label={'add'} />
      </form>

      <div>
        {todos.map(({ id, title, completed }, index) =>
          <div className='list-item' key={id}>
            <span>{index + 1}</span>

            <span
                onClick={() => toggleTodo(id)}
                className={`list-title ${completed ? 'completed': ''}`}
            >
                {title}
            </span>

            <Button onClick={() => deleteItem(id)} label={'delete'} />
          </div>
        )}
      </div>
    </>
  )
};

export default App
