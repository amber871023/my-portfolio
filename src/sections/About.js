import { Container, Stack, Flex, Box, Text, Image, Heading, useColorModeValue } from "@chakra-ui/react";
import introImg from "../assets/introImg.jpg";
import EducationCard from "../components/EducationCard";
import ExperienceCard from "../components/ExperienceCard";
import { motion } from "framer-motion";

const MotionHeading = motion(Heading);

export default function About() {
  return (
    <><Box bg={useColorModeValue('white', 'gray.900')} id="about" scrollMarginTop={'50px'}>
      <Container maxW={{ base: 'xl', md: '5xl', lg: '7xl' }}>
        <Stack
          py={{ base: 5, md: 10 }}
          direction={{ base: 'column', md: 'row' }}
        >
          {/* Intro Image */}
          <Flex flex={1} position={"relative"}
            px={{ base: "10", md: "60px" }}>
            <Box
              position={'relative'}
              height={{ base: '50%', md: '80%', lg: '500px' }}
              rounded={'50%'}
              boxShadow={'2xl'}
              width={'100%'}
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
            <MotionHeading
              fontWeight={600}
              fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
              bgGradient={useColorModeValue("linear(to-r, brown, primary.600)", "linear(to-l, #ffff, #4b6cb7)")} bgClip="text"
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              style={{
                backgroundSize: "200% auto",
                display: "inline-block",
              }}
            >
              Know more about me...
            </MotionHeading>
            <Text color={useColorModeValue('gray.600', "gray.50")} textStyle={'h4'}>
              Hi, I'm Yi Ting, also known as Amber. I am a front-end developer with a Master’s degree in Software Development from QUT. I'm someone with an insatiable passion for learning programming languages to continually enhance my skills and broaden my horizons. Being in the tech world brings me so much joy, especially when I'm faced with challenges that push me to get better every day.
            </Text>
            <Text color={useColorModeValue('gray.600', "gray.50")} textStyle={'h4'}>
              Beyond coding, I have a keen interest in UI design, with a focus on crafting visually appealing and intuitive interfaces for websites.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
      <Container maxW={{ base: 'xl', md: '2xl', lg: '6xl' }} my={{ base: 5, md: 10 }}>
        <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} w='full' justify={'space-between'} alignItems={'start'} spacing={10} >
          {/*  Experience */}
          <Box w={'full'}>
            <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>EXPERIENCE</Heading>
            <ExperienceCard
              title='Finance Part-Time'
              company='Zhong Yang Technology Co., Ltd.'
              location='Taichung City, Taiwan'
              period='July 2017 - Aug 2017'
              duties={[
                'Assisting in the handling of company listing and finance department related matters.',
                'Recording and consolidating accounting subpoena generated from transactions, and register them into',
                'Compilation of import and export declarations',
                'Assisting in company business tax returns'
              ]}
            />
          </Box>
          {/*  Education */}
          <Box w={'full'}>
            <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>EDUCATION</Heading>
            <EducationCard
              title='Master of IT - Software Development '
              university='Queensland University of Technology'
              period='Feb 2023- Nov 2024'
              gpa='GPA: 6.31/7.00'
              activeties='Activities & Societies : QUT Women in Tech club'
            />
            <EducationCard
              title='Bachelor of Information Management'
              period='Sep 2017- Jun 2021'
              university=' National Yunlin University of Science and Technology'
              gpa='GPA: 3.32/4.00'
              activeties='Activities & Societies : Dance club'
            />
          </Box>
        </Stack>
      </Container ></>
  );
}

