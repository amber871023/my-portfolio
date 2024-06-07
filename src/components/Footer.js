import { Box, Container, Stack, Image, Button, Text, HStack, VStack, Spacer, Heading, IconButton, Link } from '@chakra-ui/react'
import logo from '../assets/logo_white.png';
import { Link as RouterLink } from 'react-router-dom';
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram, FaFacebookSquare } from 'react-icons/fa';

const MenuItems = ['About', 'Resume', 'Portfolio'];
export default function Footer() {
  return (
    <Box bg={'primary.500'} color={'white'}>
      <Container
        maxW={'6xl'} py={5} spacing={4} justify={'center'}
        align={'space-between'}>
        <Stack direction={{ base: 'column', md: 'row' }}>
          {/* MenuItems */}
          <Stack pl={3} spacing={{ base: '3', md: '1' }} direction={{ base: 'row', md: 'column' }} justify={'center'} >
            <Button
              as={RouterLink} to={'/'} colorScheme='white' variant='link' textStyle={'h4'}>Home</Button>
            {MenuItems.map((item) => (
              <Button
                as={RouterLink} to={`/${item}`} key={item} colorScheme='white' variant='link' mt={1} textStyle={'h4'}>{item}</Button>
            ))}
          </Stack>
          <Spacer />
          {/* Contact info only display in base mode  */}
          <Box display={{ base: '', md: 'none' }} align={'center'} mt={2}>
            <Heading size={'sm'} textAlign={{ base: 'center', md: 'start' }} mb={1}>Contact</Heading>
            <Link href='mailto:n11422807@qut.edu.au' isExternal>
              <IconButton px={0} icon={<FaEnvelope />} colorScheme='primary.500' aria-label="Email" fontSize='30px' />
            </Link>
            <Link href='www.linkedin.com/in/amber-cheng-202396227' isExternal>
              <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" colorScheme='primary.500' fontSize='30px' />
            </Link>
            <Link href="https://github.com/amber871023" isExternal>
              <IconButton icon={<FaGithub />} aria-label="Github" colorScheme='primary.500' fontSize='30px' />
            </Link>
            <Link href="https://www.facebook.com/amberCYT" isExternal>
              <IconButton icon={<FaFacebookSquare />} aria-label="Facebook" colorScheme='primary.500' fontSize='30px' />
            </Link>
            <Link href="https://www.instagram.com/amber_cyttt/" isExternal>
              <IconButton icon={<FaInstagram />} aria-label="Instagram" colorScheme='primary.500' fontSize='30px' />
            </Link>
          </Box>
          {/* logo and copyright */}
          <VStack>
            <Box as={RouterLink} to={'/'}>
              <Image src={logo} alt='yi ting' w="150px" h="60px" />
            </Box>
            <Text borderTopWidth={1} borderStyle={'solid'} borderColor={'white'}>© 2024 YiTing Cheng. All rights reserved</Text>
          </VStack>
          <Spacer />
          {/* Contact info */}
          <Box display={{ base: 'none', md: 'block' }} align={'left'} mt={2}>
            <Heading size={'sm'} textAlign={{ base: 'center', md: 'start' }} mb={1}>Contact</Heading>
            <HStack >
              <Link href='mailto:n11422807@qut.edu.au' isExternal>
                <IconButton px={0} icon={<FaEnvelope />} colorScheme='primary.500' aria-label="Email" fontSize='26px' />
                <span>n11422807@qut.edu.au</span>
              </Link>
            </HStack>
            <Link href='https://linkedin.com/in/amber-cheng-202396227/' isExternal>
              <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" colorScheme='primary.500' fontSize='30px' />
            </Link>
            <Link href="https://github.com/amber871023" isExternal>
              <IconButton icon={<FaGithub />} aria-label="Github" colorScheme='primary.500' fontSize='30px' />
            </Link>
            <Link href="https://www.facebook.com/amberCYT" isExternal>
              <IconButton icon={<FaFacebookSquare />} aria-label="Facebook" colorScheme='primary.500' fontSize='30px' />
            </Link>
            <Link href="https://www.instagram.com/amber_cyttt/" isExternal>
              <IconButton icon={<FaInstagram />} aria-label="Instagram" colorScheme='primary.500' fontSize='30px' />
            </Link>
          </Box>
        </Stack>
      </Container>
    </Box >
  )
}
