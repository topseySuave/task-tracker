import { useState } from 'react';
import { DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import type { Column as ColumnType, Task } from '@/types';

export function useBoardDragDrop(initialColumns: ColumnType[]) {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [activeId, setActiveId] = useState<string | null>(null);

  /**
   * 
   * The useSensors hook is used to create sensors that can be used to detect drag and drop interactions.
   * Ref: https://docs.dndkit.com/presets/sortable#sensors
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  /***
   * 
   * The findTask function is used to find a task by its ID.
   */

  const findTask = (taskId: string): Task | undefined => {
    for (const column of columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
  };

  /**
   * 
   * The handleDragStart function is used to set the activeId when a drag interaction starts.
   */
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  /**
   * 
   * The handleDragEnd function is used to update the columns state when a drag interaction ends.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: { active: any; over: any }) => {
    const { active, over } = event;
    setActiveId(null);

    // If there is no active task, we don't need to update the columns state.
    if (!active) return;

    // Find the active task by its ID.
    const activeTask = findTask(active.id);
    // If there is no active task, we don't need to update the columns state.
    if (!activeTask) return;

    // Find the source column by the active task's column ID.
    const sourceColumn = columns.find(col => col.id === activeTask.columnId);
    // If there is no source column, we don't need to update the columns state.
    if (!sourceColumn) return;

    // If there is no over target, we don't need to update the columns state.
    if (!over) return;

    const overId = over.id;

    // Find the destination column by the over target's ID.
    let destinationColumn = columns.find(col => col.id === overId);
    // If there is no destination column, we need to find the column that contains the over task.
    // This is necessary when the over target is a task.
    if (!destinationColumn) {
      const overTask = findTask(overId);
      if (overTask) {
        destinationColumn = columns.find(col => col.id === overTask.columnId);
      }
    }

    // If there is no destination column, we don't need to update the columns state.
    if (!destinationColumn) return;

    /**
     * The setColumns function is used to update the columns state based on the drag and drop interaction.
     */
    setColumns(prev => {
      return prev.map(col => {
        // If the source column is the same as the destination column, we don't need to update the tasks list.
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter(task => task.id !== activeTask.id)
          };
        }

        // If the destination column is the same as the source column, we don't need to update the tasks.
        if (col.id === destinationColumn.id) {
          const newTasks = [...col.tasks];
          const overTask = findTask(overId);

          // If there is a task that we are dragging over, we need to insert the active task before it.
          // Otherwise, we need to add the active task to the end of the tasks list.
          if (overTask && overTask.columnId === destinationColumn.id) {
            const overTaskIndex = newTasks.findIndex(t => t.id === overId);
            newTasks.splice(overTaskIndex, 0, { ...activeTask, columnId: destinationColumn.id });
          } else {
            // If there is no task that we are dragging over, we need to add the active task to the end of the tasks list.
            newTasks.push({ ...activeTask, columnId: destinationColumn.id });
          }

          // Return the updated column with the new tasks.
          return {
            ...col,
            tasks: newTasks
          };
        }

        // Return the column as is if it is not the source or destination column.
        return col;
      });
    });
  };

  return {
    columns,
    setColumns,
    activeId,
    sensors,
    findTask,
    handleDragStart,
    handleDragEnd,
  };
}