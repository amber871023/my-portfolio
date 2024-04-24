import React, { useState, useEffect } from 'react';
import { Container, HStack, Stack, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading, Highlight, Button, Text, Image } from "@chakra-ui/react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'
import { FaGithub, FaRegWindowMaximize } from 'react-icons/fa';
import PieChart from '../components/PieChart';
import CommitTable from '../components/CommitTable';

export default function PortfolioProject() {
  const username = process.env.REACT_APP_GITHUB_USER_NAME;
  const apiToken = process.env.REACT_APP_GITHUB_API_TOKEN;

  const navigate = useNavigate(); // Use useNavigate hook 
  const { name } = useParams(); // Retrieve the project name from the route parameters
  const projectName = name;
  const [project, setProject] = useState(null);
  const [commitData, setCommitData] = useState([]);
  const [languages, setLanguages] = useState({});

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

  if (!project) {
    return <Stack h={'md'} align={'center'} justify={'center'}><Heading fontSize={'2xl'} textAlign={'center'}>Loading...</Heading></Stack >; // Add a loading indicator 
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
              <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} mb={5}>
                {/* Project details info and repo's code and demo link */}
                <VStack align={'flex-start'}>
                  <Heading as="h1" size="lg" mb={4}>{project.name}</Heading>
                  <Box mb={5}>
                    <Image src={require(`../assets/projectImg/${project.name}.png`)} alt={`${project.name}`} borderRadius='lg'
                      boxShadow={'xl'} boxSize={'lg'}
                      w={'100%'} objectFit={'cover'}
                    />
                  </Box>
                  <Box pr={10}>
                    <Text fontSize="md" mb={2}>Description: <br /> {project.description}</Text>
                    <Text fontSize="md" mb={2}>Last Updated: {new Date(project.updated_at).toLocaleDateString()} </Text>
                    <Text fontSize="md">Total Commits: {commitData.length}</Text>
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
                <VStack w='600px' align={' center'} pb={5}>
                  {/* Render pie chart for languages */}
                  <PieChart pieChartData={pieChartData} />
                  {/* Project commits details info Table */}
                  <CommitTable commitData={commitData} columnDefs={columnDefs} />
                </VStack>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box >
  );
}