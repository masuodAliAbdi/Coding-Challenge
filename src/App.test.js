import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import App from './App'

afterEach(cleanup);

test('renders form properly', () => {
  const { getByLabelText } = render(<App />);

  expect(getByLabelText(/title/i)).toBeInTheDocument();
  expect(getByLabelText(/priority/i)).toBeInTheDocument();
});

test('add-button disabled when title is empty', () => {
  const { getByTestId, getByLabelText } = render(<App />);

  const titleInput = getByLabelText(/title/i);
  fireEvent.change(titleInput, { 'target': { 'value': '' } });

  expect(getByTestId('add')).toBeDisabled();
});

test('add-button enabled when title is not empty', () => {
  const { getByTestId, getByLabelText } = render(<App />);

  const titleInput = getByLabelText(/title/i);
  fireEvent.change(titleInput, { 'target': { 'value': 'Some random text' } });

  expect(getByTestId('add')).toBeEnabled();
});

test('default values', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('todoForm')).toHaveFormValues({
    title: '',
    priority: 'Medium',
  })
});

test('form fields reset after submission', async () => {
  const { getByTestId, getByLabelText } = render(<App />);

  const titleInput = getByLabelText(/title/i);
  fireEvent.change(titleInput, { 'target': { 'value': 'Some random text' } });
  fireEvent.click(getByTestId('add'));

  expect(getByTestId('todoForm')).toHaveFormValues({
    title: '',
    priority: 'Medium',
  });
  
});

test('adding todo', async () => {
  const { getByTestId, queryByTestId, getByLabelText } = render(<App />);

  const titleInput = getByLabelText(/title/i);
  fireEvent.change(titleInput, { 'target': { 'value': 'Some random text' } });
  fireEvent.click(getByTestId('add'));

  expect(queryByTestId('todoItem')).toBeInTheDocument();
});

test('complete and undo completion of todo', async () => {
  const { getByTestId, queryByTestId, getByLabelText } = render(<App />);

  const titleInput = getByLabelText(/title/i);
  fireEvent.change(titleInput, { 'target': { 'value': 'Some random text' } });
  fireEvent.click(getByTestId('add'));

  // complete todo
  fireEvent.click(getByTestId('complete'));
  expect(queryByTestId('todoTitle')).toHaveStyle('text-decoration: line-through')

  // undo completion todo
  fireEvent.click(getByTestId('undoComplete'));
  expect(queryByTestId('todoTitle')).not.toHaveStyle('text-decoration: line-through')
});

test('deleting todo', async () => {
  const { getByTestId, queryByTestId, getByLabelText } = render(<App />);

  const titleInput = getByLabelText(/title/i);
  fireEvent.change(titleInput, { 'target': { 'value': 'Some random text' } });
  fireEvent.click(getByTestId('add'));
  fireEvent.click(getByTestId('delete'));

  expect(queryByTestId('todoItem')).not.toBeInTheDocument();
});


test('ordering', async () => {
  const { getByTestId, getAllByTestId, getByLabelText } = render(<App />);

  const addNewTodo = (title, priority) => {
    const titleInput = getByLabelText(/title/i);
    const priorityOptions = getByLabelText(/priority/i);
    fireEvent.change(titleInput, { 'target': { 'value': title } });
    fireEvent.change(priorityOptions, { 'target': { 'value': priority } });
    fireEvent.click(getByTestId('add'));
  }

  addNewTodo('z', 'Urgent'); // first
  addNewTodo('ab', 'Low'); // last
  addNewTodo('aa', 'Low'); // third
  addNewTodo('aa', 'Medium'); // second

  const todoItems = getAllByTestId('todoTitle');
  expect(todoItems[0].textContent).toBe('z');
  expect(todoItems[1].textContent).toBe('aa');
  expect(todoItems[2].textContent).toBe('aa');
  expect(todoItems[3].textContent).toBe('ab');
});

