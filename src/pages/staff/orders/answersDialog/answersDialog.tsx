import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { IOrder } from '../../../../models/data';
import ST from './answersDialog.module.scss';
import { rewardsLabels } from '../../../../helpers/labels';

const AnswersDialog = ({
  handleClose,
  open,
  order,
}: {
  open: boolean;
  handleClose: () => void;
  order: IOrder | null;
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
            {order?.name} :{' '}
            {rewardsLabels[order?.reward?.code || 'SUBSCRIPTION']}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <div className={ST.heading}>Commande</div>
        <div className={ST.answer}>
          {rewardsLabels[order?.reward?.code || 'SUBSCRIPTION']}
        </div>
        <br />
        <div className={ST.heading}>Nom</div>
        <div className={ST.answer}>{order?.name}</div>
        <br />
        <div className={ST.heading}>Phone</div>
        <div className={ST.answer}>{order?.phone}</div>
        <br />
        <div className={ST.heading}>Email</div>
        <div className={ST.answer}>{order?.email}</div>
        <br />
        <div className={ST.heading}>Adresse</div>
        <div className={ST.answer}>{order?.address}</div>
      </Box>
    </Dialog>
  );
};

export default AnswersDialog;
