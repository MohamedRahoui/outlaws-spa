import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { IMessage, ITestimony } from '../../../../models/data';
import ST from './answersDialog.module.scss';

const AnswersDialog = ({
  handleClose,
  open,
  testimony,
}: {
  open: boolean;
  handleClose: () => void;
  testimony: ITestimony | null;
}) => {
  return (
    <Dialog onClose={handleClose} open={open} fullScreen>
      <AppBar sx={{ position: 'relative' }} color='transparent'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            {testimony?.name || 'Anonyme'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <div className={ST.heading}>Témoignage</div>
        <div className={ST.answer}>{testimony?.text}</div>
      </Box>
    </Dialog>
  );
};

export default AnswersDialog;
