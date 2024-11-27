import { HStack, Text } from "@chakra-ui/react";
import { SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomizeButton() {
  return (
    <Button size="sm" variant="ghost" color="gray.600">
      <HStack gap={2}>
        <SlidersHorizontalIcon size={16} />
        <Text>Customize</Text>
      </HStack>
    </Button>
  );
}