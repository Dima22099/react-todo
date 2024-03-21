import { useState } from 'react'
import Button from './components/Button/Button'
import Input from './components/Input/Input'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function addItems() {
    if (inputValue === '') {
      return;
    }

    let trimmedTitle = inputValue;
    if (inputValue.length > 30) {
      trimmedTitle = inputValue.slice(0, 35) + ' ...';
    }

    setTodos((prevTodos) => [...prevTodos, { id: todos.length + 1,
       title: trimmedTitle, completed: false,}]);
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
  }

  const renameDate = (id, title) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.id === id) {
        setInputValue(title);
        todo.title = inputValue;
        
        return {... todo, }
        
      }
      return todo;
    }))
  }


  return (
    <>
      <h1 className='h1'>Todo list </h1>
      <h4>total tasks {todos.length}</h4>
      <Input value={inputValue}  onChange={handleInputChange} />
      <Button label={'add'} onClick={addItems} />
      <div className="items">

        {todos.map(({ id, title, completed }, index) => 
          <p className='list-item' key={id}>
            <span>{index + 1}</span>
            <span onClick={() => toggleTodo(id)} 
              className={`list-title ${completed ? 'completed': ''}`}>{title}</span>

            <Button className="rename" label={'ren task'} onClick={() => renameDate(id, title)}/>
            <Button className="delete" onClick={() => deleteItem(id)} label={'delete'} />
          </p>
          )}
      </div>
    </>
  )
}

export default App;



