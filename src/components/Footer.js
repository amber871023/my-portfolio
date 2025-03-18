import { Box, Container, Stack, Image, Text, HStack, VStack, Spacer, Heading, IconButton, Link } from '@chakra-ui/react'
import logo from '../assets/logo_white.png';
import { Link as RouterLink } from 'react-router-dom';
import { FaEnvelope, FaLinkedin, FaGithub, FaFacebookSquare } from 'react-icons/fa';
import SpaceBackground from './SpaceBackground';

const MenuItems = ['Home', 'About', 'Skills', 'Project', 'Contact'];
export default function Footer() {
  return (
    <SpaceBackground>
      <Container
        maxW={'6xl'} py={5} spacing={4} justify={'center'}
        align={'space-between'}>
        <Stack direction={{ base: 'column', md: 'row' }}>
          {/* MenuItems */}
          <Stack pl={3} spacing={{ base: '3', md: '1' }} direction={{ base: 'row', md: 'column' }} justify={'center'} >
            {MenuItems.map((item) => (
              <Link
                href={`#${item.toLowerCase()}`} key={item} colorScheme='white' variant='link' mt={1} textStyle={'h5'}>{item}</Link>
            ))}
          </Stack>
          <Spacer />
          {/* Contact info only display in base mode  */}
          <Box display={{ base: '', md: 'none' }} align={'center'} mt={2}>
            <Heading size={'sm'} textAlign={{ base: 'center', md: 'start' }} mb={1}>Contact</Heading>
            <Link href='mailto:amber871023@gmail.com' isExternal>
              <IconButton px={0} icon={<FaEnvelope />} color="white" variant="ghost" aria-label="Email" fontSize='30px' />
            </Link>
            <Link href='www.linkedin.com/in/amber-cheng-202396227' isExternal>
              <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" color="white" variant="ghost" fontSize='30px' />
            </Link>
            <Link href="https://github.com/amber871023" isExternal>
              <IconButton icon={<FaGithub />} aria-label="Github" color="white" variant="ghost" fontSize='30px' />
            </Link>
            <Link href="https://www.facebook.com/amberCYT" isExternal>
              <IconButton icon={<FaFacebookSquare />} aria-label="Facebook" color="white" variant="ghost" fontSize='30px' />
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
              <Link href='mailto:amber871023@gmail.com' isExternal>
                <IconButton px={0} icon={<FaEnvelope />} color="white" variant="ghost" aria-label="Email" fontSize='26px' />
                <span>amber871023@gmail.com</span>
              </Link>
            </HStack>
            <Link href='https://linkedin.com/in/amber-cheng-202396227/' isExternal>
              <IconButton icon={<FaLinkedin />} aria-label="LinkedIn" color="white" variant="ghost" fontSize='30px' />
            </Link>
            <Link href="https://github.com/amber871023" isExternal>
              <IconButton icon={<FaGithub />} aria-label="Github" color="white" variant="ghost" fontSize='30px' />
            </Link>
            <Link href="https://www.facebook.com/amberCYT" isExternal>
              <IconButton icon={<FaFacebookSquare />} aria-label="Facebook" color="white" variant="ghost" fontSize='30px' />
            </Link>
          </Box>
        </Stack>
      </Container>
    </SpaceBackground >
  )
}
