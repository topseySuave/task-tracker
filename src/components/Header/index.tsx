'use client';

import { Box, Heading } from '@chakra-ui/react';

export function Header() {
  return (
    <Box
      p={[3, 4, 4]}
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
    >
      <Heading size={["sm", "md", "lg"]}>Owned</Heading>
    </Box>
  );
}