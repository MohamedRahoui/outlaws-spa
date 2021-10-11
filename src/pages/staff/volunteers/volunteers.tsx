import { Button, IconButton, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { IVolunteer } from '../../../models/data';
import { volunteersStore } from '../../../store';
import AnswersDialog from './answersDialog/answersDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Volunteers = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<IVolunteer | null>(null);
  const snap = useSnapshot(volunteersStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchVolunteers();
  }, [executeRecaptcha]);

  const handleAnswersClose = () => {
    setDetails(false);
    setSelected(null);
  };

  const openAnswers = (volunteer: IVolunteer) => {
    setSelected(volunteer);
    setDetails(true);
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    { field: 'phone', headerName: 'Téléphone', minWidth: 130, flex: 1 },
    { field: 'birth', headerName: 'Naissance', minWidth: 130, flex: 1 },
    {
      field: 'address',
      headerName: 'Adresse',
      minWidth: 130,
      flex: 1,
    },
    { field: 'social', headerName: 'Social', minWidth: 130, flex: 1 },
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
            onClick={() => openAnswers(params.row as IVolunteer)}
            color='primary'
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  const fetchVolunteers = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha('fetchVolunteers' as string);
      Axios.get('volunteers', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          volunteersStore.setVolunteers(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.volunteers.map((x) => x)}
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
          volunteer={selected}
        />
      </Suspense>
    </div>
  );
};

export default Volunteers;
