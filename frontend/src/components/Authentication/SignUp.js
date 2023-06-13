import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { useToast } from '@chakra-ui/react'
import axios from "axios"
import {useHistory} from 'react-router-dom'
const SignUp = () => {
  const [show,setShow]=useState(false);
  const [showe,setShowe]=useState(false);
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [cpassword,setCpassword]=useState();
  const [pic,setPic]=useState();
  const [loading,setLoading]=useState(false);
  const toast =useToast();  
  const history = useHistory();

  const handleClick=()=>{
    setShow(!show);
  }  
  const handlecClick=()=>{
    setShowe(!showe);
  }

  const postDetails=(pics)=>{
    setLoading(true);
    if(pics === undefined){
      toast({
        title:"Please Select an Image!",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-right"
      })
      return ;
    }
    if(pics.type==="image/jpeg" || "image/png"){
      const data =new FormData();
      data.append("file",pics);
      data.append("upload_preset","Bolnuhos");
      data.append("cloud_name","dbm7njgwk");
      fetch("https://api.cloudinary.com/v1_1/dbm7njgwk/image/upload",{
        method:'post',
        body:data,
      }).then((res)=>res.json())
      .then(data=>{
        setPic(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
        setLoading(false);
      })

    }else{
      toast({
        title:"Please Select an Image of png or jpeg!",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-right"
      })
    }
  }

  const submitHandler=async ()=>{
    setLoading(true);
    if(!(name,password,email,cpassword)){
      toast({
        title:"Please Fill all the Credentials",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-right"
      })
      setLoading(false);
      return;
    }
    if(password !== cpassword){
      toast({
        title:"Passwords Do Not Match",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-right"
      })
    }
    try {
      const config={
        headers:{
          "Content-Type":"application/json",
        }
      }
      const {data}= await axios.post("/api/user/create",{name,email,password,pic},
      config);
      toast({
        title:"Registration Successful",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top-right"
      });
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      history.push('/');

    } catch (error) {
      toast({
        title:"Error Occured!",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"top-right"
      })
      setLoading(false);
    }
  }

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
    onClick={submitHandler}
    isLoading={loading} >Sign Up</Button>
   </VStack>
  )
}

export default SignUp
