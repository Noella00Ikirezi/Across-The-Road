import React, { useState, useEffect } from 'react';
import { Box, Link as ChakraLink, Flex, Button, Image, List, ListItem, Text, IconButton, Switch, Stack } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';

const Navbar = ({ initialData, setInitialData }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [logo, setLogo] = useState(initialData.logo || '');
    const [editMode, setEditMode] = useState(false);

    const links = [
        { id: 'home', title: 'Home', url: '/' },
        { id: 'services', title: 'Services', url: '/services' },
        { id: 'about', title: 'About', url: '/about' },
        { id: 'blog', title: 'Blog', url: '/blog' },
        { id: 'associations', title: 'Associations', url: '/associations' },
    ];

    useEffect(() => {
        if (initialData.logo) {
            setLogo(initialData.logo);
        }
    }, [initialData]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newLogoUrl = URL.createObjectURL(file);
            console.log('New Logo URL:', newLogoUrl); // Debugging
            setLogo(newLogoUrl);
            setInitialData((prevData) => ({ ...prevData, logo: newLogoUrl }));

            // Do not revoke the URL here to ensure the image can be displayed
            // URL.revokeObjectURL(newLogoUrl);
        }
    };

    console.log('Current Logo:', logo); // Debugging

    return (
        <Flex width="100%" direction="column" position="sticky" top="0" zIndex="1000">
            <Flex bgGradient="linear(to-r, #010132, #6f13ad)" color="white" p="20px" alignItems="center" justifyContent="space-between" boxShadow="0 8px 16px rgba(255, 255, 255, 0.5)">
                <Flex alignItems="center">
                    {logo ? (
                        <Image src={logo} alt="Logo" width="60px" height="50px" cursor="pointer" />
                    ) : (
                        <Box
                            width="60px"
                            height="50px"
                            borderWidth="2px"
                            borderStyle="dashed"
                            borderColor="white"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text color="white">Logo</Text>
                        </Box>
                    )}
                    {editMode && (
                        <>
                            <IconButton
                                icon={<FaUpload />}
                                onClick={() => document.getElementById('logoInput').click()}
                                ml={2}
                                variant="ghost"
                                aria-label="Upload Logo"
                                color="white"
                                size="sm"
                            />
                            <input id="logoInput" type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                        </>
                    )}
                </Flex>
                <List display="flex">
                    {links.map(link => (
                        <ListItem key={link.id} ml="20px" display="flex" alignItems="center">
                            <ChakraLink href={link.url}>{link.title}</ChakraLink>
                        </ListItem>
                    ))}
                </List>
                <Stack direction="row" align="center">
                    <Switch isChecked={editMode} onChange={toggleEditMode} />
                    <Text ml={2}>Edit Mode</Text>
                </Stack>
                {isAuthenticated ? (
                    <Button onClick={handleLogout} bg="transparent" color="white" _hover={{ bg: 'whiteAlpha.200' }}>Logout</Button>
                ) : (
                    <ChakraLink href="/login">
                        <Text color="white" _hover={{ textDecoration: 'underline' }}>Login</Text>
                    </ChakraLink>
                )}
            </Flex>
        </Flex>
    );
};

export default Navbar;
