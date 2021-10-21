import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { ITrainee } from '../../../../models/data';
import ST from './answersDialog.module.scss';

const AnswersDialog = ({
  handleClose,
  open,
  trainee,
}: {
  open: boolean;
  handleClose: () => void;
  trainee: ITrainee | null;
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
            {trainee?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <div className={ST.heading}>Niveau d'étude ?</div>
        <div className={ST.answer}>{trainee?.degree}</div>
        <br />
        <div className={ST.heading}>Spécialité ?</div>
        <div className={ST.answer}>{trainee?.speciality}</div>
        <br />
        <div className={ST.heading}>Date de disponibilité ?</div>
        <div className={ST.answer}>{trainee?.availability}</div>
        <br />
        <div className={ST.heading}>
          Pourquoi souhaitez-vous rejoindre le Collectif 490 ?
        </div>
        <div className={ST.answer}>{trainee?.letter}</div>
      </Box>
    </Dialog>
  );
};

export default AnswersDialog;
