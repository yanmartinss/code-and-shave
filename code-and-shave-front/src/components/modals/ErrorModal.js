import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

export const ErrorModal = ({ open, onClose, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Erro</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message || 'Ocorreu um erro.'} {/* Exibe a mensagem de erro passada ou uma mensagem padrão */}
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