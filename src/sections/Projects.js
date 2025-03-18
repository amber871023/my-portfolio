// src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Text, Stack, Image, useColorModeValue, SimpleGrid, Link, Spinner, HStack,
  Button, Tag, TagLabel, LinkBox, LinkOverlay
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import defaultImage from '../assets/projectImg/default.png';

export default function Projects() {
  // Get color values at the top of the component
  const bgColor = useColorModeValue('primary.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const spinnerColor = useColorModeValue('brand.500', 'brand.300');
  const dateColor = useColorModeValue('gray.500', 'gray.400');
  const bgGradient = useColorModeValue("linear(to-r, brown, primary.600)", "linear(to-l, #4b6cb7, #182848)")

  const apiToken = process.env.REACT_APP_GITHUB_API_TOKEN;
  const username = process.env.REACT_APP_GITHUB_USER_NAME;

  const [repositories, setRepositories] = useState([]);
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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
          return dateB - dateA; // Descending order
        });

        setRepositories(sortedRepos);
        setIsLoading(false);

        const topicsMap = {}
        await Promise.all(starredRepos.map(async repo => {
          topicsMap[repo.id] = await fetchTopics(repo);
        }));
        setTopics(topicsMap);
      } catch (error) {
        console.error('Error fetching repositories:', error);
        setIsLoading(false);
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

  // Get a description excerpt
  const getDescriptionExcerpt = (description, maxLength = 120) => {
    if (!description) return "No description available";
    return description.length > maxLength
      ? description.substring(0, maxLength) + '...'
      : description;
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter repositories based on topics
  const getFilteredRepositories = () => {
    if (filter === 'all') return repositories;

    return repositories.filter(repo => {
      const repoTopics = topics[repo.id] || [];
      return repoTopics.includes(filter);
    });
  };


  if (isLoading) {
    return (
      <Box id="projects" py={15} bg={bgColor}>
        <Container maxW="container.xl">
          <Stack h="md" align="center" justify="center">
            <Spinner size="xl" color={spinnerColor} />
            <Heading fontSize="2xl" textAlign="center">Loading Projects...</Heading>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box id="projects" py={{ base: 5, md: 10 }} bg={bgColor}>
      <Container maxW="container.xl">
        <Stack spacing={10}>
          <Heading
            textAlign="center"
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            position="relative"
            color={headingColor}
          >
            My Projects
          </Heading>

          {/* Filter buttons
          <HStack spacing={4} justify="center" wrap="wrap" py={4}>
            <Button
              size="sm"
              variant={filter === 'all' ? 'solid' : 'outline'}
              colorScheme="brand"
              onClick={() => setFilter('all')}
            >
              All Projects
            </Button>
            {getUniqueTopics().map(topic => (
              <Button
                key={topic}
                size="sm"
                variant={filter === topic ? 'solid' : 'outline'}
                colorScheme="brand"
                onClick={() => setFilter(topic)}
              >
                {topic}
              </Button>
            ))}
          </HStack> */}

          {/* Projects Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={6}>
            {getFilteredRepositories().map((repo) => (
              <LinkBox
                key={repo.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                bg={cardBgColor}
                transition="transform 0.3s, box-shadow 0.3s"
                _hover={{
                  transform: 'translateY(-10px)',
                  boxShadow: 'xl'
                }}
              >
                <Box bg={'gray.100'} position={'relative'}>
                  <DynamicImage repoName={repo.name} h={'100%'} w={'100%'} />
                </Box>

                <Box p={3}>
                  <Stack spacing={3}>
                    <Heading fontSize="xl" fontWeight="bold">
                      <LinkOverlay href={repo.html_url} isExternal>
                        {repo.name}
                      </LinkOverlay>
                    </Heading>
                    <Text
                      color={textColor}
                      minH="3rem"
                    >
                      {getDescriptionExcerpt(repo.description)}
                    </Text>

                    {/* Topics tags */}
                    <Box>
                      <HStack spacing={2} mt={2} flexWrap="wrap">
                        {(topics[repo.id] || []).map((topic) => (
                          <Tag
                            key={topic}
                            size="sm"
                            borderRadius="full"
                            colorScheme="orange"
                            variant="subtle"
                          >
                            <TagLabel>{topic}</TagLabel>
                          </Tag>
                        ))}
                      </HStack>
                    </Box>

                    <Box mt={2}>
                      <Text fontSize="sm" color={dateColor}>
                        Created: {formatDate(repo.created_at)}
                      </Text>
                      <Text fontSize="sm" color={dateColor}>
                        Last updated: {formatDate(repo.updated_at)}
                      </Text>
                    </Box>

                    <HStack mt={2}>
                      <Link href={repo.html_url} isExternal flex={1}>
                        <Button
                          leftIcon={<FaGithub />}
                          colorScheme="primary"
                          w="100%"
                        >
                          Repo
                        </Button>
                      </Link>

                      {repo.homepage && (
                        <Link href={repo.homepage} isExternal flex={1}>
                          <Button
                            leftIcon={<FaExternalLinkAlt />}
                            colorScheme="primary"
                            w="100%"
                          >
                            Demo
                          </Button>
                        </Link>
                      )}
                    </HStack>
                  </Stack>
                </Box>
              </LinkBox>
            ))}
          </SimpleGrid>

          {getFilteredRepositories().length === 0 && (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color={textColor}>
                No projects found with the selected filter.
              </Text>
            </Box>
          )}
        </Stack>
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
