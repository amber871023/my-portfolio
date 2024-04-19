import { Card, CardBody, CardHeader, Heading, Box, Text, Stack, StackDivider, UnorderedList, ListItem } from "@chakra-ui/react";

const ExperienceCard = ({ title, company, period, duties }) => {
  return (
    <Card boxShadow='md' mt='3'>
      <CardHeader pb='0'>
        <Heading fontSize={{ base: '16px', md: '18px' }}>{title}</Heading>
      </CardHeader>
      <CardBody pt='0'>
        <Stack divider={<StackDivider />} spacing='2'>
          <Box>
            <Text size='xs' fontSize="14px" textTransform='uppercase'>
              {company + period}
            </Text>
          </Box>
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
    </Card>
  );
};

export default ExperienceCard;
