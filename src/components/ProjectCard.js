import React from 'react';
import {
  Box, Heading, Text, Stack, Link, HStack,
  Button, Tag, TagLabel, LinkBox, LinkOverlay
} from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import DynamicImage from './DynamicImage';

const getDescriptionExcerpt = (description, maxLength = 120) => {
  if (!description) return "No description available";
  return description.length > maxLength
    ? description.substring(0, maxLength) + '...'
    : description;
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProjectCard = ({
  repo,
  topics,
  cardBgColor,
  textColor,
  dateColor,
  btnColor
}) => {
  return (
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
              {(topics || []).map((topic) => (
                <Tag
                  key={topic}
                  size="sm"
                  borderRadius="full"
                  colorScheme="blue"
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
                colorScheme={btnColor} w="100%"
              >
                Repo
              </Button>
            </Link>

            {repo.homepage && (
              <Link href={repo.homepage} isExternal flex={1}>
                <Button
                  leftIcon={<FaExternalLinkAlt />}
                  colorScheme={btnColor}
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
  );
};

export default ProjectCard;
