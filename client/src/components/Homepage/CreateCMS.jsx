import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, Text, Flex, Image } from '@chakra-ui/react'; 
import { ArrowForwardIcon } from '@chakra-ui/icons';
import logo from '../../assets/logo_b.png'; 

const CreateCMS = ({ toggleCMS }) => {
    return (
        <Flex
            className="create-page-container"
            padding="5rem"  
            textAlign="center"
            margin="auto"  
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            maxWidth="960px"  
        >
            <Image src={logo} alt="Website Logo" width="500px" mb="2" /> 
            <Heading color="white" fontSize="4xl" mb="2">Créez votre site web</Heading>
            <Text color="white" fontSize="2xl" mb="4">Commencez en cliquant sur le bouton ci-dessous !</Text>
            <Flex
                direction="row"  
                wrap="wrap"  
                justifyContent="center"
                gap="2rem"  
            >
                <Link to="/CMSItem">
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="red" 
                        variant="solid"  
                        size="lg"
                        width="250px"  
                        onClick={toggleCMS}
                    >
                        Créer votre site web
                    </Button>
                </Link>
                <Link to="/CMSAdmin">
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="purple" 
                        variant="solid"
                        size="lg"
                        width="250px"
                    >
                        Voir Nos Associations
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
}

export default CreateCMS;
