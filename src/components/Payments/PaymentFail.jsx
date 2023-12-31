import React from 'react';
import {Button,Container,VStack,Heading} from "@chakra-ui/react"
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


function PaymentFail() {
  return (
    <Container h="90vh" p="16">
    <VStack justifyContent={'center'} h="full" spacing={'4'}>
      <RiErrorWarningFill size={'5rem'} />
    <Heading textTransform={'uppercase'}> Payment Fail </Heading>
      <Link to="/">
        <Button variant={'ghost'}> Try Again </Button>
      </Link>
    </VStack>
   </Container>
  );
}

export default PaymentFail;
