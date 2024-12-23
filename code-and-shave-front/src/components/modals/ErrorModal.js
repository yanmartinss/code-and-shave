import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const ErrorModal = ({ open, onClose, title, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || 'Erro'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message || 'Ocorreu um erro.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: 'black' }}>
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    );
}