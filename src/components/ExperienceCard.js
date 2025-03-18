import { Card, CardBody, CardHeader, Heading, Box, Text, Stack, StackDivider, UnorderedList, ListItem, Icon, HStack } from "@chakra-ui/react";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";


const ExperienceCard = ({ title, company, period, duties }) => {
  return (
    <Card boxShadow='md' mt='3'>
      <CardHeader pb='0'>
        <Heading fontSize={{ base: '16px', md: '18px' }}>{title}</Heading>
      </CardHeader>
      <CardBody pt='0'>
        <Stack divider={<StackDivider />} spacing='2'>
          <HStack align={'center'} justify={'space-between'}>
            <Text size='xs' fontSize="14px" textTransform='uppercase'>
              {company}
            </Text>
            <Text as='p' pt='2' fontSize='sm'>
              {period}
            </Text>
          </HStack>
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
