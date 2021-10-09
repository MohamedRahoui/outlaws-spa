import {
  AppBar,
  Backdrop,
  CircularProgress,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { useState } from 'react';
import { IPetition } from '../../../../models/data';

const FilesDialog = ({
  handleClose,
  open,
  petition,
  files,
}: {
  open: boolean;
  handleClose: () => void;
  petition: IPetition | null;
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
            <GridCloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            {petition?.firstname} {petition?.lastname}
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
              'Signature manuscrite',
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
