import React, { useState, useEffect } from 'react';
import { Container, Button, HStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Highlight, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'

export default function PortfolioPhotography() {
  const navigate = useNavigate(); // Use useNavigate hook 
  const handleReturn = () => {
    navigate(-1); //Take users back to the previous page
  };

  const { id } = useParams();// Retrieve the albums object from the route parameters
  const albumId = id;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // Fetch photos for the specific album using the index
        const albumPhotos = await getAllPhotos(albumId);
        setPhotos(albumPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    fetchPhotos();
  }, [albumId]);

  // Function to fetch photos for a specific album
  const getAllPhotos = async (albumId) => {
    try {
      const apiKey = process.env.REACT_APP_FLICKR_API_KEY;
      const userId = process.env.REACT_APP_FLICKR_USER_ID;
      const albumPhotosUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&user_id=${userId}&format=json&nojsoncallback=1`;
      console.log(albumPhotosUrl);
      const response = await fetch(albumPhotosUrl);
      const data = await response.json();

      if (!data || !data.photoset || !data.photoset.photo) {
        throw new Error('Invalid response format');
      }
      const photos = data.photoset.photo.map(photo => ({
        id: photo.id,
        title: photo.title,
        url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
      }));

      return photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  };

  return (
    <Box bg='primary.200'>
      <Container maxW={'7xl'} py={10}>
        <Heading lineHeight='tall' textAlign='center'>
          <Highlight
            query='photography'
            styles={{ px: '3', pb: '2', rounded: 'full', bg: 'primary.700' }}
          >Welcome to my photography</Highlight>
        </Heading>
        <Tabs bg={'white'} rounded={'5px'} mt='10' isFitted colorScheme='primary'>
          <TabList>
            <Tab py={3}>All Photos</Tab>
          </TabList>
          <HStack justify={'space-between'}>
            <Button leftIcon={<ArrowBackIcon />} onClick={handleReturn} mt={4} ml={4} colorScheme="primary"> Back to Portfolio</Button>
            <Text mr={4} textAlign={'center'}>Total photos: {photos.length}</Text>
          </HStack>
          <TabPanels>
            <TabPanel>
              <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gap={4}
                justifyContent="center" >
                {photos.map((photo, index) => (
                  <GridItem key={index}>
                    <Image src={photo.url} alt={`Photo ${index + 1}`} borderRadius='lg'
                      boxSize={'md'}
                      objectFit="cover" //Ensure the entire image is visible, covering the grid cell
                    />
                  </GridItem>
                ))}
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
