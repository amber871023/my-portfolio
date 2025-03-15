import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Flex, Box, Button, Image, Spacer, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import logo from '../assets/logo.png';

// const MenuItems = ['About', 'Resume', 'Portfolio'];
const MenuItems = ['About', 'Portfolio'];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <Box as={'nav'} bg='white' boxShadow='base' position='sticky' top='0' left='0' right='0' zIndex='100' width='100%' >
      <Container maxW={'7xl'}>
        <Flex p='2' position='relative'>
          {/* Logo */}
          <Box as={NavLink} to={'/'}>
            <Image src={logo} alt='yi ting' w={{ base: '120px', md: '150px' }} h={{ base: '50px', md: '55px' }} />
          </Box>
          <Spacer />
          {/* Menu */}
          <Box display={{ base: 'none', md: 'flex' }}>
            <Button
              as={NavLink} to={`/`} style={({ isActive }) => ({ color: isActive ? "brown" : "black" })} variant='link' mr={5} textStyle={'h3'} onClick={closeMenu}>Home</Button>
            {MenuItems.map((item) => (
              <Button
                as={NavLink} to={`/${item}`} key={item} style={({ isActive }) => ({ color: isActive ? "brown" : "black" })} variant='link' mr={5} textStyle={'h3'}>{item}</Button>
            ))}
          </Box>
          {/* toggleMenu-hamburger */}
          <Box display={{ base: 'flex', md: 'none' }}>
            <Button onClick={toggleMenu} colorScheme='white' variant='link'>
              {isOpen ? <CloseIcon /> : <HamburgerIcon />}
            </Button>
          </Box>
          {isOpen && (
            //display it in md size and hidden in base size
            <Stack display={{ base: 'flex', md: 'none' }} position='fixed' top='63px' left='0' bg='primary.500' p='2' mt='1' zIndex='100' width='100%'>
              <Flex direction='column'>
                <Button
                  as={NavLink} to={'/'} colorScheme='white' color={'white'} variant='link' mb='1' onClick={closeMenu}>Home</Button >
                {
                  MenuItems.map((item) => (
                    <Button
                      as={NavLink} to={`/${item}`} key={item} colorScheme='white' color={'white'} variant='link' mb='1' onClick={closeMenu}>{item}</Button>
                  ))
                }
              </Flex>
            </Stack>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
