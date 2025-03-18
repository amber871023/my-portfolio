import { Box, keyframes, useColorModeValue } from "@chakra-ui/react";

const twinkle = keyframes`
  0% { opacity: 0.3; transform: translateY(0px); }
  50% { opacity: 1; transform: translateY(-5px); }
  100% { opacity: 0.3; transform: translateY(0px); }
`;

export default function SpaceBackground({ children }) {
  return (
    <Box
      bgGradient={useColorModeValue("linear(270deg, brown, primary.600)", "linear(270deg, #182848,gray.900)")}
      position="relative"
      overflow="hidden"
    >
      {/* Floating Twinkling Stars */}
      {Array(30)
        .fill("")
        .map((_, i) => {
          const size = `${Math.random() * 4 + 3}px`;
          return (
            <Box
              key={i}
              position="absolute"
              w={size}
              h={size}
              bg="white"
              borderRadius="50%"
              opacity={Math.random() * 0.5 + 0.3}
              top={`${Math.random() * 100}%`}
              left={`${Math.random() * 100}%`}
              animation={`${twinkle} ${Math.random() * 3 + 2}s infinite ease-in-out`}
            />
          );
        })}

      <Box position="relative" zIndex="2" color="white" textAlign="center">
        {children}
      </Box>
    </Box>
  );
}
