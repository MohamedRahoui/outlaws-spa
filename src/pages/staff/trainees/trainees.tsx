import { Button, IconButton, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { ITrainee } from '../../../models/data';
import { traineesStore } from '../../../store';
import AnswersDialog from './answersDialog/answersDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
const Trainees = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<ITrainee | null>(null);
  const snap = useSnapshot(traineesStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchTrainees();
  }, [executeRecaptcha]);

  const handleAnswersClose = () => {
    setDetails(false);
    setSelected(null);
  };

  const openAnswers = (trainee: ITrainee) => {
    setSelected(trainee);
    setDetails(true);
  };
  const downloadCv = async (trainee_id: ITrainee['id']) => {
    if (!executeRecaptcha) return;
    const recaptcha = await executeRecaptcha('fetchTraineeCv' as string);
    Axios.get(`trainees/cv/${trainee_id}`, {
      headers: {
        'X-RECAPTCHA': recaptcha,
      },
      responseType: 'arraybuffer',
    })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch(() => {});
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
      field: 'download_cv',
      headerName: 'CV',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton
            size='small'
            onClick={() => downloadCv(params.row.id)}
            color='primary'
          >
            <DownloadIcon />
          </IconButton>
        );
      },
    },
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
            onClick={() => openAnswers(params.row as ITrainee)}
            color='primary'
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  const fetchTrainees = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha('fetchTrainees' as string);
      Axios.get('trainees', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          traineesStore.setTrainees(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.trainees.map((x) => x)}
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
          trainee={selected}
        />
      </Suspense>
    </div>
  );
};

export default Trainees;
