import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ST from './memberCard.module.scss';
import { ISubscription } from '../../../models/data';
import OUTLAWS from '../../../../assets/img/outlaw.png';
import { getFullNameEmail } from '../../../helpers/user';
import QRCode from 'qrcode.react';

const MemberCard = ({
  handleClose,
  open,
  user,
  subscription,
}: {
  open: boolean;
  handleClose: any;
  user: any;
  subscription: ISubscription;
}) => {
  const mobile = useMediaQuery('(max-width:991px)');
  return (
    <Dialog onClose={handleClose} open={open} fullScreen={mobile}>
      <AppBar sx={{ position: 'relative' }} color='transparent'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => handleClose(false)}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Carte d'adhérent
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={ST.cardWrapper}>
        <div className={ST.card}>
          <div className={ST.pictures}>
            <img src={OUTLAWS} className={ST.picture} />
            <img
              src={`data:image/png;base64,${subscription.picture}`}
              className={ST.picture}
            />
          </div>
          <div className={ST.info}>
            <div className={ST.name}>{getFullNameEmail(user)}</div>
            {user?.email !== getFullNameEmail(user) && user?.email && (
              <div className={ST.email}>{user?.email}</div>
            )}
          </div>
          <div className={ST.qrWrapper}>
            <QRCode
              className={ST.qrCode}
              value={user.id}
              renderAs='svg'
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MemberCard;
