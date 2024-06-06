import React, { useState, useEffect } from 'react';
import { Flex, Checkbox, Grid, GridItem, Text, Image, Box, Heading, Stack, Link, Spinner } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import defaultImage from '../assets/projectImg/default.png';

const ProjectList = () => {
  const apiToken = process.env.REACT_APP_GITHUB_API_TOKEN;
  const username = process.env.REACT_APP_GITHUB_USER_NAME;

  const [repositories, setRepositories] = useState([]);
  const [languages, setLanguages] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [filteredRepositories, setFilteredRepositories] = useState([]);
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
        setRepositories(starredRepos);
        setIsLoading(false);

        const languagesMap = {};
        await Promise.all(starredRepos.map(async repo => {
          const languages = await fetchLanguages(repo);
          languagesMap[repo.id] = languages;
        }));
        setLanguages(languagesMap);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
    fetchRepositories();
  }, [apiToken, username]);

  const fetchLanguages = async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`, {
        headers: {
          Authorization: `token ${apiToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch languages');
      }
      const data = await response.json();
      return Object.keys(data);
    } catch (error) {
      console.error(`Error fetching languages for repository ${repo.name}:`, error);
      return [];
    }
  };

  const handleCheckboxChange = (language) => {
    const languageIndex = selectedLanguages.indexOf(language);
    if (languageIndex !== -1) {
      setSelectedLanguages(selectedLanguages.filter((_, index) => index !== languageIndex));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  useEffect(() => {
    const filteredRepos = repositories.filter(repo => {
      return selectedLanguages.length === 0 || selectedLanguages.every(lang => languages[repo.id]?.includes(lang));
    });
    setFilteredRepositories(filteredRepos);
  }, [selectedLanguages, repositories, languages]);


  if (isLoading) {
    return (
      <Stack h={'md'} align={'center'} justify={'center'}>
        <Spinner size='xl' />
        <Heading fontSize={'2xl'} textAlign={'center'}>Loading...</Heading>
      </Stack>
    );
  }

  if (filteredRepositories.length === 0) {
    return (
      <>
        <Flex justify='flex-end' mb={'6'} wrap='wrap'>
          {Object.values(languages)
            .flatMap(lang => lang)
            .filter((lang, index, self) => self.indexOf(lang) === index)
            .map((lang, index) => (
              <Checkbox
                key={index} value={lang}
                isChecked={selectedLanguages.includes(lang)}
                onChange={() => handleCheckboxChange(lang)}
                mb={[0, 2]} mr={[0, 4]}
              >
                {lang}
              </Checkbox>
            ))}
        </Flex>
        <Stack h={'md'} align={'center'} justify={'center'}>
          <Heading fontSize={'2xl'} textAlign={'center'}>Sorry,<br />No repositories match the selected languages.</Heading>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Flex justify='flex-end' mb={'6'} wrap='wrap'>
        {Object.values(languages)
          .flatMap(lang => lang)
          .filter((lang, index, self) => self.indexOf(lang) === index)
          .map((lang, index) => (
            <Checkbox
              key={index} value={lang}
              isChecked={selectedLanguages.includes(lang)}
              onChange={() => handleCheckboxChange(lang)}
              mb={[0, 2]} mr={[0, 4]}
            >
              {lang}
            </Checkbox>
          ))}
      </Flex>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={4} align={'center'}>
        {filteredRepositories.map(repo => (
          <Link key={repo.id} as={NavLink} to={`/Portfolio/project/${repo.name}`} _hover={{ textDecoration: 'none' }}>
            <GridItem key={repo.id} position="relative" borderRadius="lg" _hover={{ opacity: 0.7 }}>
              <Box maxW={'sm'} h={'100%'} bg='white' boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
                <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'} height={'300px'}>
                  <DynamicImage repoName={repo.name} />
                </Box>
                <Stack align={'flex-start'}>
                  <Text color={'green.500'} textTransform={'uppercase'} fontWeight={800} fontSize={'sm'}>
                    {languages[repo.id] && languages[repo.id].join(', ')}
                  </Text>
                  <Heading color='gray.700' fontSize={'2xl'} >
                    {repo.name}
                  </Heading>
                </Stack>
              </Box>
            </GridItem>
          </Link>
        ))}
      </Grid>
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
        console.error(`Failed to load image for ${repoName}:`, error);

        // If the image does not exist, use the default image
        setImageSrc(defaultImage);
      }
    };

    loadImage();
  }, [repoName]);

  return <Image src={imageSrc} alt={repoName} objectFit={'cover'} h={'100%'} />;
};

export default ProjectList;
