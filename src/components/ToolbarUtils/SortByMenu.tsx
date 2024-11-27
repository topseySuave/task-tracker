import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/menu";
import { HStack, Text } from "@chakra-ui/react";
import { SlidersHorizontalIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SortByMenu() {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button size="sm" variant="ghost" color="gray.600">
          <HStack gap={2}>
            <SlidersHorizontalIcon size={16} />
            <Text>Sort by: Custom</Text>
            <ChevronDownIcon size={16} />
          </HStack>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem p={2} value="createdDate">Created Date</MenuItem>
        <MenuItem p={2} value="dueDate">Due Date</MenuItem>
        <MenuItem p={2} value="priority">Priority</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}