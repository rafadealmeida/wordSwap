'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { TextField } from '@mui/material';
import { User, getAuth, updateProfile } from 'firebase/auth';
import { app } from '@/service/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const auth = getAuth(app);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  setOpen(value: boolean): void;
}
export const UpdateName: React.FC<Props> = ({ open, setOpen }) => {
  const [name, setName] = React.useState('');
  const router = useRouter();

  const upadateNameUser = () => {
    try {
      updateProfile(auth.currentUser as User, {
        displayName: name,
      });
      toast.success('Nome alterado com sucesso');
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado ao atualizar o nome do usuário');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        // open
        open={open}
        TransitionComponent={Transition}
        fullWidth
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Primeiro acesso?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Defina o nome do seu usuário.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome do usuário"
            type="text"
            fullWidth
            variant="outlined"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='outlined'>Cancelar</Button>
          <Button onClick={upadateNameUser} color='success' variant='contained'>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
