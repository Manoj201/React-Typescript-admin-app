import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {TransitionProps} from '@material-ui/core/transitions';
import CircularProgress from '@material-ui/core/CircularProgress';

interface AlertDialogProps {
  open: boolean;
  onCloseDialog: () => void;
  header: string;
  description: string;
  loading: boolean;
  onPressYes: () => void;
  onPressNo: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {children?: React.ReactElement<any, any>},
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onCloseDialog,
  header,
  description,
  loading,
  onPressYes,
  onPressNo,
}) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCloseDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title" style={{backgroundColor: '#1b8f57', color: '#ffff'}}>
        <Typography style={{fontWeight: 'bold'}} variant="h6">
          {header}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Typography variant="body2">{description}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onPressNo} style={{backgroundColor: '#8f531b', color: '#fff'}}>
          No
        </Button>
        <Button onClick={onPressYes} style={{backgroundColor: '#1b8f8b', color: '#fff'}} disabled={loading}>
          {!loading ? 'Yes' : <CircularProgress style={{color: '#fff'}} size={24} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
