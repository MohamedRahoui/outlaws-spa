import {
  AppBar,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Toolbar,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/system';
import { IMember } from '../../../../models/data';

const FilesDialog = ({
  handleClose,
  open,
  member,
  files,
}: {
  open: boolean;
  handleClose: () => void;
  member: IMember | null;
  files: string[];
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
            {member?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        <ImageList
          variant='quilted'
          cols={1}
          style={{
            width: 500,
            margin: 'auto',
            maxWidth: '100%',
          }}
        >
          {files.map((file, index) => {
            const fileNames = [
              "Carte d'identité recto",
              "Carte d'identité verso",
              'Photo',
            ];
            return (
              <ImageListItem
                key={index}
                style={{
                  marginBottom: 10,
                }}
              >
                <img
                  src={`data:image/png;base64,${file}`}
                  srcSet={`data:image/png;base64,${file}`}
                  alt={fileNames[index]}
                  loading='lazy'
                />
                <ImageListItemBar title={fileNames[index]} />
              </ImageListItem>
            );
          })}
        </ImageList>
      </Box>
    </Dialog>
  );
};

export default FilesDialog;
