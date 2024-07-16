import React, { useState, useEffect } from 'react';
import { Box, Link as ChakraLink, Flex, Image, List, ListItem, Text } from '@chakra-ui/react';
import apiClient from '../../../api/apiClient';

const Navbar = () => {
    const [navbarData, setNavbarData] = useState(null);

    useEffect(() => {
        const fetchNavbarData = async () => {
            try {
                const response = await apiClient.get('/pages');
                setNavbarData(response.data.data[0].navbar);
            } catch (error) {
                console.error('Error fetching navbar data:', error);
            }
        };

        fetchNavbarData();
    }, []);

    const links = [
        { id: 'home', title: 'Home', url: '/' },
        { id: 'services', title: 'Services', url: '/services' },
        { id: 'about', title: 'About', url: '/about' },
        { id: 'blog', title: 'Blog', url: '/blog' },
        { id: 'associations', title: 'Associations', url: '/associations' },
    ];

    return (
        <Flex width="100%" direction="column" position="sticky" top="0" zIndex="1000">
            <Flex bgGradient="linear(to-r, #010132, #6f13ad)" color="white" p="20px" alignItems="center" justifyContent="space-between" boxShadow="0 8px 16px rgba(255, 255, 255, 0.5)">
                <Flex alignItems="center">
                    {navbarData?.logo ? (
                        <Image src={navbarData.logo} alt="Logo" width="60px" height="50px" cursor="pointer" />
                    ) : (
                        <Box width="60px" height="50px" borderWidth="2px" borderStyle="dashed" borderColor="white" display="flex" alignItems="center" justifyContent="center">
                            <Text color="white">Logo</Text>
                        </Box>
                    )}
                </Flex>
                <List display="flex">
                    {links.map(link => (
                        <ListItem key={link.id} ml="20px" display="flex" alignItems="center">
                            <ChakraLink href={link.url}>{link.title}</ChakraLink>
                        </ListItem>
                    ))}
                </List>
            </Flex>
        </Flex>
    );
};

export default Navbar;
