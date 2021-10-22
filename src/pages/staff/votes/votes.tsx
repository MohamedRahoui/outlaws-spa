import { Button, IconButton, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { IVote } from '../../../models/data';
import { votesStore } from '../../../store';
import AnswersDialog from './answersDialog/answersDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Votes = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<IVote | null>(null);
  const snap = useSnapshot(votesStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchVotes();
  }, [executeRecaptcha]);

  const handleAnswersClose = () => {
    setDetails(false);
    setSelected(null);
  };

  const openAnswers = (vote: IVote) => {
    setSelected(vote);
    setDetails(true);
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'age', headerName: 'Age', minWidth: 130, flex: 1 },
    { field: 'gender', headerName: 'Gender', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    {
      field: 'show_details',
      headerName: 'Réponses',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton
            size='small'
            onClick={() => openAnswers(params.row as IVote)}
            color='primary'
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  const fetchVotes = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha('fetchVotes' as string);
      Axios.get('votes', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          votesStore.setVotes(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.votes.map((x) => x)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 50, 100]}
        autoHeight
        loading={loading}
        autoPageSize
      />
      <Suspense fallback={<div></div>}>
        <AnswersDialog
          open={details}
          handleClose={handleAnswersClose}
          vote={selected}
        />
      </Suspense>
    </div>
  );
};

export default Votes;
