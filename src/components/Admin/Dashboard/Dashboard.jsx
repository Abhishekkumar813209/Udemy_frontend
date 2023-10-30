import { Box, Grid, HStack, Heading, Progress, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../layout/loader/Loader';

const Databox = ({title,qty,qtyPercentage,profit}) =>(
  <Box 
  w={['full','20%']} 
  boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
  p="8"
  borderRadius={'lg'}
  >

  <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight='bold' children={qty} />
      <HStack>
 <Text children={title} />
      {profit?(<RiArrowUpLine color="green" />
):(
  <RiArrowDownLine color="red" />
)}
 </HStack>
  </HStack>
  <Text opacity={0.6} children={'Since Last Month'} />
     </Box>
)

const Bar = ({title,value,profit})=>(
  <Box py="4" px ={['0','20']}>
    <Heading size="sm" children={title} mb="2" />
    <HStack w='full' alignItems={'center'}>
        <Text children={profit?"0%":`-${value}%`} />
        <Progress w="full" value={profit?value:0} colorScheme="purple" />
        <Text children={`${value>100 ? (value) :100 }%`} />
    </HStack>
  </Box>
)

function Dashboard() {
  const dispatch = useDispatch();
  const {loading,
    stats,
  viewsCount,
  usersCount,
  subscriptionPercentage,
  viewsPercentage,
  usersPercentage,
  subscriptionProfit,
  viewsProfit,
  userProfit
  } = useSelector(state=>state.admin);
  useEffect(()=>{
    dispatch(getDashboardStats())
  },[dispatch])
  return (
   <Grid
   
   minH={'100vh'}
   templateColumns={['1fr','5fr 1fr']}
   >
    {
      loading?(
       <Loader /> 
      ):(
        <Box
    boxSizing='border-box'
    py="16" px={['4','0']}
    > 
    <Text 
    textAlign={'center'}
    opacity={0.5}
    children={`Last change was on ${String(new Date()).split('G')[0]}`}
    />
    <Heading 
    children="Dashboard"
    ml={['0','16']}
    mb="16"
    textAlign={['center','left']}
    />
    <Stack
    direction = {['column','row']}
    minH='24'
    justifyContent={'space-evenly'}
    >
      <Databox title="Views" qty={123} qtyPercentage={30} profit={true} />
      <Databox title="Users" qty={23} qtyPercentage={78} profit={true} />
      <Databox title="Subscription" qty={12} qtyPercentage={20} profit={true} />

        </Stack>
        <Box 
        m={['0','16']}
        borderRadius='lg'
        p={['0','16']}
        mt={['4','16']}
        boxShadow={'-2px 0 10px rgba(107,70,193,0,5)'}
        >
          <Heading 
          textAlign={['center','left']}
          size="md"
          children="Views Graph"
          pt={['8','0']}
          ml={['0','16']}
          />
        </Box>

        <Grid templateColumns={['1fr','2fr 1fr']}>
          <Box p="4">
            <Heading 
            textAlign={['center','left']}
            size="md"
            children="Progress Bar"
            my="8"
            ml={['0','16']}
            />
            {/* Line Chart Here */}
            <LineChart />
        <Box>
          
                <Bar profit={true} title="views" value={viewsPercentage} />
                <Bar profit={true} title="Users" value={usersPercentage} />
                <Bar profit={false} title="Subscription" value={subscriptionPercentage} />

          </Box>
          </Box>
          <Box p={['0','16']} boxSizing='border-box' py="4">
            <Heading textAlign={'center'} size="md" mb="4" children="Users" />
            <DoughnutChart />
          </Box>
        </Grid>

    </Box>
      )
    }
    <Sidebar />
   </Grid>
  );
}

export default Dashboard;
