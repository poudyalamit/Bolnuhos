import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const handleClick = () => {
    setShow(!show);
  }
  const submitHandler = async () => {
    setLoading(true);
    if (!(password, email)) {
      toast({
        title: "Please Fill all the Credentials",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        }
      }
      const { data } = await axios.post("/api/user/login", { email, password },
        config);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history('/chats');

    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      })
      setLoading(false);
    }
  }

  return (
    <VStack>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Enter Your Email'
          onChange={(e) => { setEmail(e.target.value) }} />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : 'password'} placeholder='Enter Password'
            onChange={(e) => { setPassword(e.target.value) }} isRequired />
          <InputRightElement w='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? <FaRegEyeSlash /> : <FaRegEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        color='white'
        w='100%'
        style={{ marginTop: 15 ,"background":"#1a1a8d"}}
        onClick={submitHandler}>Login</Button>
      <Button
        variant='solid'
        colorScheme='red'
        w='100%'
        style={{ marginTop: 15 }}
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}>Login as Guest</Button>
    </VStack>
  )
}

export default Login
