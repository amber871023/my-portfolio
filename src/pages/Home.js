import { Container, Stack, Flex, Box, Heading, Text, Button, Image, Icon, } from "@chakra-ui/react";
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
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 20 }}
        direction={{ base: "column", md: "row" }}
      >
        {/* Brief Intro of myself  */}
        <Stack flex={1}
          bg="primary.50"
          py={{ base: "10", md: "100px" }}
          px={{ base: "10", md: "60px" }}
          rounded="2xl"
          spacing={{ base: 4, md: 5 }}
          textAlign={{ base: "center", md: "left" }}
          position={"relative"} w={"full"} >
          <Blob
            w={{ base: "150%", md: "160%" }} h={"200%"}
            position={"absolute"}
            bottom={"10%"}
            right={{ base: "30%", md: "45%" }}
            zIndex={-1}
            color={"primary.200"}
          />
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", lg: "6xl" }}
          >
            <Text as={"span"}>
              Hello,
              <WavingHandAnimation />
            </Text>
            <br />
            <Text as={"span"} color={"primary.800"}>
              I'm Yi Ting!
            </Text>
          </Heading>
          <Text color={"gray.500"} textStyle={"h3"}>
            Building bridges between imagination and reality through software.
          </Text>
          <Box>
            <Button as={NavLink} to={"/about"}
              rounded={"full"} boxShadow={"xl"} size={"lg"}
              px={{ base: "8", md: "12" }} colorScheme="primary"
              border={"2px"} variant="outline"
              _hover={{ bg: "primary.800", color: "white" }}>
              More About Me
            </Button>
          </Box>
        </Stack>
        <Stack flex={1} position={"relative"} w={"full"}>
          <Blob
            w={{ base: "60%", md: "100%", lg: "90%" }}
            h={{ base: "100%", md: "100%" }}
            position={"absolute"}
            bottom={"-50%"}
            left={{ base: "45%", md: "20%", lg: "20%" }}
            zIndex={-1}
            color={"primary.200"}
          />
          {/* Hero Image */}
          <Box
            position={"relative"}
            height={"500px"} width={"full"}
            rounded={"2xl"} boxShadow={"2xl"}
            overflow={"hidden"}
          >
            <Image src={hero} alt={"Hero image"}
              fit={"cover"} align={"center"}
              w={"100%"} h={"100%"} />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

const Blob = (props) => {
  return (
    <Icon viewBox="0 0 578 440" fill="none" {...props}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#FEEBC8"
          d="M45.5,-44.5C59.2,-42.8,70.5,-28.6,76.3,-11.2C82,6.2,82.2,26.9,73.9,43.9C65.5,60.8,48.7,74.1,31.5,75.6C14.3,77.1,-3.1,66.8,-19.8,58.8C-36.4,50.8,-52.2,45,-58,34C-63.7,22.9,-59.4,6.6,-52.1,-4.8C-44.9,-16.2,-34.7,-22.7,-25.5,-25.2C-16.4,-27.7,-8.2,-26.1,3.9,-30.7C15.9,-35.4,31.9,-46.2,45.5,-44.5Z"
          transform="translate(100 100)"
        />
      </svg>
    </Icon>
  );
};


