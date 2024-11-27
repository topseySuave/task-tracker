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
import { Calendar, Bell } from 'lucide-react';
import { useState } from 'react';
import type { Task } from '@/types';

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'columnId'>) => void;
}

export function AddTaskDialog({ isOpen, onClose, onSubmit }: AddTaskDialogProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    isComplete: false,
    reminder: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      isComplete: false,
      reminder: false,
    });
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle marginBottom={3}>Add New Task</DialogTitle>
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
                    type="date"
                    padding="0 0.5rem"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </HStack>
              </Field>

              <Field>
                <HStack gap={2}>
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
                Add Task
              </Button>
            </HStack>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
}