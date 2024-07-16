import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Flex, Button, Image, List, ListItem, Text, Box } from '@chakra-ui/react';
import logo from '../../assets/logo_b.png';
import { useAuth } from '../../api/authContext';
import { getProfile } from '../../api/authApi';
import { FaUserCircle } from 'react-icons/fa';

const navLinks = [
  {
    id: "/",
    title: "Home",
  },
  {
    id: "blog",
    title: "Blog",
  },
  {
    id: "Admin",
    title: "admin",
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const { authToken, userId, logout } = useAuth();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (authToken && userId) {
      const fetchUserName = async () => {
        try {
          const data = await getProfile();
          setUsername(data.user.first_name + ' ' + data.user.last_name);
          localStorage.setItem('userName', data.user.first_name + ' ' + data.user.last_name);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserName();
    }
  }, [authToken, userId]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
      <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bgGradient="linear(to-r, #010132, #6f13ad)"
          color="white"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={999}
      >
        <Image src={logo} alt="Website Logo" htmlWidth="60px" htmlHeight="50px" cursor="pointer" onClick={() => navigate('/')} />

        <List display="flex" flexDirection="row" flexGrow={1} justifyContent="center">
          {navLinks.map((link) => (
              <ListItem key={link.id} px={4}>
                <RouterLink to={link.id === "/" ? "/" : `/${link.id}`}>
                  <Text fontSize="1rem" _hover={{ textDecoration: 'underline' }}>
                    {link.title}
                  </Text>
                </RouterLink>
              </ListItem>
          ))}
        </List>

        <Flex align="center" direction="column">
          {authToken ? (
              <>
                <FaUserCircle size="30px" cursor="pointer" onClick={handleProfileClick} />
                <Box textAlign="center" mt={2}>
                  <Text fontSize="1rem">{username || 'User'}</Text>
                  <Button onClick={handleLogout} variant="link" mt={2}>
                    <Text _hover={{ textDecoration: 'underline' }}>Logout</Text>
                  </Button>
                </Box>
              </>
          ) : (
              <RouterLink to="/login">
                <Text fontSize="1rem" _hover={{ textDecoration: 'underline' }}>
                  Login
                </Text>
              </RouterLink>
          )}
        </Flex>
      </Flex>
  );
};

export default Navbar;
