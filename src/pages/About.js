import { Container, Stack, Flex, Box, Text, Image, Heading, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import hero from "../assets/hero.jpg";

export default function About() {
  return (
    <Container maxW={'full'} bg='primary.50' >
      <Stack

        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 20 }}
        direction={{ base: 'column', md: 'row' }}
      >
        {/* Intro of myself  */}
        <Stack flex={1}
          bg='primary.50'

          px={{ base: '10', md: '60px' }}
          rounded='2xl'
          spacing={{ base: 4, md: 5 }}
          textAlign={{ base: 'center', md: 'left' }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', md: '4xl' }}
          >Know more about me...</Heading>
          <Text color={'gray.500'} textStyle={'h4'}>
            I'm someone with an insatiable passion for learning programming languages to continually enhance my skills and broaden my horizons. I find joy in immersing myself in the world of technology, surrounded by diverse perspectives and challenges that fuel my growth.
          </Text>
          <Text color={'gray.500'} textStyle={'h4'}>
            My journey in programming has led me to explore a variety of languages, including React, Vue, Node.js, C#, and Python. Beyond coding, I have a keen interest in UI design, with a focus on crafting visually appealing and intuitive interfaces for websites.
          </Text>
          <Text color={'gray.500'} textStyle={'h4'}>
            My hobbies...
          </Text>

        </Stack>
        {/* Intro Image */}
        <Flex flex={1} position={"relative"}
          pr={{ base: "10", md: "60px" }}>
          <Box
            position={"relative"}
            height={"510px"} width={"full"}
            rounded={"2xl"} boxShadow={"2xl"}
            overflow={"hidden"}
          >
            <Image src={''} alt={"Hero image"}
              fit={"cover"}
              align={"center"}
              w={"100%"} h={"100%"} />
          </Box>
        </Flex>
      </Stack>

    </Container >
  );
}

