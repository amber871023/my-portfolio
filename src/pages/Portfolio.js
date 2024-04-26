import React, { useState, useEffect } from 'react';
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Box, Heading, Highlight, Select, Stack } from "@chakra-ui/react";
import PhotoGallery from "../components/PhotoGallery";
import ProjectList from "../components/ProjectList";

export default function Portfolio() {
  const apiKey = process.env.REACT_APP_FLICKR_API_KEY;
  const userId = process.env.REACT_APP_FLICKR_USER_ID;

  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchAlbumsData = async () => {
      try {
        const albumsData = await fetchAlbums();
        setAlbums(albumsData);
        setFilteredAlbums(albumsData); // Set filtered albums initially to all albums
      } catch (error) {
        console.error('Error fetching photo albums:', error);
        // Handle error: Display an error message to the user or retry fetching albums
      }
    };
    fetchAlbumsData();
  }, []);

  useEffect(() => {
    // Filter albums based on the selected option whenever it changes
    if (selectedOption === 'All') {
      setFilteredAlbums(albums); // Show all albums
    } else {
      const filtered = albums.filter(album => album.title.toLowerCase().includes(selectedOption.toLowerCase()));
      setFilteredAlbums(filtered);
      console.log(filtered);// Show albums containing the selected option in the title
    }
  }, [selectedOption, albums]);

  async function fetchAlbums() {
    try {
      const albumListUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`;
      const response = await fetch(albumListUrl);
      const data = await response.json();
      if (!data || !data.photosets || !data.photosets.photoset) {
        throw new Error('Invalid response format');
      }
      const albums = data.photosets.photoset;
      const albumDetails = await Promise.all(albums.map(async (album) => {
        const albumInfoUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${album.id}&user_id=${userId}&format=json&nojsoncallback=1`;

        const albumInfoResponse = await fetch(albumInfoUrl);
        const albumInfoData = await albumInfoResponse.json();
        const photos = albumInfoData.photoset.photo;
        return {
          id: album.id,
          title: album.title._content,
          totalPhotos: albumInfoData.photoset.total,
          // Assuming the first photo in the album is the cover photo
          coverPhotoUrl: `https://live.staticflickr.com/${photos[0].server}/${photos[0].id}_${photos[0].secret}_b.jpg`
        };
      }));
      //console.log('Album details:', albumDetails);
      return albumDetails;
    } catch (error) {
      console.error('Error fetching photo albums:', error);
      throw error;
    }
  }
  return (
    <Box bg='primary.200'>
      <Container maxW={'7xl'} py={10}>
        <Heading lineHeight='tall' textAlign='center'>
          <Highlight
            query='portfolio'
            styles={{ px: '3', pb: '2', rounded: 'full', bg: 'primary.700' }}
          >Welcome to my portfolio</Highlight>
        </Heading>
        <Tabs bg={'white'} rounded={'5px'} mt='10' isFitted colorScheme='primary'>
          <TabList>
            <Tab py={3}>GitHub Projects</Tab>
            <Tab py={3}>Photography</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectList />
            </TabPanel>
            <TabPanel>
              {filteredAlbums
                ? <><Flex justify='flex-end'>
                  <Select placeholder='Select option' w='25%' mb={3} onChange={handleSelectChange} value={selectedOption}>
                    <option value='All'>All</option>
                    <option value='Travel'>Travel</option>
                    <option value='Landscape'>Landscape</option>
                    <option value='People'>People</option>
                    <option value='Animal'>Animal</option>
                  </Select>
                </Flex><PhotoGallery albums={filteredAlbums} /></>
                : <Stack h={'md'} align={'center'} justify={'center'}><Heading fontSize={'2xl'} textAlign={'center'}>Sorry,<br />No album here.</Heading></Stack>
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box >
  );
}
