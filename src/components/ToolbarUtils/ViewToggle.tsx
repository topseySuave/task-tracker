import { HStack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { ListIcon, KanbanIcon } from "lucide-react";
import type { ToolbarProps } from "@/types";

export function ViewToggle({ view, setView }: ToolbarProps) {
  return (
    <HStack gap={1}>
      <Button
        variant="ghost"
        color={view === 'list' ? 'blue.500' : 'gray.600'}
        onClick={() => setView('list')}
        size="sm"
      >
        <HStack gap={2}>
          <ListIcon size={16} />
          <Text>List</Text>
        </HStack>
      </Button>
      <Button
        variant="ghost"
        color={view === 'kanban' ? 'blue.500' : 'gray.600'}
        onClick={() => setView('kanban')}
        size="sm"
      >
        <HStack gap={2}>
          <KanbanIcon size={16} />
          <Text>Kanban</Text>
        </HStack>
      </Button>
    </HStack>
  );
}