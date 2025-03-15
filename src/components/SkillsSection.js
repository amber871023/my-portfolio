import { Box, Heading, Stack, Wrap, WrapItem, Tag, HStack, Icon, Text, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDatabase, FaAws, FaFigma } from "react-icons/fa";
import { SiJavascript, SiMongodb, SiExpress, SiAdobexd, SiVuedotjs } from "react-icons/si";

const skillsData = [
  {
    category: "Frontend",
    skills: [
      { name: "HTML", icon: FaHtml5 },
      { name: "CSS", icon: FaCss3Alt },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React.js", icon: FaReact },
      { name: "React Native", icon: FaReact },
      { name: "Vue.js", icon: SiVuedotjs }
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Express.js", icon: SiExpress },
      { name: "MongoDB", icon: SiMongodb },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    category: "Version Control",
    skills: [{ name: "Git", icon: FaGitAlt },
    { name: "Git Hub", icon: FaGithub }
    ],
  },
  {
    category: "Cloud Platforms",
    skills: [{ name: "Amazon Web Services", icon: FaAws }],
  },
  {
    category: "UI/UX Design",
    skills: [
      { name: "Figma", icon: FaFigma },
      { name: "Adobe XD", icon: SiAdobexd },
    ],
  },
];

const MotionTag = motion(Tag);

export default function SkillsSection() {
  return (
    <Stack mb={2}>
      {skillsData.map((category, index) => (
        <Box key={index}>
          <Heading as="h3" size="md" mb={3} color="gray.700">
            {category.category}
          </Heading>
          <Wrap>
            {category.skills.map((skill, i) => (
              <WrapItem key={i}>
                <MotionTag
                  size="lg"
                  px={5}
                  py={3}
                  borderRadius="full"
                  bg="orange.300"
                  color="black"
                  fontWeight="bold"
                  boxShadow="lg"
                  whileHover={{ scale: 1.1 }}
                  transition="0.2s"
                  _hover={{ bg: "orange.400" }}
                >
                  <HStack spacing={2}>
                    <Icon as={skill.icon} boxSize={5} />
                    <Text>{skill.name}</Text>
                  </HStack>
                </MotionTag>
              </WrapItem>
            ))}
          </Wrap>
          {index !== skillsData.length - 1 && <Divider my={3} />}
        </Box>
      ))}
    </Stack>
  );
}
