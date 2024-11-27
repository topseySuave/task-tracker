'use client';

import { Box, HStack } from '@chakra-ui/react';
import { ToolbarProps } from "@/types";

import { ViewToggle } from "@/components/ToolbarUtils/ViewToggle";
import { FilterSection } from "../ToolbarUtils/FilterSection";
import { CustomizeButton } from "../ToolbarUtils/CustomizeButton";

export function Toolbar({ view, setView }: ToolbarProps) {
  return (
    <Box p={4} borderBottom="1px" borderColor="gray.200" bg="white">
      <HStack justify="space-between">
        <HStack gap={2}>
          <ViewToggle view={view} setView={setView} />
          <Box h="24px" w="1px" bg="gray.200" />
          <FilterSection />
        </HStack>
        <CustomizeButton />
      </HStack>
    </Box>
  );
}