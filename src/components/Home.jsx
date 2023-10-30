import { Stack, VStack,Heading,Text,Button,Image ,Box, HStack} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import React from 'react'
import "./home.css"
import boy from "./../assets/images/boy.png"
import {CgGoogle,CgYoutube} from "react-icons/cg"
import {SiCoursera,SiUdemy} from "react-icons/si"
import {DiAws} from "react-icons/di"
import introVideo from "./../assets/videos/lake_aerial_view_drone_flight_view_943.mp4"

const Home = () => {
  return (
    <section className="home">
        <div className="container">
            <Stack
            direction={['column','row']}
            height="100%"
            justifyContent={['center','space-between']}
            alignItems="center"
            spacing={['16','56']} 
            >
                <VStack
                width={'full'}
                alignItems={['center','flex-end']}
                spacing={'8'}
                >
                    <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} 
                    spacing="8"
                    />
                        <Text
                        textAlign={['center','left']}                        children="Find Valuable Content at  Reasonable Price" />
                            <Link to="/courses">
                                <Button size={'lg'} colorScheme='yellow'>
                                    Explore Now
                                </Button>
                            </Link>
                    
                </VStack>

                <Image className='vector' boxSize={'md'} src={boy} objectFit={'contain'}/>
            </Stack>
            </div>
            <Box 
            padding={'8'} 
            bg={'blackAlpha.800'}
            color={'yellow.800'}
            children="Our Brands"
            >
                <Heading 
                textAlign={'center'}
                fontFamily="body"
                color={'yellow.400'}
                children="OUR BRANDS"
                />
                <HStack className='brands-banner' 
                justifyContent={'space-evenly'}
                marginTop="4"
                >
                    <CgGoogle/>
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />
                    <DiAws />
                </HStack>
                
            </Box>

            <div className="container2">
                <video 
                autoplay 
                controls 
                controlsList='nodownload nofullscreen noremoteplayback'
                disablePictureInPicture
                src={introVideo}>

                </video>
            </div>
    </section>
  )
}

export default Home