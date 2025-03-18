import { Container, Stack, Box, Heading, HStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SkillsSection from "../components/SkillsSection";

// Create motion components from Chakra components
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionContainer = motion(Container);

export default function Skills() {
  return (
    <MotionBox
      id="skills"
      pb={10}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <MotionContainer
        maxW={{ base: 'xl', md: '2xl', lg: '6xl' }}
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <HStack direction={{ base: 'column', md: 'column', lg: 'row' }} my='2' mr='5' w='full' justify={'space-between'}>
          <Stack w='full'>
            <Box>
              <MotionHeading
                textAlign="center"
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="bold"
                position="relative"
                color={useColorModeValue('gray.800', 'white')}
                pb={2}
                mb={2}
                borderBottom='2px'
                borderColor='primary.400'
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                SKILLS
              </MotionHeading>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <SkillsSection />
              </MotionBox>
            </Box>
          </Stack>
        </HStack>
      </MotionContainer>
    </MotionBox>
  );
}
