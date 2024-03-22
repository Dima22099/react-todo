import { useEffect, useRef, useState } from 'react'

import { Input, Button }  from './components';

import './App.css'

const App = () =>  {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState([]);

  const [filter, setFilter] = useState('all'); 
  const [inputValue, setInputValue] = useState('');

  const [renameInput, setRenameInput] = useState('');
  const [renameInputId, setRenameInputId] = useState(null);

  const inputRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      return;
    }

    let trimmedTitle = inputValue;
    if (inputValue.length > 30) {
      trimmedTitle = inputValue.slice(0, 30) + ' ...';
    }

    setTodos((prevTodos) => [...prevTodos, { 
      id: crypto.randomUUID(),
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
    }))
  };

  const deleteItem = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleRemaneInput = (e) => {
    setRenameInput(e.target.value);
  };

  const toggleEditing = (id) => {
    if (renameInputId) {
      setTodos((prevTodos) => prevTodos.map((el) => {
        if (el.id === id) {
          return {...el, title: renameInput};
        }

        return el;
      }));
      setRenameInput('');
      setRenameInputId(null);
    } else {
      const { title } = todos.find((el) => el.id === id)
      setRenameInputId(id);
      setRenameInput(title);

      setTimeout(() => {
      inputRef.current.focus();
      })
    }
  };

  useEffect(() => {
    switch (filter) {
      case 'all':
        setShowTodos([...todos]);
        break;
      case 'completed': 
        setShowTodos(todos.filter((el) => el.completed));
        break;
      case 'notCompleted': 
        setShowTodos(todos.filter((el) => !el.completed));
        break;
      default: 
        return null;
    }
  }, [todos, filter]);  
 
  return (
    <>
      <h1 className='title'>Todo list</h1>
      <h4 className='totalTodo'>total tasks {todos.length}</h4>

      <form onSubmit={addTodo}>
        <Input value={inputValue} onChange={handleInputChange} />
        <Button type="submit" label={'add'} className='showButton'/>
      </form>

      <div className='buttonsCategores'>
        <Button 
          label={'show all tasks'}
          selected={filter == 'all'}
          onClick={() => setFilter('all')}

        />
        <Button 
          label={'show completed'}
          selected={filter == 'completed'}
          onClick={() => setFilter('completed')} 
          />
        <Button 
          label={'show not completed'}
          selected={filter === 'notCompleted'} 
          onClick={() => setFilter('notCompleted')} 
        />
      </div>

      <div className="items">
        {showTodos.map(({ id, title, completed }, index) => 
          <div className='list-item' key={id}>
            <span>{index + 1}</span>

            {renameInputId === id ? (
              <input
                className='inputRename'
                ref={inputRef}
                type='text'
                value={renameInput}
                onChange={handleRemaneInput}
              />
            ) : (
              <span
                onClick={() => toggleTodo(id)}
                className={`list-title ${completed ? 'completed' : ''}`}
              >
                {title}
              </span>
            )}

            <Button label={'rename'} onClick={() => toggleEditing(id)}/>
            <Button label={'delete'} onClick={() => deleteItem(id)} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;