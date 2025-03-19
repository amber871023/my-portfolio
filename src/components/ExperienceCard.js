import { Card, CardBody, CardHeader, Heading, Box, Text, Stack, StackDivider, UnorderedList, ListItem, HStack } from "@chakra-ui/react";

const ExperienceCard = ({ title, company, period, duties, location }) => {
  return (
    <Card boxShadow='md' mt='3'>
      <CardHeader as={HStack} pb='0' justifyContent={'space-between'}>
        <Heading fontSize={{ base: '16px', md: '20px' }}>{title}</Heading>
        <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight={600}>
          {period}
        </Text>
      </CardHeader>
      <CardBody pt='0'>
        <Stack divider={<StackDivider />} spacing='2'>
          <Text fontSize="14px" >
            {company} | {location}
          </Text>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              Overview
            </Heading>
            <UnorderedList pt='2' fontSize='sm'>
              {duties.map((duty, index) => (
                <ListItem key={index}>{duty}</ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Stack>
      </CardBody>
    </Card >
  );
};

export default ExperienceCard;
