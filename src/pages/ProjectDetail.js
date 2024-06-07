import React, { useState, useEffect } from 'react';
import { Container, HStack, Stack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Highlight, Button, Text, Image, Spinner } from "@chakra-ui/react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FaGithub, FaRegWindowMaximize } from 'react-icons/fa';
import PieChart from '../components/PieChart';
import CommitTable from '../components/CommitTable';
import defaultImage from '../assets/projectImg/default.png';

export default function PortfolioProject() {
  const username = process.env.REACT_APP_GITHUB_USER_NAME;
  const apiToken = process.env.REACT_APP_GITHUB_API_TOKEN;

  const navigate = useNavigate(); // Use useNavigate hook 
  const { name } = useParams(); // Retrieve the project name from the route parameters
  const projectName = name;
  const [project, setProject] = useState(null);
  const [commitData, setCommitData] = useState([]);
  const [languages, setLanguages] = useState({});
  const [isLoading, setIsLoading] = useState(true); // add Spinner for awaiting result


  //Take users back to the previous page
  const handleReturn = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${projectName}`, {
          headers: {
            Authorization: `token ${apiToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const project = await response.json();
        setProject(project);
        console.log(project);
        // Fetch languages for repository
        const languages = await fetchLanguages();
        setLanguages(languages);
        setIsLoading(false); // Set loading state to false after fetching repos

      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [apiToken, username, projectName]);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${projectName}/languages`, {
        headers: {
          Authorization: `token ${apiToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching languages for repository ${projectName}:`, error);
      return {};
    }
  };

  useEffect(() => {
    // Fetch commit data using projectName
    const fetchCommitData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${username}/${projectName}/commits`);
        if (!response.ok) {
          throw new Error('Failed to fetch commit data');
        }
        const data = await response.json();
        setCommitData(data);
      } catch (error) {
        console.error('Error fetching commit data:', error);
      }
    };
    fetchCommitData();
  }, [projectName, username]);


  // Display loading text while fetching data
  if (isLoading) {
    return (
      <Stack h={'md'} align={'center'} justify={'center'}>
        <Spinner size='xl' />
        <Heading fontSize={'2xl'} textAlign={'center'}>Loading...</Heading>
      </Stack>
    );
  }

  // Prepare data for the Pie Chart
  const totalBytes = Object.values(languages).reduce((acc, cur) => acc + cur, 0);
  const pieChartData = Object.entries(languages).map(([label, value]) => ({
    label: `${label} (${((value / totalBytes) * 100).toFixed(2)}%)`, // Modify the label here
    value: (value / totalBytes) * 100
  }));
  console.log(pieChartData);

  //commit table
  const columnDefs = [
    { headerName: 'Commit Message', field: 'commit.message' },
    { headerName: 'Author', field: 'commit.author.name' },
    { headerName: 'Date', field: 'commit.author.date' },
  ];

  return (
    <Box bg='primary.200'>
      <Container maxW={'7xl'} py={10}>
        <Heading lineHeight='tall' textAlign='center'>
          <Highlight
            query='project'
            styles={{ px: '3', pb: '2', rounded: 'full', bg: 'primary.700' }}
          >Welcome to my project</Highlight>
        </Heading>
        <Tabs bg={'white'} rounded={'5px'} mt='10' isFitted colorScheme='primary'>
          <TabList>
            <Tab py={3}>Project Details</Tab>
          </TabList>
          <HStack>
            <Button leftIcon={<ArrowBackIcon />} onClick={handleReturn} mt={4} ml={4} colorScheme="primary"> Back to Portfolio</Button>
            <Text mr={4} textAlign={'center'}></Text>
          </HStack>
          <TabPanels>
            <TabPanel>
              <Heading as="h1" textAlign={'center'} size="lg" mb={5}>{project.name}</Heading>
              <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} mb={5}>
                {/* Project details info and repo's code and demo link */}
                <VStack align={'flex-start'}>
                  <DynamicImage repoName={project.name} />
                  <Box mt={5}>
                    <Text fontSize="md" fontWeight="bold" mb={2}>
                      Description: <br />
                      <Text as="span" fontWeight="100">{project.description}</Text>
                    </Text>
                    <Text fontSize="md" fontWeight="bold" mb={2}>
                      Last Updated: {' '}
                      <Text as="span" fontWeight="100">
                        {new Date(project.updated_at).toLocaleDateString()}
                      </Text>
                    </Text>
                    <Text fontSize="md" fontWeight="bold">
                      Total Commits: {' '}
                      <Text as="span" fontWeight="100">
                        {commitData.length}
                      </Text>
                    </Text>
                    <HStack mt={3}>
                      <NavLink to={project.html_url} target="_blank" rel="noopener noreferrer">
                        <Button leftIcon={<FaGithub />} mr={1}> GitHub</Button>
                      </NavLink>
                      <NavLink to={`https://amber871023.github.io/${project.name}`} target="_blank" rel="noopener noreferrer">
                        <Button leftIcon={<FaRegWindowMaximize />}> Demo</Button>
                      </NavLink>
                    </HStack>
                  </Box>
                </VStack>
                <VStack w={{ base: '100%', md: '600px' }} align={' center'} pb={5}>
                  {/* Render pie chart for languages */}
                  <PieChart pieChartData={pieChartData} width="100%" // Set the width to 100% to ensure it fits within its container
                  />
                  {/* Project commits details info Table */}
                  <CommitTable commitData={commitData} columnDefs={columnDefs} width="100%" />
                </VStack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box >
  );
}
// DynamicImage component that loads images dynamically
const DynamicImage = ({ repoName }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Check if the image exists
        const imageModule = await import(`../../public/projectImg/${repoName}.png`);

        // If the import is successful, set the image source
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error(`Failed to load image for ${repoName}:`, error);

        // If the image does not exist, use the default image
        setImageSrc(defaultImage);
      }
    };

    loadImage();
  }, [repoName]);

  return <Image src={imageSrc} alt={repoName} borderRadius='lg' boxShadow={'xl'} boxSize={'lg'}
    w={'100%'} objectFit={'cover'} />;
};
