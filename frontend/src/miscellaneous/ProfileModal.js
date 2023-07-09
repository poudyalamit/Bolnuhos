import {  Avatar, Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? <span onClick={onOpen}>{children}</span>
        : <IconButton
          display={{ base: "flex" }}

          icon={<Avatar src={user.pic}/>}
          onClick={onOpen} />}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered="true" >
        <ModalOverlay />
        <ModalContent h={"410px"}>
          <ModalHeader
            fontSize={"40px"} fontFamily={"work-sans"} display={"flex"} justifyContent={"center"} >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"space-between"}>
            <Image borderRadius={"full"} boxSize={"150px"} src={user.pic} alt={user.name} />
            <Text fontSize={{ base: "28px", md: "30px" }} fontFamily={"sans-serif"}> Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

export default ProfileModal
