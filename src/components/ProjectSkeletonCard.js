import React from 'react';
import {
  Box, Stack, useColorModeValue, HStack, Skeleton, SkeletonText
} from '@chakra-ui/react';

export default function SkeletonCard() {
  const cardBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={cardBgColor}
    >
      <Skeleton height="200px" />
      <Box p={3}>
        <Stack spacing={3}>
          <Skeleton height="24px" width="70%" />
          <SkeletonText mt="2" noOfLines={2} spacing="2" />

          {/* Skeleton tags */}
          <Box>
            <HStack spacing={2} mt={2} flexWrap="wrap">
              <Skeleton height="20px" width="60px" borderRadius="full" />
              <Skeleton height="20px" width="80px" borderRadius="full" />
              <Skeleton height="20px" width="70px" borderRadius="full" />
            </HStack>
          </Box>

          <Box mt={2}>
            <Skeleton height="14px" width="50%" mb={2} />
            <Skeleton height="14px" width="60%" />
          </Box>

          <HStack mt={2}>
            <Skeleton height="40px" width="50%" borderRadius="md" />
            <Skeleton height="40px" width="50%" borderRadius="md" />
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};
