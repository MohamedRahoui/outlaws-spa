import { Button, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { IPetition } from '../../../models/data';
import { petitionsStore } from '../../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';

const Petitions = () => {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [selectedPetiton, setSelectedPetiton] = useState<IPetition | null>(
    null
  );
  const [files, setFiles] = useState<string[]>([]);
  const snap = useSnapshot(petitionsStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchPetitons();
  }, [executeRecaptcha]);

  const FilesDialog = lazy(() => import('./filesDialog/filesDialog'));
  const getFiles = async (id: IPetition['id']): Promise<[]> => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('fetchPetitionFiles' as string);
    try {
      const resp = await Axios.get(`petitions/files/${id}`, {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      });
      return resp.data || [];
    } catch (_) {
      console.error('Failed files download');
      return [];
    }
  };
  const handleFilesDialogClose = () => {
    setOpenFileDialog(false);
    setSelectedPetiton(null);
    setFiles([]);
  };

  const handleFilesDialogOpen = async (petiton: IPetition) => {
    setSelectedPetiton(petiton);
    setFileLoading(true);
    const files = await getFiles(petiton.id);
    if (files.length) {
      setFiles(files);
      setOpenFileDialog(true);
      setFileLoading(false);
    } else {
      setSelectedPetiton(null);
    }
  };

  const validate = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('validatePetiton' as string);
    const validated = await Axios.post(
      `petitions/validate`,
      {
        id,
        validate: event.target.checked,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).catch();
    if (validated) toast.success('Pétition modifié');
  };

  const columns: GridColDef[] = [
    { field: 'firstname', headerName: 'Prénom', minWidth: 130, flex: 1 },
    { field: 'lastname', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    {
      field: 'address',
      headerName: 'Adresse',
      minWidth: 130,
      flex: 1,
    },
    { field: 'cin', headerName: 'CIN', minWidth: 130, flex: 1 },
    {
      field: 'electoral_number',
      headerName: 'N° electoral',
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'show_file',
      headerName: "Carte d'identité et signature",
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <LoadingButton
            size='small'
            onClick={() => handleFilesDialogOpen(params.row as IPetition)}
            loading={fileLoading && selectedPetiton?.id === params.row.id}
          >
            <VisibilityIcon />
          </LoadingButton>
        );
      },
    },
    {
      field: 'validate',
      headerName: 'Validé',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            defaultChecked={params.row.valid}
            onChange={(e) => validate(e, params.row.id)}
          />
        );
      },
    },
  ];

  const fetchPetitons = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha('fetchPetitions' as string);
      Axios.get('petitions', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          petitionsStore.setPetitions(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.petitions.map((x) => x)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 50, 100]}
        autoHeight
        loading={loading}
        autoPageSize
      />
      <Suspense fallback={<div></div>}>
        <FilesDialog
          open={openFileDialog}
          handleClose={handleFilesDialogClose}
          petition={selectedPetiton}
          files={files}
        />
      </Suspense>
    </div>
  );
};

export default Petitions;
