import { Card, CardBody, Heading, Stack, HStack, Text, StackDivider, Icon } from "@chakra-ui/react";
import { FaCalendarDays, FaLocationDot } from "react-icons/fa6";
const EducationCard = ({ title, period, location, gpa, activeties }) => {
  return (
    <Card boxShadow='md' mt='3'>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='2'>
          <Heading fontSize='16px'>{title}</Heading>
          <HStack>
            <Text as='p' pt='2' fontSize='sm' display="flex" alignItems="center" mr={{ base: '0', md: '5' }}>
              <Icon as={FaCalendarDays} pr={1} fontSize='20px' />
              {period}
            </Text>
            <Text as='p' pt='2' fontSize='sm' display="flex" alignItems="center">
              <Icon as={FaLocationDot} pr={1} fontSize='20px' />
              {location}
            </Text>
          </HStack>
          {gpa && (
            <Text as='p' pt='2' fontSize='sm'>
              {gpa}
            </Text>
          )}
          {activeties && (
            <Text as='p' pt='2' fontSize='sm'>
              {activeties}
            </Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EducationCard;
