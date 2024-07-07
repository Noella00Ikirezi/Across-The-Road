import React, { useState } from 'react';
import  {resetPassword} from '../../api/authApi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Flex, FormControl, Input, Text, VStack, Image, extendTheme, ChakraProvider } from '@chakra-ui/react';
import logo from '../../assets/logo_b.png';

// Extend the theme to include custom colors, fonts, etc.
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bgGradient: "linear(to-l, #010132, #723c8d)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      },
    },
  },
});

function Resetpassword() {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(formData);
      console.log(response);
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Reset failed. Please try again.');
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" align="center" justify="center">
        <VStack spacing={4} bg="whiteAlpha.200" p={8} borderRadius="20px" boxShadow="0 4px 8px rgba(255, 255, 255, 0.3)" width="100%" maxW="400px">
          <Image src={logo} alt="Logo" boxSize="150px" />
          <Text fontSize="2xl">Reset Password</Text>
          {error && <Text color="red.500">{error}</Text>}
          <form onSubmit={handleReset} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <Input color="Black" name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} autoComplete="on" bg="white" />
              </FormControl>
              <FormControl isRequired>
                <Input color="Black" name="confirmPassword" placeholder="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} autoComplete="on" bg="white" />
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">Reset</Button>
            </VStack>
          </form>
          <RouterLink to="/login">
            <Text mt={4} color="red.500" >Login</Text>
          </RouterLink>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default Resetpassword;
