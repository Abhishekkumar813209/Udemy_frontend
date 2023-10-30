import React from 'react'
import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import {TiSocialYoutubeCircular,TiSocialInstagramCircular} from "react-icons/ti"
import {DiGithub } from 'react-icons/di'
const Footer = () => {
  return (
   <Box padding={'4'} bg="blackAlpha.800" minH={'10vh'} width={['full','100%']}>
    <Stack direction={['column','row']} >
        <VStack alignItems={['center','flex-start']} width="full">
            <Heading children="All Rights Reserved" color={'white'} />
            <Heading 
            fontFamily={'body'}
            size='sm'
            children="@6 pack Programmer" 
            color={'yellow.400'} />
       ]
        <HStack HStack spacing={['2','10']} justifyContent="center" color="white" fontSize={'50'}>
            <a href="https://youtube.com/6packprogrammer" target={'blank'}>
                <TiSocialYoutubeCircular />
            </a>
            <a href="https://youtube.com/6packprogrammer" target={'blank'}>
                <TiSocialInstagramCircular />
            </a>
            <a href="https://youtube.com/6packprogrammer" target={'blank'}>
                <DiGithub />
            </a>
        </HStack>
        </VStack>
    </Stack>

   </Box>
  )
}

export default Footer