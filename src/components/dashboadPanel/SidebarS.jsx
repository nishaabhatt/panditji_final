 import * as React from 'react';
 import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SuperAdmin from "../../panel/super-admin";
import AdminTab from "../../panel/admin";
import PanditTab from "../../panel/pandit";
import UserTab from "../../panel/user";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p:3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  
  const handleRoleUpdate = (adminDetails, panditDetails) => {
    // Implement logic to set adminDetails in the state or update the UI
    console.log('Admin details:', adminDetails, panditDetails);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{  flexGrow:1, bgcolor: 'background.paper', display: 'flex',  height: '100vh', width: '100vw'}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className=""
      >
        <Tab label="Create Role" {...a11yProps(0)} />
        <Tab label="Admin List" {...a11yProps(1)} />
        <Tab label="Pandit List" {...a11yProps(2)} />
        <Tab label="User Detail" {...a11yProps(3)} />
        <Tab label="Orders" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      {/* create role */}
      <TabPanel value={value} index={0}>
        <SuperAdmin onRoleUpdate={handleRoleUpdate}/>
      </TabPanel>
      {/* admin */}
      <TabPanel value={value} index={1}>
        <AdminTab />
      </TabPanel>
      {/* pandit */}
      <TabPanel value={value} index={2}>
        <PanditTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UserTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        item five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}

