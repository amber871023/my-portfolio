import { Container, Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SkillsSection from "../components/SkillsSection";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function Skills() {
  const bgColor = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (

    <MotionBox
      id="skills"
      scrollMarginTop="64px"
      py={10}
      bg={bgColor}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW={{ base: "xl", md: "3xl", lg: "6xl" }} centerContent>
        <Box textAlign="center" mb={10}>
          <MotionHeading
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            color={headingColor}
            letterSpacing="tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            SKILLS
          </MotionHeading>

          <Text
            color={textColor}
            mt={4}
            fontSize="lg"
            maxW="3xl"
            mx="auto"
          >
            A comprehensive overview of the technologies I use to bring ideas to life
          </Text>
        </Box>

        <MotionBox
          w="full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SkillsSection />
        </MotionBox>
      </Container>
    </MotionBox>
  );
}
