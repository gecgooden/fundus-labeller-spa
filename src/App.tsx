import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useAppState } from './components/AppContext';
import { Action, Tab as Page } from './reducer';
import { View } from './views/View';
import { TabPanel } from './components/TabPanel';
import { AlertDialog } from './components/AlertDialog';

export const App: React.FC = () => {
  const { isSupported, currentTab, dispatch } = useAppState();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs centered value={Object.values(Page).indexOf(currentTab)}>
          {
            Object.values(Page).map(tab => <Tab
              key={tab}
              onClick={() => dispatch({ type: Action.ChangeTab, tab })}
              label={tab}
            />)
          }
        </Tabs>
      </Box>
      <TabPanel>
        <View />
      </TabPanel>
      <AlertDialog 
        visible={!isSupported}
        title='This browser is not supported' 
        description='This website needs special features that are not supported in your current web browser. Please open this site in either Google Chrome or Microsoft Edge.'
        actions={[]}
      />
    </Box>
  );
};
