import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';

const Footer = ({ initialData }) => {
    const [logo, setLogo] = useState(initialData.logo || '');

    useEffect(() => {
        if (initialData.logo) {
            setLogo(initialData.logo);
        }
    }, [initialData]);

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
            </Box>
            <Text fontSize="sm" color="white" mt="20px">
                © 2024 Copyright
            </Text>
        </Flex>
    );
};

export default Footer;
