import { Container, Stack, HStack, Box, Heading, Text, Button, useColorModeValue, Link, IconButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground";
import { FaLinkedin, FaGithub, FaFacebookSquare } from 'react-icons/fa';

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
  const colorGradient = useColorModeValue("linear(to-r, brown, primary.600)", "linear(to-l, #4b6cb7, #182848)");
  return (
    <SpaceBackground>
      < Container maxW={"7xl"} id="home" pt={10}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 20 }}
          direction={{ base: "column", md: "row" }}
        >
          {/* Brief Intro */}
          <Stack
            flex={1}
            bg={useColorModeValue("white", "gray.200")}
            opacity={'90%'}
            py={{ base: 10, md: "60px" }}
            px={{ base: 10, md: "60px" }}
            rounded="2xl"
            spacing={{ base: 4, md: 5 }}
            textAlign="left"
            w="full"
            boxShadow={'2xl'}
          >
            <Heading fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }} color={'black'}>
              <Text as="span">
                Hello, <WavingHandAnimation />
              </Text>
              <br />
              <Text as="span" bgGradient={colorGradient} bgClip="text">
                I'm Yi Ting
              </Text>
              <br />
              <Text as="span">
                a Frontend Developer
              </Text>
            </Heading>
            <Text color="gray.500" textStyle="h3">
              Building bridges between imagination and reality through software.
            </Text>
            <Box>{
              <Button as="a" href="/Resume.pdf" download="Resume.pdf" rounded="full" size={{
                base: "md", md: "lg"
              }} bg={useColorModeValue("primary.700", "blue.600")} textColor="white"
                _hover={{
                  bgGradient: colorGradient, textColor: "white",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
                Download Resume
              </Button>
            }
              <Button as={Link} href="mailto:amber871023@gmail.com" isExternal
                position="relative"
                color="black" size={{
                  base: "md", md: "lg"
                }}
                bg="transparent" ml={4}
                overflow="hidden"
                transition="all 0.3s ease"
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
                    background: 'linear-gradient(45deg, #de8e5c,#a52a2a)',
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
                    background: 'linear-gradient(45deg, #de8e5c,#a52a2a)',
                    _after: {
                      opacity: 1,
                      transform: 'scale(1)',
                    }
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    inset: '0',
                    background: 'linear-gradient(45deg, #de8e5c,#a52a2a)',
                    borderRadius: 'full',
                    opacity: '0',
                    transform: 'scale(0.9)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    zIndex: '-1',
                  }
                }}>
                Contact me
              </Button>
            </Box>
            <HStack>
              <Link href='https://linkedin.com/in/amber-cheng-202396227/' isExternal>
                <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" color="black" variant="ghost" fontSize='30px' />
              </Link>
              <Link href="https://github.com/amber871023" isExternal>
                <IconButton icon={<FaGithub />} aria-label="Github" color="black" variant="ghost" fontSize='30px' />
              </Link>
              <Link href="https://www.facebook.com/amberCYT" isExternal>
                <IconButton icon={<FaFacebookSquare />} aria-label="Facebook" color="black" variant="ghost" fontSize='30px' />
              </Link>
            </HStack>
          </Stack>
        </Stack>
      </Container >
    </SpaceBackground >
  );
}
