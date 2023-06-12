import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const handleClick = () => {
        setShow(!show);
    }
    const submitHandler = () => { }

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
                            {show ? <FaRegEyeSlash/> : <FaRegEye/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                w='100%'
                style={{ marginTop: 15 }}
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
