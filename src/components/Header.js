import white_logo from '../assets/logo_white.png';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, useColorModeValue, useColorMode, Stack, Container, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import SpaceBackground from './SpaceBackground';

const Links = ['Home', 'About', 'Skills', 'Projects'];

const NavLink = ({ children, onClick }) => {
  return (
    <Box as="a" px={2} py={1} rounded="md"
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('primary.300', 'gray.700'),
      }}
      href={`#${children.toLowerCase()}`}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLinkClick = () => {
    if (isOpen) {
      onClose();
    }
  }
  return (
    <Box as="header" position="fixed" w="100%" zIndex={10} boxShadow={'2xl'}>
      <SpaceBackground>
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Open Menu"
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack alignItems="center">
              <Image src={white_logo} alt='yi ting' w='40px' h='40px' />
            </HStack>
            <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
            <Flex alignItems="center">
              <Button onClick={toggleColorMode} mr={4}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as="nav" spacing={4} align={'center'}>
                {Links.map((link) => (
                  <NavLink key={link} onClick={handleLinkClick}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Container>
      </SpaceBackground>
    </Box>
  );
}
