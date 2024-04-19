import { Box, Heading, HStack, VStack, Text, Progress } from "@chakra-ui/react";

const skills = [
  { name: "HTML", value: 100 },
  { name: "CSS, SCSS", value: 100 },
  { name: "JavaScript", value: 90 },
  { name: "Vue", value: 80 },
  { name: "React", value: 60 },
  { name: "Node.js", value: 80 },
  { name: "C#", value: 90 },
  { name: "Python", value: 70 },
  { name: "Git", value: 100 },
  { name: "MongoDB", value: 90 },
  { name: "SQL", value: 100 },
];

const SkillProgress = () => {
  const halfIndex = Math.ceil(skills.length / 2);
  const firstHalf = skills.slice(0, halfIndex);
  const secondHalf = skills.slice(halfIndex);
  return (
    <Box>
      <HStack spacing={10} mt={4}>
        <VStack align="start" w='full'>
          {firstHalf.map((skill, index) => (
            <Box key={index} w='full'>
              <Text>{skill.name}</Text>
              <Progress value={skill.value} size='sm' colorScheme='orange' my='1' rounded="full" />
            </Box>
          ))}
        </VStack>
        <VStack align="start" w='full'>
          {secondHalf.map((skill, index) => (
            <Box key={index} w='full'>
              <Text>{skill.name}</Text>
              <Progress value={skill.value} size='sm' colorScheme='orange' my='1' rounded="full" />
            </Box>
          ))}
          <Text mt='5'>Others: Figma, AdobeXD</Text>
        </VStack>
      </HStack>
    </Box>
  );
};
export default SkillProgress;
