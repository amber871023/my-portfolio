import { Container, Stack, Box, Heading, Text, Button, Image, Icon } from "@chakra-ui/react";
import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const WavingHandAnimation = () => {
  return (
    <motion.span
      initial={{ y: 0 }}
      animate={{ y: [-10, 0, -10] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
      style={{ display: "inline-block" }}
    >
      👋🏻
    </motion.span>
  );
};

export default function Home() {
  return (
    <Container maxW={"7xl"} position="relative">
      {/* Background Animated Blobs */}
      <AnimatedBlob
        w={{ base: "200px", md: "300px" }}
        h={{ base: "200px", md: "300px" }}
        position="absolute"
        top="10%"
        left="5%"
        color="primary.200"
      />
      <AnimatedBlob
        w={{ base: "150px", md: "250px" }}
        h={{ base: "150px", md: "250px" }}
        position="absolute"
        top="20%"
        right="-20%"
        color="primary.300"
      />
      <AnimatedBlob
        w={{ base: "120px", md: "220px" }}
        h={{ base: "120px", md: "220px" }}
        position="absolute"
        bottom={{ base: "5%", md: "-15%" }}
        left="50%"
        color="primary.400"
      />

      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 20 }}
        direction={{ base: "column", md: "row" }}
      >
        {/* Brief Intro */}
        <Stack
          flex={1}
          bg="primary.50"
          py={{ base: "10", md: "100px" }}
          px={{ base: "10", md: "60px" }}
          rounded="2xl"
          spacing={{ base: 4, md: 5 }}
          textAlign={{ base: "center", md: "left" }}
          position="relative"
          w="full"
        >
          <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
            <Text as="span">
              Hello, <WavingHandAnimation />
            </Text>
            <br />
            <Text as="span" bgGradient="linear(to-r, brown, primary.600)" bgClip="text">
              I'm Yi Ting
            </Text>
            <br />
            <Text as="span">
              a Frontend Developer
            </Text>
          </Heading>
          <Text color="gray.500" textStyle="h3">
            Building bridges between imagination and reality through software.
          </Text>
          <Box>
            <Button as={NavLink} to="/about" rounded="full" size="lg" colorScheme="primary" variant="outline" _hover={{ bg: "primary.800", color: "white" }}>
              More About Me
            </Button>
            <Button as="a" href="/Resume.pdf" download="Resume.pdf" rounded="full" size="lg" ml={4} colorScheme="primary" _hover={{ bg: "primary.800", color: "white" }}>
              Resume
            </Button>
          </Box>
        </Stack>

        {/* Hero Image Section */}
        <Stack flex={1} position="relative" w="full">
          <Box position="relative" height="500px" width="full" rounded="2xl" boxShadow="2xl" overflow="hidden">
            <Image src={hero} alt="Hero image" fit="cover" align="center" w="100%" h="100%" />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

const blobShapes = [
  "M45.5,-44.5C59.2,-42.8,70.5,-28.6,76.3,-11.2C82,6.2,82.2,26.9,73.9,43.9C65.5,60.8,48.7,74.1,31.5,75.6C14.3,77.1,-3.1,66.8,-19.8,58.8C-36.4,50.8,-52.2,45,-58,34C-63.7,22.9,-59.4,6.6,-52.1,-4.8C-44.9,-16.2,-34.7,-22.7,-25.5,-25.2C-16.4,-27.7,-8.2,-26.1,3.9,-30.7C15.9,-35.4,31.9,-46.2,45.5,-44.5Z",
  "M37.2,-51.8C48.3,-42.8,56.4,-30.8,61.3,-17.9C66.2,-5,68,8,61.7,18.8C55.5,29.7,41.3,38.4,27.2,45.3C13.1,52.1,-0.8,57.1,-13.3,53.2C-25.9,49.3,-37.1,36.5,-47.8,22.4C-58.5,8.3,-68.6,-7.1,-66.8,-20.5C-64.9,-34,-51.1,-45.4,-37.6,-53.3C-24.1,-61.2,-12,-65.6,1.2,-67C14.5,-68.4,29,-66.7,37.2,-51.8Z",
  "M50.8,-62.1C64.6,-57.4,75.2,-43.5,80.8,-27.5C86.4,-11.5,86.9,6.6,78.8,19.6C70.7,32.7,54,40.7,39.5,48.2C25,55.8,12.5,62.9,-2.5,66.5C-17.4,70,-34.8,70,-43.9,60.4C-53.1,50.7,-54,31.5,-54.5,14.6C-55,-2.3,-55,10.3,-52.1,-3.6C-49.2,-17.5,-43.4,-35,-33.6,-44.2C-23.9,-53.4,-11.9,-54.4,2.5,-57.7C16.9,-61,33.8,-66.7,50.8,-62.1Z"
];

const getRandomBlob = () => blobShapes[Math.floor(Math.random() * blobShapes.length)];

const AnimatedBlob = (props) => {
  return (
    <Icon viewBox="0 0 200 200" {...props} overflow="visible">
      <motion.path
        fill="#FEEBC8"
        d={getRandomBlob()} // Randomly select a shape
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
          x: [-5, 5, -5],
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Icon>
  );
};

