import { Container, Stack, Box, Heading, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import SpaceBackground from "../components/SpaceBackground";

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
  const buttonColor = useColorModeValue("")
  return (
    <SpaceBackground>
      < Container maxW={"6xl"} id="home" pt={10}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          {/* Brief Intro */}
          <Stack
            flex={1}
            bg={useColorModeValue("white", "gray.200")}
            py={{ base: "10", md: "100px" }}
            px={{ base: "10", md: "60px" }}
            rounded="2xl"
            spacing={{ base: 4, md: 5 }}
            textAlign="left"
            w="full"
            boxShadow={'2xl'}
          >
            <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }} color={'black'}>
              <Text as="span">
                Hello, <WavingHandAnimation />
              </Text>
              <br />
              <Text as="span" bgGradient={useColorModeValue("linear(to-r, brown, primary.600)", "linear(to-l, #4b6cb7, #182848)")}
                bgClip="text">
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
              <Button as="a" href="/Resume.pdf" download="Resume.pdf" rounded="full" size="lg" colorScheme="primary" _hover={{ bgGradient: "linear(to-r, brown, primary.600)", color: "black" }}>
                Resume
              </Button>
              <Button as={NavLink} to="/about" ml={4} rounded="full" size="lg" color={'black'}>
                Contact me
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Container >
    </SpaceBackground>
  );
}
