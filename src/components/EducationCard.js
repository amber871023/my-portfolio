import { Card, CardBody, Heading, Stack, Text, StackDivider } from "@chakra-ui/react";

const EducationCard = ({ title, date, description }) => {
  return (
    <Card boxShadow='md' mt='3'>
      <CardBody>
        <Stack divider={<StackDivider />} spacing='2'>
          <Heading fontSize='16px'>{title}</Heading>
          <Text as='p' pt='2' fontSize='sm'>
            {date}
          </Text>
          {description && (
            <Text as='p' pt='2' fontSize='sm'>
              {description}
            </Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EducationCard;
