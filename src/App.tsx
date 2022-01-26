import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useAppState } from './components/AppContext';
import { Action, Tab as Page } from './reducer';
import { View } from './views/View';
import { TabPanel } from './components/TabPanel';
import { AlertDialog } from './components/AlertDialog';

export const App: React.FC = () => {
  const { currentTab, model, dispatch } = useAppState();

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
        visible={model === undefined && currentTab === Page.Label}
        title='Model is missing' 
        description='A trained model is required. Please go to settings and import your model.' 
        actions={[
          {
            text: 'Go to Settings', handler: () => {
              dispatch({ type: Action.ChangeTab, tab: Page.Settings });
            }
          }
        ]}
      />
    </Box>
  );
};
