import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface AlertDialogProps {
    visible: boolean
    title: string
    description: string
    actions: Array<{
        text: string,
        handler: () => (void | Promise<void>)
    }>
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
    visible,
    title,
    description,
    actions
}) =>
    <Dialog open={visible}>
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {description}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            {actions.map(({ text, handler }, index) =>
                <Button key={index} onClick={async () => { await handler(); }}>
                    {text}
                </Button>
            )}
        </DialogActions>
    </Dialog>