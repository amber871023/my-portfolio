import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Text, Image, Box, Heading, Stack, Link, Spinner } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import defaultImage from '../assets/projectImg/default.png';

const ProjectList = () => {
  const apiToken = process.env.REACT_APP_GITHUB_API_TOKEN;
  const username = process.env.REACT_APP_GITHUB_USER_NAME;

  const [repositories, setRepositories] = useState([]);
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `token ${apiToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        const starredRepos = data.filter(repo => repo.stargazers_count > 0);
        // Sort repositories by update time (latest first)
        const sortedRepos = starredRepos.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          console.log(dateA, dateB)
          return dateB - dateA; // Descending order
        });

        setRepositories(sortedRepos);
        setIsLoading(false);
        console.log(data)
        const topicsMap = {}
        await Promise.all(starredRepos.map(async repo => {
          topicsMap[repo.id] = await fetchTopics(repo);
        }));
        setTopics(topicsMap);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
    fetchRepositories();
  }, [apiToken, username]);

  const fetchTopics = async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/topics`, {
        headers: {
          Authorization: `token ${apiToken}`
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch topics for ${repo.name}`);
      const data = await response.json();
      return data.names || []; // Topics are stored in `names` array
    } catch (error) {
      console.error(`Error fetching topics for repository ${repo.name}:`, error);
      return [];
    }
  };

  if (isLoading) {
    return (
      <Stack h={'md'} align={'center'} justify={'center'}>
        <Spinner size='xl' />
        <Heading fontSize={'2xl'} textAlign={'center'}>Loading...</Heading>
      </Stack>
    );
  }

  if (repositories.length === 0) {
    return (
      <>
        <Stack h={'md'} align={'center'} justify={'center'}>
          <Heading fontSize={'2xl'} textAlign={'center'}>Sorry,<br />No repositories match the selected languages.</Heading>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={5} align={'center'}>
        {repositories.map(repo => (
          <Link key={repo.id} as={NavLink} to={`/Portfolio/project/${repo.name}`} _hover={{ textDecoration: 'none' }}>
            <GridItem key={repo.id} position="relative" borderRadius="lg" _hover={{ opacity: 0.7 }}>
              <Box maxW={'sm'} bg='white' boxShadow={'2xl'} rounded={'md'} overflow={'hidden'}>
                <Box bg={'gray.100'} position={'relative'} height="250px">
                  <DynamicImage repoName={repo.name} />
                </Box>
                <Stack align={'flex-start'} p={6} >
                  <Heading color='gray.700' fontSize={'xl'} >
                    {repo.name}
                  </Heading>
                  <Text textAlign={'left'} color={'green.500'} textTransform={'uppercase'} fontWeight={600} fontSize={'xs'}>
                    {topics[repo.id] && topics[repo.id].length > 0 ? topics[repo.id].join(', ') : 'No topics'}
                  </Text>
                </Stack>
              </Box>
            </GridItem>
          </Link>
        ))}
      </Grid >
    </>
  );
};

// DynamicImage component that loads images dynamically
const DynamicImage = ({ repoName }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        // Check if the image exists
        const imageModule = await import(`../assets/projectImg/${repoName}.png`);

        // If the import is successful, set the image source
        setImageSrc(imageModule.default);
      } catch (error) {
        // If the image does not exist, use the default image
        setImageSrc(defaultImage);
      }
    };

    loadImage();
  }, [repoName]);

  return <Image src={imageSrc} alt={repoName} objectFit={'cover'} h={'100%'} />;
};

export default ProjectList;
