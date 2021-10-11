import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { IVolunteer } from '../../../../models/data';
import ST from './answersDialog.module.scss';

const AnswersDialog = ({
  handleClose,
  open,
  volunteer,
}: {
  open: boolean;
  handleClose: () => void;
  volunteer: IVolunteer | null;
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
            {volunteer?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <div className={ST.heading}>Comment pouvez-vous nous aider ?</div>
        <div className={ST.answer}>{volunteer?.help}</div>
        <br />
        <div className={ST.heading}>Quel est votre domaine d’expertise ?</div>
        <div className={ST.answer}>{volunteer?.expertise}</div>
        <br />
        <div className={ST.heading}>Quelles sont vos qualifications ?</div>
        <div className={ST.answer}>{volunteer?.qualifications}</div>
      </Box>
    </Dialog>
  );
};

export default AnswersDialog;
