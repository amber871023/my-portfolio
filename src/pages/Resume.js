import { Container, Heading, Stack, VStack, HStack, Box, Text, Card, CardHeader, CardBody, StackDivider, UnorderedList, ListItem, Progress } from "@chakra-ui/react";
import SkillProgress from "../components/SkillProgress";
import EducationCard from "../components/EducationCard";
import ExperienceCard from "../components/ExperienceCard";


export default function Resume() {
  return (
    <Box bg='primary.200' p='10'>
      <Container bgColor='white' maxW={'7xl'} py={'10'} px={{ base: '10', md: '20' }} boxShadow='xl'>
        {/* overview summary  */}
        <Heading align='center'>Yi-Ting, Cheng</Heading>
        <Box mb='5'>
          <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>SUMMARY</Heading>
          <Text borderBottom='2px' borderColor='primary.400' py='2'>
            Aspiring software engineer with a fervent dedication to mastering a diverse range of programming languages and technologies. Skilled in frontend development with Vue and backend development with Node.js.
            Beyond coding, I have a keen eye for creating captivating user interfaces, blending creativity with technical proficiency to deliver exceptional user experiences.
          </Text>
        </Box>
        {/* */}
        <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} justify={'space-between'}>
          {/*  Education and Experience */}
          <VStack direction={{ base: 'column', md: 'column', lg: 'row' }} my='2' mr='5' w='full'>
            <Stack w='full'>
              {/*  Education */}
              <Box>
                <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>EDUCATION</Heading>
                <EducationCard
                  title="Master of IT"
                  date="2023-2024"
                  description="Current GPA: 5.875/7.00"
                />
                <EducationCard
                  title="BA of MIS"
                  date="2017-2021"
                  description="GPA: 3.32/4.00"
                  extra="Activities and societies : Dance club"
                />
              </Box>
              {/*  Experience */}
              <Box>
                <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>EXPERIENCE</Heading>
                <ExperienceCard
                  title="Finance Part-Time (July 2017 - Aug 2017)"
                  company="JMO - Zhong Yang Technology Co., Ltd."
                  period="July 2017 - Aug 2017"
                  duties={[
                    "Assisting in the handling of company listing and finance department related matters.",
                    "Recording and consolidating accounting subpoena generated from transactions, and register them into",
                    "Compilation of import and export declarations",
                    "Assisting in company business tax returns"
                  ]}
                />
              </Box>
            </Stack>
          </VStack>
          {/*  Skills and Publications */}
          <VStack direction={{ base: 'column', md: 'column', lg: 'row' }} my='2' w='full'>
            <Stack w='full'>
              {/*  Skills */}
              <Box>
                <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>SKILLS</Heading>
                <SkillProgress />
              </Box>
              {/*  Publications */}
              <Box>
                <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' borderBottom='2px' borderColor='primary.400'>PUBLICATIONS</Heading>
                <Text> Will be added later... </Text>
              </Box>
            </Stack>
          </VStack>
        </Stack>
      </Container >
    </Box >
  );
}