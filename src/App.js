import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import './App.css';
import Todo from './components/Todo.js';
import TodoListForm from './components/TodoListForm.js';


const App = () => {
  const [todos, setTodos] = useState('');

  /*
   * adds a todo item
   */
  const addNewTodo = (title, priority) => {
    const todosTemp = [...todos];
    const newTodo = {
      title: title,
      priority: priority
    };

    todosTemp.push(newTodo);
    todosTemp.sort(order);
    setTodos(todosTemp);
  };

  /*
   * order first by priority, then name
   */
  const order = (a, b) => {
    if (a.priority.index > b.priority.index) {
      return -1;
    }
    if (a.priority.index < b.priority.index) {
      return 1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  /*
   * toggles the isDone field of the todo
   */
  const toggle = index => {
    const todosTemp = [...todos];
    todosTemp[index].isDone = !todosTemp[index].isDone;
    setTodos(todosTemp);
  };

  /*
   * deletes the todo
   */
  const deleteTodo = index => {
    const todosTemp = [...todos];
    todosTemp.splice(index, 1);
    setTodos(todosTemp);
  };

  return (
    <div id='app'>
      <div id='container'>
        <h1 className='mb-3'>To-do List</h1>
        <TodoListForm addNewTodo={addNewTodo} />
        <div id='todoCounter'>
          <p>Total number of Todos: {todos.length}</p>
          <p>Number of completed Todos: {todos.length > 0 ? todos.filter(todo => todo.isDone === true).length : 0}</p>
        </div>
        <div>
          {todos && todos.map((todo, index) => (
            <Card data-testid='todoItem'  key={index}>
              <Card.Body>
                <Todo index={index} todo={todo} toggleTodo={toggle} deleteTodo={deleteTodo}/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;