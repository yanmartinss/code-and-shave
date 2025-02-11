import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export const ErrorModal = ({ open, onClose, title, message, children }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title || 'Erro'}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message || 'Ocorreu um erro.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {children} {/* Aqui renderizamos os botões passados */}
            </DialogActions>
        </Dialog>
    );
};