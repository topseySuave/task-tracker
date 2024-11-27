"use client";

import {
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  useDisclosure,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Pencil,
  Trash2,
  Calendar,
  Bell,
  Circle,
  CheckCircle,
} from "lucide-react";
import { TaskDialog } from "../ui/TaskDialog";
import type { Task as TaskType, Column } from "@/types";

interface TaskProps {
  task: TaskType;
  index: number;
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

export function Task({ task, setColumns }: TaskProps) {
  const { open, onOpen, onClose } = useDisclosure();

  // The useSortable hook is used to create the sortable task element.
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: false,
  });

  // The style object is used to apply styles to the task element.
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  // The deleteTask function is used to delete a task.
  const deleteTask = () => {
    // Update the columns state by removing the task from the column.
    setColumns((prev) =>
      prev.map((col) => {
        // If the column ID matches the task's column ID, remove the task from the column.
        if (col.id === task.columnId) {
          // Return the column with the task removed.
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== task.id),
          };
        }
        // Otherwise, return the column as is.
        return col;
      })
    );
  };

  // The updateTask function is used to update a task.
  const updateTask = (updatedTask: Partial<TaskType>) => {
    setColumns((prev) =>
      prev.map((col) => {
        // If the column ID matches the task's column ID, update the task.
        if (col.id === task.columnId) {
          // Return the column with the task updated.
          return {
            ...col,
            tasks: col.tasks.map((t) =>
              t.id === task.id ? { ...t, ...updatedTask } : t
            ),
          };
        }
        // Otherwise, return the column as is.
        return col;
      })
    );
  };

  // The columnLabels object is used to define the labels and colors for the task columns.
  const columnLabels = {
    "1": { label: "To Do", color: "blue" },
    "2": { label: "In Progress", color: "yellow" },
    "3": { label: "Done", color: "green" },
  } as const;

  return (
    <VStack
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      bg="white"
      p={3}
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.200"
      _hover={{
        bg: "gray.50",
        transform: "scale(1.02)",
        boxShadow: "sm",
      }}
      align="stretch"
      gap={2}
      boxShadow="sm"
      cursor="grab"
      _active={{ cursor: "grabbing" }}
      transition="all 0.2s"
    >
      <HStack gap={3} align="start">
        <IconButton
          aria-label="Toggle completion"
          variant="ghost"
          size="sm"
          color={task.isComplete ? "blue.500" : "gray.400"}
          onClick={() => updateTask({ isComplete: !task.isComplete })}
          _hover={{ color: task.isComplete ? "blue.600" : "gray.600" }}
          p={0}
          minW="auto"
        >
          {task.isComplete ? <CheckCircle size={18} /> : <Circle size={18} />}
        </IconButton>
        <Box flex={1}>
          <HStack justify="space-between" align="start" w="full">
            <VStack align="start" gap={1} flex={1}>
              <Text
                fontWeight="medium"
                fontSize="sm"
                lineHeight="short"
                color="gray.700"
                textDecoration={task.isComplete ? "line-through" : "none"}
                opacity={task.isComplete ? 0.7 : 1}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text
                  fontSize="xs"
                  color="gray.500"
                  lineHeight="tall"
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {task.description}
                </Text>
              )}
            </VStack>
            <HStack gap={1} align="center">
              <Button
                size="sm"
                variant="ghost"
                onClick={onOpen}
                p={1}
                minW="auto"
                height="auto"
                color="gray.400"
                _hover={{ color: "gray.600" }}
              >
                <Pencil size={14} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={deleteTask}
                p={1}
                minW="auto"
                height="auto"
                color="gray.400"
                _hover={{ color: "red.500" }}
              >
                <Trash2 size={14} />
              </Button>
            </HStack>
          </HStack>

          {(task.dueDate || task.reminder) && (
            <HStack mt={2} gap={3}>
              <Calendar size={14} color="gray" />
              {task.dueDate && (
                <HStack gap={1} align="center">
                  <Text fontSize="xs" color="gray.500">
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </HStack>
              )}
              {task.reminder && (
                <HStack gap={1} align="center">
                  <Bell size={14} color="gray" />
                  <Text fontSize="xs" color="gray.500">
                    Reminder
                  </Text>
                </HStack>
              )}
            </HStack>
          )}

          <HStack mt={2} gap={2}>
            {task.isComplete ? (
              <Badge
                colorScheme="green"
                variant="subtle"
                fontSize="xs"
                px={2}
                py={0.5}
                bg={"green.100"}
                color={"green.600"}
              >
                Complete
              </Badge>
            ) : (
              <Badge
                color={
                  columnLabels[task.columnId as keyof typeof columnLabels]
                    ?.color + ".600"
                }
                variant="subtle"
                bg={
                  columnLabels[task.columnId as keyof typeof columnLabels]
                    ?.color + ".100"
                }
                fontSize="xs"
                px={2}
                py={0.5}
              >
                {
                  columnLabels[task.columnId as keyof typeof columnLabels]
                    ?.label
                }
              </Badge>
            )}
          </HStack>
        </Box>
      </HStack>

      <TaskDialog
        isOpen={open}
        onClose={onClose}
        task={task}
        onSubmit={updateTask}
      />
    </VStack>
  );
}
