import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text } from "@chakra-ui/react";
import quoteImg from "../assets/quoteImg.jpeg";
const AboutInfoAccordion = () => {
  return (
    <Accordion allowToggle align={'center'} w={{ base: '100%', md: '2xl', lg: '4xl' }}>
      <AccordionItem>
        <AccordionButton>
          <Box as='h2' flex='1' textAlign='left' fontWeight="bold">
            Where I from?
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} textAlign='left'>
          Taiwan, a beautiful island situated in East Asia.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box as='h2' flex='1' textAlign='left' fontWeight="bold">
            My Hobbies
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={'left'}>
          I have a diverse range of hobbies that bring joy and fulfillment to my life. From expressing myself through dance to capturing moments with my camera through photography, each hobby allows me to explore different facets of creativity and self-expression. Engaging in aerial yoga helps me find balance and tranquility, while immersing myself in music helps me release stress.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box as='h2' flex='1' textAlign='left' fontWeight="bold">
            My Favorite Quote
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={'left'}
          position="relative"
          overflow="hidden">
          <Box
            bgImage={`url(${quoteImg})`} // Use backticks to interpolate the URL string
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            filter="blur(3px)"
            h="250px"
          >
          </Box>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
          >
            <Text fontStyle='italic' fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} fontWeight="bold" w={'2xl'}>
              "Time is free, but it’s priceless. You can’t own it, but you can use it.  <br /> You can’t keep it, but you can spend it.<br /> Once you’ve lost it you can never get it back."</Text>
            <Text fontSize="md" mt={1}>
              - Harvey Mackay
            </Text>
          </Box>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <AccordionButton>
          <Box as='h2' flex='1' textAlign='left' fontWeight="bold">
            My Goal?
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} textAlign={'left'}>
          To become a skilled front-end (or even full-stack) engineer one day!
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default AboutInfoAccordion;
