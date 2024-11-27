'use client';

import { VStack, Heading, Button, useDisclosure, Text, HStack } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from './Task';
import { AddTaskDialog } from '../ui/AddTaskDialog';
import type { Column as ColumnType, Task as TaskType } from '@/types';
import { PlusIcon } from 'lucide-react';

interface ColumnProps {
  column: ColumnType;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

export function Column({ column, setColumns }: ColumnProps) {
  const { open, onOpen, onClose } = useDisclosure();

  // The useDroppable hook is used to create a droppable element.
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  // The addTask function is used to add a new task to the column.
  const addTask = (taskData: Omit<TaskType, 'id' | 'columnId'>) => {
    setColumns(prev => prev.map(col => {
      // If the column ID matches the task's column ID, add the task to the column.
      if (col.id === column.id) {
        // Return the column with the new task added to the tasks array.
        return {
          ...col,
          tasks: [...col.tasks, {
            ...taskData,
            id: Date.now().toString(),
            columnId: column.id
          }]
        };
      }
      // Otherwise, return the column as is.
      return col;
    }));
  };

  return (
    <VStack
      ref={setNodeRef}
      minW="300px"
      flex="1"
      bg={isOver ? "gray.100" : "transparent"}
      borderRadius="lg"
      align="stretch"
      gap={4}
      transition="background-color 0.2s"
      h="100%"
    >
      <HStack justify="space-between" align="center">
        <Heading size="md" color="gray.700">{column.title}</Heading>
        <Text color="gray.500">
          {column.tasks.length}
        </Text>
      </HStack>

      <VStack
        flex={1}
        minH="100px"
        overflowY="auto"
        align="stretch"
        gap={2}
        bg="white"
        borderRadius="md"
        p={4}
        boxShadow="sm"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <SortableContext
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              setColumns={setColumns}
            />
          ))}
        </SortableContext>

        <Button
          size="sm"
          variant="ghost"
          onClick={onOpen}
          color="gray.500"
          justifyContent="flex-start"
          _hover={{ bg: "gray.50" }}
        >
          <PlusIcon size={16} />
          New Task
        </Button>
      </VStack>

      <AddTaskDialog
        isOpen={open}
        onClose={onClose}
        onSubmit={addTask}
      />
    </VStack>
  );
}