import React, { useState } from 'react'
import { useSelector, useDispatch } from'react-redux';

import { addTodo, deleteTodo, toggleTodo,  renameTodo, toggleEdit, filteredTodos } from './store/slices/todoSlices';

import { Input, Button } from './components';

import './App.css'
// 1-добавить в state поле фильтр//////////////

// 2-создать action который будет менять поле фильтр

// 3-при нажатие на кнопки должен меняться фильтр.

// 4-в компоненте app, отфильтровать todos в зависимости от текущего фильтра (поместить в новую переменную)

// 5-отобразить в компоненте отфильтрованные

// 6- прислать как будет выглядить стейт в приложение кинопоиска 

const App = () =>  {
  const [inputValue, setInputValue] = useState('');

  const { todos, filter } = useSelector(state => state.todos)
  const dispatch = useDispatch();

  const addItem = (e) => {
    e.preventDefault();
    dispatch(addTodo(inputValue)); 
    setInputValue('');
  };

  const deleteItem = (id) => {
    dispatch(deleteTodo(id));
  };

  const toggleItem = (id) => {
    dispatch(toggleTodo(id));
  };

  const toggleEditItem = (id) => {
    dispatch(toggleEdit(id));
  };

  const filteredTodo = todos.filter(todo => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'notCompleted') {
      return !todo.completed;
    } 
    return true;
  })

// Только добавили задачу --- todos: [{ tile: «Выучить React», id: ‘123-31-23-123’, completed: false, edit: false }]
// Нажали на кнопку редактировать - текс задачи превратился в input - [{ tile: «Выучить React», id: ‘123-31-23-123’, completed: false, edit: TRUE }]
// Изменили значение в input ToDo - текст поменялся и input и в redux -[{ tile: «Выучить React в мае», id: ‘123-31-23-123’, completed: false, edit: TRUE }]  
// Нажали еще раз на кнопку редактировать - input превратился в span - [{ tile: «Выучить React в мае», id: ‘123-31-23-123’, completed: false, edit: false }]
 
  return (
    <>
      <h1 className='title'>Todo list</h1>
      <h4 className='totalTodo'>total tasks {todos.length}</h4>

      <form onSubmit={addItem}>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <Button type="submit" label={'add'} className='showButton'/>
      </form>

      <div className='buttonsCategores'>
        <Button 
          label={'show all tasks'}
          selected={filter == 'all'}
          onClick={() => dispatch(filteredTodos('all'))}
        />
        <Button 
          label={'show completed'}
          selected={filter == 'completed'}
          onClick={() => dispatch(filteredTodos('completed'))} 
          />
        <Button 
          label={'show not completed'}
          selected={filter === 'notCompleted'} 
          onClick={() => dispatch(filteredTodos('notCompleted'))} 
        />
      </div>

      <div className="items">
        {filteredTodo.map(({ id, title, completed, edit }, index) => 
          <div className='list-item' key={id}>
            <span>{index + 1}</span>
            {edit ? (
              <input
                className='inputRename'
                type='text'
                value={title}
                onChange={(e) => dispatch(renameTodo({id, title: e.target.value}))}
              />
            ) : (
              <span
                onClick={() => toggleItem(id)}
                className={`list-title ${completed ? 'completed' : ''}`}
              >
                {title}
              </span>
            )}

            <Button label={'rename'} onClick={() => toggleEditItem(id)}/>
            <Button label={'delete'} onClick={() => deleteItem(id)} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;