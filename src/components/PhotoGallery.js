import React from 'react';
import { Grid, GridItem, Text, Image, Link } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

const PhotoGallery = ({ albums }) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      gap={4}
      align='center'>
      {albums.map((album, index) => (
        <Link
          key={index}
          as={NavLink}
          to={`/Portfolio/albums/${album.id}`}
          _hover={{ textDecoration: 'none' }}
        >
          <GridItem position="relative" borderRadius="lg" overflow="hidden" _hover={{ opacity: 0.7 }}>
            <Image src={album.coverPhotoUrl} alt={`Photo ${index + 1}`} objectFit="cover" boxSize={'sm'} rounded={'10px'} />
            <Text
              position="absolute" bottom={'40%'}
              left={0} right={0}
              textAlign="center" color="white"
              p={5}
              fontWeight="bold" fontSize="sm"
            >
              {album.title}
            </Text>
          </GridItem>
        </Link>
      ))}
    </Grid>
  );
};

export default PhotoGallery;
