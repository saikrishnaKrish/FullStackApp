import { useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoginPage from './LoginPage';
import SignInPage from './SignInPage';
import './styles.scss'


const SignOnPortal = () => {
  const [value,setValue]=useState('1')
  const handleTabChange = (event, newValue) => {
      setValue(newValue);
  };



  return (
    <Box 
      className="SignOn-Container"
      textAlign={'center'}
    > 
      <h4>Welcome to SK Electronics!!</h4>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Sign Ip" value="1" />
            <Tab label="Sign UP" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <LoginPage handleTabChange={handleTabChange}/>
        </TabPanel>
        <TabPanel value="2">
            <SignInPage/>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default SignOnPortal