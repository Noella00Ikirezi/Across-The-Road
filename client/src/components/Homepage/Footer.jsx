import React from 'react';
import {Box, Flex, Text, Link as ChakraLink, VStack, Container, Image} from '@chakra-ui/react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import logo from '../../assets/logo_b.png'


const footerLinks = [
    {
        title: "À propos",
        links: [
            {
                name: "Quis Sommes Nous?",
                link: "https://www.acrosstheroad.com/Aboutus",
            },
            {
                name: "Nos Services",
                link: "https://www.acrosstheroad.com/Services",
            },
            {
                name: "Vie Associatives",
                link: "https://www.acrosstheroad.com/demo"
            },
        ],
    },
    {
        title: "Support",
        links: [
            {
                name: "Help Center",
                link: "https://www.acrosstheroad.com/Support",
            },
            {
                name: "Blog",
                link: "https://www.acrosstheroed.com/blog",
            },
            {
                name: "Communityguidelines",
                link: "https://www.acrosstheroed.com/Communityguidelines"
            },
        ],
    },
];

const socialMedia = [
    {
        id: "social-media-1",
        icon: FaInstagram,
        link: "https://www.instagram.com/",
    },
    {
        id: "social-media-2",
        icon: FaFacebookF,
        link: "https://www.facebook.com/",
    },
    {
        id: "social-media-3",
        icon: FaTwitter,
        link: "https://www.twitter.com/",
    },
    {
        id: "social-media-4",
        icon: FaLinkedinIn,
        link: "https://www.linkedin.com/",
    },
];
const Footer = () => {
  return (
    <Box
      borderTop = "1px solid white"
      color="white"
      fontFamily="Poppins"
      bgGradient="linear(to-r, #010132, #6f13ad)"
    >
        <Container
        maxW="container.xl"
        py="20px"
        px={{ base: "4", md: "8" }}
      >

            <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          wrap="wrap"
        >
                <Image align="center"
                       src={ logo}
                       alt="User Logo"
                       htmlWidth="150px"
                       htmlHeight="150px"
                       cursor="pointer" />


                <VStack
            spacing={{ base: '5', md: '6' }}
            align="center"
            flex="1"
            order={{ base: 3, lg: 2 }}
          >
            {footerLinks.map((group) => (
              <VStack key={group.title} align="start" spacing="2">
                <Text fontWeight="bold" fontSize="lg">{group.title}</Text>
                {group.links.map((link) => (
                  <ChakraLink
                    key={link.name}
                    href={link.link}
                    _hover={{ textDecoration: 'underline' }}
                    isExternal
                  >
                    {link.name}
                  </ChakraLink>
                ))}
              </VStack>
            ))}
          </VStack>

          <Flex
            gap="4"
            mt={{ base: '4', lg: '0' }}
            justify="center"
            order={{ base: 2, lg: 3 }}
          >
            {socialMedia.map((media) => (
              <ChakraLink key={media.id} href={media.link} isExternal aria-label={media.id}>
                <Box as={media.icon} size="24px" />
              </ChakraLink>
            ))}
          </Flex>
        </Flex>
          <Box align="center" paddingTop="5rem" justify="start"   mb={{ base: '6', lg: '0' }}>
              <Text fontSize="sm">© 2024 Across The Road. Tous droits réservés.</Text>
          </Box>
      </Container>
    </Box>
  );
};

export default Footer;