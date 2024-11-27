import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@/components/ui/menu";
import { HStack, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GroupByMenu() {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button size="sm" variant="ghost" color="gray.600">
          <HStack gap={2}>
            <Text>Group by: Custom</Text>
            <ChevronDownIcon size={16} />
          </HStack>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem p={2} value="status">Status</MenuItem>
        <MenuItem p={2} value="priority">Priority</MenuItem>
        <MenuItem p={2} value="assignee">Assignee</MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}