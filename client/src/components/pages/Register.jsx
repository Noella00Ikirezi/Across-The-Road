import React, { useState } from 'react';
import { register } from '../../api/authApi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Button,
    Flex,
    FormControl,
    Input,
    VStack,
    Text,
    Link,
    Image,
    InputGroup,
    InputRightElement,
    extendTheme,
    ChakraProvider
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo_b.png';

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

function Register() {
    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        birthdate: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { last_name, first_name, email, phone, password, confirmPassword } = formData;

        if (!last_name || !first_name || !email || !password || !confirmPassword) {
            return 'All required fields must be filled out.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address.';
        }

        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (phone && !phoneRegex.test(phone)) {
            return 'Please enter a valid phone number.';
        }

        if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#/$%/^/&*/)/(+=._-]/.test(password)) {
            return 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
        }

        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }

        return null;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await register(formData);
            console.log(response);
            navigate('/login');
        } catch (error) {
            setError(error.message || 'Registration failed. Please try again.');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <ChakraProvider theme={theme}>
            <Flex minHeight="100vh" align="center" justify="center">
                <VStack spacing={4} bg="whiteAlpha.200" p={8} borderRadius="20px" boxShadow="0 4px 8px rgba(255, 255, 255, 0.3)" width="100%" maxW="400px" margin="50px">
                    <Image src={logo} alt="Logo" boxSize="150px" />
                    <Text fontSize="2xl">Register</Text>
                    {error && <Text color="red.500">{error}</Text>}
                    <form onSubmit={handleRegister} style={{ width: '70%', height: '80%' }}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <Input placeholder="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} bg="white" color="gray.800" _placeholder={{ color: 'gray.500' }} />
                            </FormControl>
                            <FormControl isRequired>
                                <Input placeholder="First Name" name="first_name" value={formData.first_name} onChange={handleChange} bg="white" color="gray.800" _placeholder={{ color: 'gray.500' }} />
                            </FormControl>
                            <FormControl>
                                <Input type="date" placeholder="Birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} bg="white" color="gray.800" _placeholder={{ color: 'gray.500' }} />
                            </FormControl>
                            <FormControl isRequired>
                                <Input placeholder="Email" type="email" name="email" value={formData.email} onChange={handleChange} bg="white" color="gray.800" _placeholder={{ color: 'gray.500' }} />
                            </FormControl>
                            <FormControl>
                                <Input placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} bg="white" color="gray.800" _placeholder={{ color: 'gray.500' }} />
                            </FormControl>
                            <FormControl isRequired>
                                <InputGroup>
                                    <Input
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        bg="white"
                                        color="gray.800"
                                    />
                                    <InputRightElement>
                                        <Button variant="ghost" onClick={toggleShowPassword}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl isRequired>
                                <InputGroup>
                                    <Input
                                        placeholder="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        bg="white"
                                        color="gray.800"
                                    />
                                    <InputRightElement>
                                        <Button variant="ghost" onClick={toggleShowConfirmPassword}>
                                            {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button type="submit" colorScheme="purple" width="full">Register</Button>
                        </VStack>
                    </form>
                    <Flex direction="column" align="center" mt={4}>
                        <Link as={RouterLink} to="/login" color="white">Login</Link>
                    </Flex>
                </VStack>
            </Flex>
        </ChakraProvider>
    );
}

export default Register;
