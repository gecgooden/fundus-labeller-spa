import React from 'react';
import { Button } from '@mui/material';
import { LoadModelDialog } from '../components/LoadModelDialog';

export const Settings: React.FC = () => {
  const [loadDialogOpen, setLoadDialogOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setLoadDialogOpen(true)}>
        Import Model
      </Button>
      <LoadModelDialog
        visible={loadDialogOpen}
        close={() => setLoadDialogOpen(false)}
      />
    </>
  );
};
