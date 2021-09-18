import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const TodoListForm = ({ addNewTodo }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState({ index: 1, value: 'Medium' });

  const prioritOptions = [
    { index: 0, value: 'Low' },
    { index: 1, value: 'Medium' },
    { index: 2, value: 'Important' },
    { index: 3, value: 'Urgent' }
  ];

  const handleSubmit = e => {
    e.preventDefault();
    addNewTodo(title, priority);

    // reset fields
    setTitle('');
    setPriority({ index: 1, value: 'Medium' });
  };

  return (
    <Form data-testid='todoForm' onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label><b>
          Title
          <Form.Control name='title' type='text' value={title} placeholder='Add Title' onChange={e => setTitle(e.target.value)} />
        </b></Form.Label>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label><b>
          Priority
          <Form.Control as='select' name='priority' value={priority.value} onChange={e => setPriority({ index: e.target.options.selectedIndex, value: e.target.value })}>
            {prioritOptions.map(option => {
              return (<option key={option.index} value={option.value}>{option.value}</option>);
            })}
            </Form.Control>
        </b></Form.Label>
      </Form.Group>
      <Button data-testid='add' variant='primary mb-3' type='submit' disabled={title === ''}>
        Add
      </Button>
    </Form>
  );
}

export default TodoListForm;