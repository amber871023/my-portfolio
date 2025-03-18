import { Container, Stack, Box, Heading, HStack } from "@chakra-ui/react";
import SkillsSection from "../components/SkillsSection";

export default function Skills() {
  return (
    <Box id="skills" pb={10}>
      <Container maxW={{ base: 'xl', md: '2xl', lg: '6xl' }} >
        <HStack direction={{ base: 'column', md: 'column', lg: 'row' }} my='2' mr='5' w='full' justify={'space-between'}>
          <Stack w='full'>
            <Box>
              <Heading fontSize={{ base: 'xl', md: '3xl' }} fontWeight='200' mb={2} borderBottom='2px' borderColor='primary.400'>SKILLS</Heading>
              <SkillsSection />
            </Box>
          </Stack>
        </HStack>
      </Container >
    </Box>
  );
}

