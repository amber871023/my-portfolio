import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, Text, Stack, useColorModeValue, SimpleGrid, keyframes } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../components/ProjectCard';
import SkeletonCard from '../components/ProjectSkeletonCard';

export default function Projects() {
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const dateColor = useColorModeValue('gray.500', 'gray.400');
  const btnColor = useColorModeValue("teal", "blue");
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

  const AnimatedCard = ({ children }) => {
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
        // Sort repos by update time (latest first)
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

  return (
    <Box id="projects" py={{ base: 5, md: 10 }} bg={useColorModeValue('primary.50', 'gray.900')} scrollMarginTop={'50px'}>
      <Container maxW="container.xl">
        <Stack spacing={10}>
          <Box ref={headingRef}>
            <Heading
              textAlign="center"
              fontSize={{ base: '3xl', md: '4xl' }} fontWeight="bold"
              position="relative"
              color={useColorModeValue('gray.800', 'white')}
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
              repositories.map((repo) => (
                <AnimatedCard key={repo.id}>
                  <ProjectCard
                    repo={repo}
                    topics={topics[repo.id]}
                    cardBgColor={cardBgColor}
                    textColor={textColor}
                    dateColor={dateColor}
                    btnColor={btnColor}
                  />
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
