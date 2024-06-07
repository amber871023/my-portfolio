import { Container, Stack, Flex, Box, Text, Image, Heading } from "@chakra-ui/react";
import introImg from "../assets/introImg.jpg";
import WaveDivider from "../components/WaveDivider";
import AboutInfoAccordion from "../components/AboutInfoAccordion";

export default function About() {
  return (
    <><Box bg='primary.200'>
      <Container maxW={{ base: 'xl', md: '5xl', lg: '7xl' }}>
        <Stack
          py={{ base: 10, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
        >
          {/* Intro Image */}
          <Flex flex={1} position={"relative"}
            px={{ base: "10", md: "60px" }}>
            <Box
              position={'relative'}
              height={{ base: '410px', md: '420px', lg: '500px' }}
              rounded={'50%'}
              boxShadow={'2xl'}
              width={'full'}
              overflow={'hidden'}
            >
              <Image src={introImg} alt={"Intro image"}
                fit={"cover"}
                w={"100%"} h={"115%"} />
            </Box>
          </Flex>
          {/* Intro of myself  */}
          <Stack flex={1}
            pt={{ base: 0, md: 10 }}
            pr={{ base: 0, md: '60px' }}
            rounded='2xl'
            spacing={{ base: 4, md: 5 }}
            align={'center'}
            textAlign='left'>
            <Heading
              fontWeight={600}
              fontSize={{ base: '3xl', md: '3xl', lg: '4xl' }}
              bgGradient='linear(to-r, brown, primary.600)'
              bgClip='text'
            >Know more about me...</Heading>
            <Text color={'gray.600'} textStyle={'h4'}>
              Hello everyone, I'm Yiting, also known as Amber. I am currently pursuing a master's degree in IT at QUT. I'm someone with an insatiable passion for learning programming languages to continually enhance my skills and broaden my horizons. Being in the tech world brings me so much joy, especially when I'm faced with challenges that push me to get better every day.
            </Text>
            <Text color={'gray.600'} textStyle={'h4'}>
              My journey in programming has led me to explore a variety of languages, including React, Vue, Node.js, C#, and Python. Beyond coding, I have a keen interest in UI design, with a focus on crafting visually appealing and intuitive interfaces for websites.
            </Text>
          </Stack>
        </Stack>
      </Container>
      <WaveDivider />
    </Box>
      <Box bg={'white'} align={'center'} my={'50px'} >
        <AboutInfoAccordion />
      </Box ></>
  );
}

