import { Container, Stack, HStack, Box, Heading, Text, Button, useColorModeValue, Link, IconButton, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground";
import { FaDownload, FaLinkedin, FaGithub } from 'react-icons/fa';

const WavingHandAnimation = () => {
  return (
    <motion.span
      initial={{ y: 0 }}
      animate={{ y: [-10, 0, -10] }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
      style={{ display: "inline-block" }}
    >
      👋🏻
    </motion.span>
  );
};

export default function Home() {
  return (
    <SpaceBackground>
      < Container maxW={{ base: '2xl', md: '5xl', lg: '7xl' }} id="home" pt={10}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          {/* Brief Intro */}
          <Stack
            flex={1}
            bg={useColorModeValue("white", "gray.700")}
            opacity={'90%'}
            p={{ base: 10, md: "50px" }}
            rounded="2xl"
            spacing={{ base: 4, md: 5 }}
            w="full"
            boxShadow={'2xl'}
          >
            <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }} color={useColorModeValue("black", "white")}>
              <Text as="span">
                Hello, <WavingHandAnimation />
              </Text>
              <br />
              <Text as="span" bgGradient="linear(to-r, teal.400, blue.500)" bgClip="text">
                I'm Amber Cheng
              </Text>
              <br />
              <Text as="span">
                a Frontend Developer
              </Text>
            </Heading>
            <Text color="gray.400" textStyle="h3">
              Building bridges between imagination and reality through software.
            </Text>
            <Box>{
              <Button as="a" href="/Resume.pdf" download="Resume.pdf" rounded="full" size={{
                base: "md", md: "lg"
              }} bg={useColorModeValue("teal.400", "primary.300")} textColor="white"
                _hover={{
                  bgGradient: "linear(to-r, teal.400, primary.400)", textColor: "white",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
                <Icon as={FaDownload} mr={3} size={'sm'}></Icon>
                Resume
              </Button>
            }
              <Button as={Link} href="mailto:amber871023@gmail.com" isExternal
                position="relative"
                color={useColorModeValue("black", "white")} size={{
                  base: "md", md: "lg"
                }}
                bg="transparent" ml={4}
                overflow="hidden"
                sx={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    borderRadius: 'full',
                    padding: '3px',
                    background: 'linear-gradient(45deg, #2dd4bf,#3b82f6)',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    color: 'white',
                    transform: 'translateY(-2px)',
                    borderRadius: 'full',
                    textDecor: 'none',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    '&::before': {
                      opacity: 0,
                    },
                    background: 'linear-gradient(45deg, #2dd4bf,#3b82f6)',
                    _after: {
                      opacity: 1,
                      transform: 'scale(1)',
                    }
                  }
                }}>
                Contact me
              </Button>
            </Box>
            <HStack justify={'center'}>
              <Link href='https://linkedin.com/in/amber-cheng-202396227/' isExternal>
                <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" color={useColorModeValue("black", "white")} variant="ghost" fontSize='30px' />
              </Link>
              <Link href="https://github.com/amber871023" isExternal>
                <IconButton icon={<FaGithub />} aria-label="Github" color={useColorModeValue("black", "white")} variant="ghost" fontSize='30px' />
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Container >
    </SpaceBackground >
  );
}
