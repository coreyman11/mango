import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { createClient, signInWithPassword } from '@supabase/supabase-js';

import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

const supabase_url = "https://rkchmxczmfbkjysxrqzm.supabase.co";
const supabase_anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrY2hteGN6bWZia2p5c3hycXptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMzOTE3MjksImV4cCI6MTk5ODk2NzcyOX0.FbsVqj3oOTjnB4BWo7x5M3iLvzUpHkS7yIqXWy1zXX0";

const supabase = createClient(supabase_url, supabase_anon_key);

function SignIn() {
  const history = useHistory();
  const textColor = "black"; // Change text color to black
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error(error, 'loginnowork');
        // Handle error during sign-in
      } else {
        console.log("Sign-in successful:", user);
        // Redirect to the dashboard page
        history.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      bg={useColorModeValue("gray.50", "gray.900")}
    >
      <Box maxW="sm" py="8" px="6" bg="white" shadow="lg" rounded="lg">
        <Box textAlign="center">
          <Heading size="lg" mb="4" color={textColor}>
            ACESS
          </Heading>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color="black" // Set text color to black
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="black" // Set text color to black
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              type="submit"
            >
              Sign In
            </Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
}

export default SignIn;
