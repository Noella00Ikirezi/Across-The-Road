import React, { useState } from 'react';
import { Flex, Box, Image, IconButton, Text, Switch, useToast, Button } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { useAuth } from '../../../api/authContext';
import { uploadNavbarLogo } from '../../../api/API';

const Navbar = ({ pageId }) => {
    const [previewLogo, setPreviewLogo] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast();
    const { authToken, userId } = useAuth();

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newLogoUrl = URL.createObjectURL(file);
            setPreviewLogo(newLogoUrl);
        }
    };

    const handleSaveLogo = async () => {
        const fileInput = document.getElementById('logoInput');
        const file = fileInput.files[0];

        if (!userId) {
            console.error('User ID is not available');
            toast({
                title: 'Error',
                description: 'User ID is not available.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (file) {
            const formData = new FormData();
            formData.append('navbar_image', file); // Ensure this matches the field name in backend
            formData.append('userId', userId);
            formData.append('pageId', pageId);

            try {
                console.log('Uploading logo...');
                await uploadNavbarLogo(formData, authToken);
                console.log('Logo uploaded successfully');
                setPreviewLogo('');
                toast({
                    title: 'Logo updated',
                    description: 'The logo has been updated successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } catch (error) {
                console.error('Error uploading logo:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to upload logo.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Flex width="100%" direction="column" position="sticky" top="0" zIndex="1000">
            <Flex bgGradient="linear(to-r, #010132, #6f13ad)" color="white" p="20px" alignItems="center" justifyContent="space-between" boxShadow="0 8px 16px rgba(255, 255, 255, 0.5)">
                <Flex alignItems="center">
                    {previewLogo ? (
                        <Image src={previewLogo} alt="Logo" width="60px" height="50px" cursor="pointer" />
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
                    {isEditable && (
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
                            <Button onClick={handleSaveLogo} ml={2} colorScheme="blue">Save</Button>
                        </>
                    )}
                </Flex>
                <Flex alignItems="center">
                    <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
                    <Text ml={2}>Edit Mode</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Navbar;
