import React, { useEffect } from 'react'
import { Box, Container, Text,Tabs,TabPanel,TabPanels,Tab,TabList } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'
import {  useNavigate } from 'react-router-dom'

const Home = () => {
  const history=useNavigate();

  
  useEffect(()=>{
    const user= JSON.parse(localStorage.getItem("userInfo"));
   
    if(user){
        history("/chats");
    }
},[history])

  return (
    <Container maxW="xl" centerContent>
      <Box display="flex" justifyContent='center' p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius='lg' borderWidth='1px'>
        <img alt=''  width={"50px"} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEndyAOzNXpoLrE5yIlQUiNUh4kmiC_3FrL1kqajUdIeOolNHhLECqS9RgErQ-rJE4Pew&usqp=CAU'></img>
        <Text fontSize='4xl' color={"blue"} fontFamily="sans-serif">Bolnuhos</Text>
      </Box>
      <Box bg='white' w="100%" p={4} borderRadius='lg' color='black'  borderWidth='1px'>
        <Tabs variant='soft-rounded' >
          <TabList mb='1em'>
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Home
