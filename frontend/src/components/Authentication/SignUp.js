import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const SignUp = () => {
  const [show,setShow]=useState(false);
  const [showe,setShowe]=useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [cpassword,setCpassword]=useState();
  const [pic,setPic]=useState();

  const handleClick=()=>{
    setShow(!show);
  }  
  const handlecClick=()=>{
    setShowe(!showe);
  }

  const postDetails=(pics)=>{}

  const submitHandler=()=>{}

  return (
   <VStack spacing='5px' color='black'>
    <FormControl id='name' isRequired>
      <FormLabel>Name</FormLabel>
        <Input placeholder='Enter Your Name'
        onChange={(e)=>{setName(e.target.value)}}/>
    </FormControl>
    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
        <Input placeholder='Enter Your Email'
        onChange={(e)=>{setEmail(e.target.value)}}/>
    </FormControl>
    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
      <InputGroup>
        <Input type={show ? "text":'password'} placeholder='Enter Password'
        onChange={(e)=>{setPassword(e.target.value)}}/>
        <InputRightElement w='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? <FaRegEyeSlash/> : <FaRegEye/>}
          </Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>
    <FormControl id='cpassword' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
        <Input type={showe ? "text":'password'} placeholder='Enter Password'
        onChange={(e)=>{setCpassword(e.target.value)}}/>
        <InputRightElement w='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handlecClick}>
          {showe ? <FaRegEyeSlash/> : <FaRegEye/>}
          </Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>

    <FormControl id='pic' >
      <FormLabel>Upload Your Picture</FormLabel>
        <Input type='file' p={1.5} accept='image/*'
        onChange={(e)=>{postDetails(e.target.files[0])}}/>
    </FormControl>

    <Button
    colorScheme='blue'
    w='100%'
    style={{marginTop:15}}
    onClick={submitHandler}>Sign Up</Button>
   </VStack>
  )
}

export default SignUp
