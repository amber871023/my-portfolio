import { Box, Flex, Text, Icon, VStack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDatabase, FaCode, FaAws, FaFigma, FaPython } from "react-icons/fa";
import { SiSass, SiJavascript, SiMongodb, SiMongoose, SiExpress, SiAdobexd, SiVuedotjs, SiCsharp } from "react-icons/si";
import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const skillsData = [
  {
    category: "Programming Languages", skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Python", icon: FaPython, color: "#3776AB" },
      { name: "C#", icon: SiCsharp, color: "#239120" },
      { name: "SQL", icon: FaDatabase, color: "#4479A1" }
    ]
  },
  {
    category: "Frontend Development", skills: [
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "SCSS", icon: SiSass, color: "#CC6699" },
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "React Native", icon: FaReact, color: "#61DAFB" },
      { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" }
    ]
  },
  {
    category: "Backend Development", skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Express.js", icon: SiExpress, color: "#000000" },
      { name: "RESTful API", icon: FaCode, color: "#000000" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000" },
    ]
  },
  {
    category: "DevOps & Tooling", skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#181717" },
      { name: "AWS", icon: FaAws, color: "#FF9900" }
    ]
  },
  {
    category: "UI/UX Design", skills: [
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "Adobe XD", icon: SiAdobexd, color: "#FF61F6" }
    ]
  }
];

const MotionBox = motion(Box);

export default function SkillsSection() {
  const textColor = useColorModeValue("gray.800", "white");
  const cardBgColor = useColorModeValue("gray.50", "gray.600");
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <VStack spacing={6} w="full" position="relative">
      <Flex w="full" align="center" justify="space-between">
        <ChevronLeftIcon boxSize={8} cursor="pointer" onClick={() => scroll("left")} />
        <Box overflow="hidden" w="90%">
          <Flex ref={scrollRef} overflowX="scroll" gap={6} p={2} scrollBehavior="smooth" css={{ "&::-webkit-scrollbar": { display: "none" } }}>
            {skillsData.map((group, index) => (
              <MotionBox
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                borderRadius="lg"
                bg={cardBgColor}
                boxShadow="lg"
                p={6}
                minW="300px"
                justifyItems={'center'}
                textAlign="center"
              >
                <Text fontWeight="bold" fontSize="xl" mb={4} color={textColor}>{group.category}</Text>
                <VStack spacing={3} align={'flex-start'}>
                  {group.skills.map((skill, skillIndex) => (
                    <Flex key={skillIndex} align="center" gap={3}>
                      <Icon as={skill.icon} color={skill.color} boxSize={8} />
                      <Text fontSize="md" color={textColor}>{skill.name}</Text>
                    </Flex>
                  ))}
                </VStack>
              </MotionBox>
            ))}
          </Flex>
        </Box>
        <ChevronRightIcon boxSize={8} cursor="pointer" onClick={() => scroll("right")} />
      </Flex>
    </VStack>
  );
}
