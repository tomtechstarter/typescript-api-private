import { TodoAttributes } from '../../../src/interfaces/models/TodoAttributes';

const TestDataTodos: TodoAttributes[] = [
  {
    userId: 1,
    task: 'Schlafen',
    dueDate: '2024-03-11',
    isDone: true,
  },
  {
    userId: 1,
    task: 'Trinken',
    dueDate: '2024-03-12',
    isDone: false,
  },
  {
    userId: 1,
    task: 'Essen',
    dueDate: '2024-03-13',
    isDone: false,
  },
  {
    userId: 1,
    task: 'Joggen',
    dueDate: '2025-03-12',
    isDone: false,
  },
];

export default TestDataTodos;
