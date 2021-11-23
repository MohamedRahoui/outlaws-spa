import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ST from './transfer.module.scss';
import Outlaws from '../../../assets/img/outlaw.png';
const Transfer = ({
  handleClose,
  open,
  mode = 'donate',
}: {
  open: boolean;
  handleClose: any;
  mode?: 'donate' | 'payement';
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
            {mode === 'donate' ? 'Soutenez-nous' : 'Valider votre adhésion'}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={ST.transferWrapper}>
        <div className={ST.transfer}>
          <img src={Outlaws} alt='Moroccan Outlaws' className={ST.logo} />
          <div className={ST.message}>
            {mode === 'donate'
              ? 'Vous souhaitez soutenir nos actions? Voici nos coordonnées bancaires:'
              : "Afin activer votre adhésion pour une durée d'une année, veuillez faire un virement de 100Dhs ( 50Dhs pour les étudiants ) vers le compte suivant:"}
          </div>
          <span className={ST.label}>IBAN</span> :{' '}
          <span className={ST.value}>MA64011780000016200001214071</span>
          <br />
          <br />
          <span className={ST.label}>RIB</span> :{' '}
          <span className={ST.value}>011780000016200001214071</span>
          <br />
          <br />
          <span className={ST.label}>SWIFT/BIC</span> :{' '}
          <span className={ST.value}>BMCEMAMC</span>
        </div>
      </div>
    </Dialog>
  );
};

export default Transfer;
