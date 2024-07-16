import React, { useState } from 'react';
import { Flex, Box, Image, IconButton, Text, Switch, useToast, Button } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import { useAuth } from '../../../api/authContext';
import { uploadFooterLogo } from '../../../api/API';

const Footer = ({ pageId }) => {
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
        const fileInput = document.getElementById('footerLogoInput');
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
            formData.append('footer_image', file); // Ensure this matches the field name in backend
            formData.append('userId', userId);
            formData.append('pageId', pageId);

            try {
                console.log('Uploading logo...');
                await uploadFooterLogo(formData, authToken);
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
        <Flex direction="column" align="center" justify="center" textAlign="center" fontFamily="Poppins" borderTop="2px solid #ffffff" borderRadius="20px" padding="1.5rem" bg="#010132" width="100%" margin="0">
            <Box>
                {previewLogo ? (
                    <Image color="white" src={previewLogo} alt="Logo" boxSize="70px" />
                ) : (
                    <Box
                        width="70px"
                        height="70px"
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
                            onClick={() => document.getElementById('footerLogoInput').click()}
                            variant="ghost"
                            aria-label="Upload Logo"
                            color="white"
                            size="sm"
                        />
                        <input id="footerLogoInput" type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
                        <Button onClick={handleSaveLogo} ml={2} colorScheme="blue">Save</Button>
                    </>
                )}
            </Box>
            <Text fontSize="sm" color="white" mt="20px">
                © 2024 Copyright
            </Text>
            <Switch isChecked={isEditable} onChange={() => setIsEditable(!isEditable)} />
        </Flex>
    );
};

export default Footer;
