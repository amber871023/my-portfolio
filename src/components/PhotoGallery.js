import React from 'react';
import { Grid, GridItem, Text, Image, Link, Box, Heading, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const PhotoGallery = ({ albums }) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} align='center'>
      {albums.map((album, index) => (
        <Link
          key={index} as={NavLink} to={`/Portfolio/albums/${album.id}`}
          _hover={{ textDecoration: 'none' }}
        >
          <GridItem boxShadow={'2xl'} position="relative" borderRadius="lg" overflow="hidden" _hover={{ opacity: 0.7 }}>
            <Box maxW={'sm'} h={'100%'} bg='white' rounded={'md'} p={6} overflow={'hidden'}>
              <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} height={'300px'}>
                <Image src={album.coverPhotoUrl} alt={`Photo ${index + 1}`} objectFit={'cover'} h={'100%'} w={'full'} />
              </Box>
              <Text
                position="absolute" bottom={'40%'}
                left={0} right={0} top={'30%'}
                textAlign="center" color="white" p={5}
                fontWeight="bold" fontSize="sm"
              >
                See more photo
              </Text>
              <Stack>
                <Heading color='gray.700' fontSize={'2xl'}>
                  {album.title}
                </Heading>
              </Stack>
            </Box>
          </GridItem>
        </Link>
      ))}
    </Grid>
  );
};

export default PhotoGallery;
