import { Card, CardHeader, CardBody, Heading, Stack, HStack, Text, StackDivider, Box } from "@chakra-ui/react";
const EducationCard = ({ title, period, university, gpa, activeties }) => {
  return (
    <Card boxShadow='md' mt='3'>
      <CardHeader as={HStack} pb='0' justifyContent={'space-between'} >
        <Heading size='sm'>{title}</Heading>
        <Text fontSize='sm' fontWeight={600}>
          {period}
        </Text>
      </CardHeader>
      <CardBody pt={1}>
        <Stack spacing='2' divider={<StackDivider />}>
          <HStack justifyContent={'space-between'}>
            <Text fontSize='sm'>
              {university}
            </Text>
          </HStack>
          <Box>
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
          </Box>
        </Stack>
      </CardBody>
    </Card >
  );
};

export default EducationCard;
