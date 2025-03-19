import React, { useState, useEffect } from 'react';
import {
  Box, Container, Heading, Text, Stack, Image, useColorModeValue, SimpleGrid, Link, HStack,
  Button, Tag, TagLabel, LinkBox, LinkOverlay, keyframes, Skeleton
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import defaultImage from '../assets/projectImg/default.png';
import { useInView } from 'react-intersection-observer';
import SkeletonCard from '../components/ProjectSkeletonCard';

// Individual animated card component
const AnimatedCard = ({ children, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  return (
    <Box
      ref={ref}
      sx={{
        animation: inView ? `${fadeIn} 0.8s ease-out forwards` : 'none',
        opacity: 0
      }}
    >
      {children}
    </Box>
  );
};

export default function Projects() {
  const bgColor = useColorModeValue('primary.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const dateColor = useColorModeValue('gray.500', 'gray.400');
  const bgGradient = useColorModeValue("linear(to-r, brown, primary.600)", "linear(to-l, #4b6cb7, #182848)");

  const apiToken = process.env.REACT_APP_GITHUB_API_TOKEN;
  const username = process.env.REACT_APP_GITHUB_USER_NAME;

  const [repositories, setRepositories] = useState([]);
  const [topics, setTopics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Animation for heading
  const [headingRef, headingInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const headingAnimation = keyframes`
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  `;

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
      return data.names || [];
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

  return (
    <Box id="projects" py={{ base: 5, md: 10 }} bg={bgColor} scrollMarginTop={'50px'}>
      <Container maxW="container.xl">
        <Stack spacing={10}>
          <Box ref={headingRef}>
            <Heading
              textAlign="center"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              position="relative"
              color={headingColor}
              sx={{
                animation: headingInView ? `${headingAnimation} 0.8s ease-out forwards` : 'none',
                opacity: 0
              }}
            >
              My Projects
            </Heading>
          </Box>

          {/* Projects Grid */}
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            mt={6}
          >
            {isLoading ? (
              // Display skeleton cards while loading
              Array(6).fill(0).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            ) : (
              // Display actual project cards when loaded
              repositories.map((repo, index) => (
                <AnimatedCard key={repo.id} index={index}>
                  <LinkBox
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
                              position="relative"
                              overflow="hidden"
                              transition="all 0.3s ease"
                              _hover={{
                                bgGradient: bgGradient,
                                color: 'white',
                                transform: 'translateY(-2px)',
                              }}
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
                                position="relative"
                                overflow="hidden"
                                transition="all 0.3s ease"
                                _hover={{
                                  bgGradient: bgGradient,
                                  color: 'white',
                                  transform: 'translateY(-2px)',
                                }}
                              >
                                Demo
                              </Button>
                            </Link>
                          )}
                        </HStack>
                      </Stack>
                    </Box>
                  </LinkBox>
                </AnimatedCard>
              ))
            )}
          </SimpleGrid>

          {!isLoading && repositories.length === 0 && (
            <Box textAlign="center" py={10}>
              <Text fontSize="lg" color={textColor}>
                No projects found.
              </Text>
            </Box>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

// DynamicImage component that loads images dynamically
const DynamicImage = ({ repoName }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [repoName]);

  return (
    <>
      {isLoading ? (
        <Skeleton height="200px" />
      ) : (
        <Image src={imageSrc} alt={repoName} objectFit={'cover'} h={'auto'} />
      )}
    </>
  );
};
