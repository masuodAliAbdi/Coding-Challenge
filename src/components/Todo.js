
import { Button, Badge } from 'react-bootstrap';

const Todo = ({ todo, index, toggleTodo, deleteTodo }) => {
  return (
    <div id='todoContainer' >
      <span data-testid='todoTitle' style={{ textDecoration: todo.isDone ? 'line-through' : '' }}><b>{todo.title}</b></span>
      <Badge bg={todo.priority.index > 1  ? 'danger' : 'secondary'} text='light'>{todo.priority.value}</Badge>
      <div>
        {!todo.isDone && <Button data-testid='complete' variant='success' onClick={() => toggleTodo(index)}>Complete Todo</Button>}  {/* only show when task is in-complete */}
        {todo.isDone && <Button data-testid='undoComplete' variant='secondary' onClick={() => toggleTodo(index)}>Undo Completion</Button>}{' '}  {/* only show when task is complete */}
        <Button data-testid='delete' variant='danger' onClick={() => deleteTodo(index)}>Delete Todo</Button>
      </div>
    </div>
  );
}

export default Todo;