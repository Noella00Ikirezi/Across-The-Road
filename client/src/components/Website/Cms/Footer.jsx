import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, IconButton, Text, Switch, useToast } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';

const Footer = ({ initialData, setInitialData }) => {
    const [logo, setLogo] = useState(initialData.logo || '');
    const [isEditable, setIsEditable] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (initialData.logo) {
            setLogo(initialData.logo);
        }
    }, [initialData]);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newLogoUrl = URL.createObjectURL(file);
            console.log('New Logo URL:', newLogoUrl); // Debugging
            setLogo(newLogoUrl);
            setInitialData((prevData) => ({
                ...prevData,
                footer: {
                    ...prevData.footer,
                    logo: newLogoUrl,
                    imageFile: file
                }
            }));

            toast({
                title: 'Logo updated',
                description: 'The logo has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    console.log('Current Logo:', logo); // Debugging

    return (
        <Flex direction="column" align="center" justify="center" textAlign="center" fontFamily="Poppins" borderTop="2px solid #ffffff" borderRadius="20px" padding="1.5rem" background="linear-gradient(270deg, #010132 100%, #6f13ad 0%)" width="100%" margin="0">
            <Box>
                {logo ? (
                    <Image color="white" src={logo} alt="Logo" boxSize="70px" />
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
