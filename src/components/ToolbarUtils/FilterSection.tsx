import { HStack, Text } from "@chakra-ui/react";
import { FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortByMenu } from "@/components/ToolbarUtils/SortByMenu";
import { GroupByMenu } from "./GroupByMenus";

export function FilterSection() {
  return (
    <HStack gap={1}>
      <Button size="sm" variant="ghost" color="gray.600">
        <HStack gap={2}>
          <FilterIcon size={16} />
          <Text>Filter 1</Text>
        </HStack>
      </Button>

      <SortByMenu />
      <GroupByMenu />
    </HStack>
  );
}