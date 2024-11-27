'use client';

import {
  VStack,
  HStack,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Button } from './button';
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "./field";
import { Calendar, Bell, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Task } from '@/types';

interface TaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onSubmit: (task: Partial<Task>) => void;
}

export function TaskDialog({ isOpen, onClose, task, onSubmit }: TaskDialogProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    isComplete: task.isComplete,
    reminder: task.reminder,
  });

  useEffect(() => {
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      isComplete: task.isComplete,
      reminder: task.reminder,
    });
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle marginBottom={3}>Edit Task</DialogTitle>
          </DialogHeader>

          <DialogBody>
            <VStack gap={4} align="stretch">
              <Field label="Title" required>
                <Input
                  padding={3}
                  placeholder="Enter task title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Field>

              <Field label="Description">
                <Textarea
                  padding={3}
                  placeholder="Enter task description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </Field>

              <Field label="Due Date">
                <HStack gap={2}>
                  <Calendar size={16} />
                  <Input
                    padding="0 0.5rem"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </HStack>
              </Field>

              <Field>
                <HStack gap={2}>
                  <Button
                    size="sm"
                    variant={formData.isComplete ? "solid" : "ghost"}
                    colorScheme="green"
                    onClick={() => setFormData(prev => ({ ...prev, isComplete: !prev.isComplete }))}
                    type="button"
                  >
                    <CheckCircle size={16} />
                    Mark as Complete
                  </Button>
                  <Button
                    size="sm"
                    variant={formData.reminder ? "solid" : "ghost"}
                    colorScheme="purple"
                    onClick={() => setFormData(prev => ({ ...prev, reminder: !prev.reminder }))}
                    type="button"
                  >
                    <Bell size={16} />
                    Set Reminder
                  </Button>
                </HStack>
              </Field>
            </VStack>
          </DialogBody>

          <DialogFooter>
            <HStack gap={2}>
              <DialogCloseTrigger asChild>
                Cancel
              </DialogCloseTrigger>
              <Button type="submit" colorScheme="blue">
                Update Task
              </Button>
            </HStack>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}