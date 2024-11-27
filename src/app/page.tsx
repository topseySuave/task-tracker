'use client';

import { Box } from '@chakra-ui/react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';
import { Column } from '@/components/Board/Column';
import { initialColumns } from '@/lib/initialData';
import { Header } from '@/components/Header';
import { Toolbar } from '@/components/Toolbar';
import { useBoardDragDrop } from '@/hooks/useBoardDragDrop';
import { useBoardView } from '@/hooks/useBoardView';

export default function Home() {
  const {
    columns,
    setColumns,
    activeId,
    sensors,
    findTask,
    handleDragStart,
    handleDragEnd,
  } = useBoardDragDrop(initialColumns);

  const { view, setView } = useBoardView();

  return (
    <Box minH="100vh" bg="gray.50" color="gray.900">
      <Header />
      <Toolbar view={view} setView={setView} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {view === 'kanban' ? (
          <Box
            display="flex"
            minH="calc(100vh - 120px)"
            p={4}
            gap={6}
            overflowX="auto"
          >
            {columns.map(column => (
              <Column
                key={column.id}
                column={column}
                setColumns={setColumns}
              />
            ))}
          </Box>
        ) : (
          <Box p={4}>List view coming soon...</Box>
        )}

        <DragOverlay>
          {activeId ? (
            <Box
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="lg"
              opacity={0.9}
            >
              {findTask(activeId)?.title}
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
}