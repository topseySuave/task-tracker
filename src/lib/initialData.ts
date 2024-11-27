import type { Column } from '@/types';

export const initialColumns: Column[] = [
  {
    id: '1',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        columnId: '1',
        title: 'Task 1',
        description: 'Description for task 1',
        dueDate: '2024-03-20',
        isComplete: false,
        reminder: false,
      },
      {
        id: '2',
        columnId: '1',
        title: 'Task 2',
        description: 'Description for task 2',
        dueDate: '2024-03-20',
        isComplete: false,
        reminder: false,
      },
      {
        id: '3',
        columnId: '1',
        title: 'Task 3',
        description: 'Description for task 3',
        dueDate: '2024-03-20',
        isComplete: false,
        reminder: false,
      },
      {
        id: '4',
        columnId: '1',
        title: 'Task 4',
        description: 'Description for task 4',
        dueDate: '2024-03-20',
        isComplete: false,
        reminder: false,
      },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    tasks: [
      {
        id: '5',
        columnId: '2',
        title: 'Task 5',
        description: 'Description for task 5',
        dueDate: '2024-03-20',
        isComplete: false,
        reminder: false,
      },
    ],
  },
  {
    id: '3',
    title: 'Done',
    tasks: [],
  },
];