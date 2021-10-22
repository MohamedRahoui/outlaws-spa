import { AppBar, Dialog, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { IVote } from '../../../../models/data';
import ST from './answersDialog.module.scss';

const AnswersDialog = ({
  handleClose,
  open,
  vote,
}: {
  open: boolean;
  handleClose: () => void;
  vote: IVote | null;
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
            {vote?.name || 'Anonyme'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <div className={ST.heading}>What is Love for you?</div>
        <div className={ST.answer}>{vote?.love}</div>
        <br />
        <div className={ST.heading}>
          What is a right to you? and can Love be considered as a right?
        </div>
        <div className={ST.answer}>{vote?.right}</div>
        <br />
        <div className={ST.heading}>love or law?</div>
        <div className={ST.answer}>{vote?.choice}</div>
        <br />
        <div className={ST.heading}>recommendations?</div>
        <div className={ST.answer}>{vote?.recommendation}</div>
      </Box>
    </Dialog>
  );
};

export default AnswersDialog;
