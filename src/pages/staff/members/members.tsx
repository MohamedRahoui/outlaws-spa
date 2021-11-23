import { Button, Switch } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  DataGrid,
  GridColDef,
  GridRowData,
  GridRowModel,
} from '@mui/x-data-grid';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { IMember } from '../../../models/data';
import { membersStore } from '../../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import moment from 'moment';
const Members = () => {
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [selectedPetiton, setSelectedPetiton] = useState<IMember | null>(null);
  const [files, setFiles] = useState<string[]>([]);
  const snap = useSnapshot(membersStore);
  const { executeRecaptcha } = useGoogleReCaptcha();
  useEffect(() => {
    fetchPetitons();
  }, [executeRecaptcha]);

  const FilesDialog = lazy(() => import('./filesDialog/filesDialog'));
  const getFiles = async (id: IMember['id']): Promise<[]> => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('fetchMemberFiles' as string);
    try {
      const resp = await Axios.get(`members/files/${id}`, {
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

  const handleFilesDialogOpen = async (petiton: IMember) => {
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
    const recaptcha = await executeRecaptcha('validateMember' as string);
    const validated = await Axios.post(
      `members/validate`,
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
    if (validated) toast.success('Adhérent modifié');
  };

  const activateSubscription = async (memberRow: GridRowModel) => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('activateSubscription' as string);
    const subscriptionDate = await Axios.post(
      `members/activateSubscription`,
      {
        id: memberRow?.id,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).catch();
    if (!subscriptionDate?.data) {
      toast.success('Something went wrong !');
      return;
    }
    membersStore.activateSubscription(
      memberRow?.id,
      subscriptionDate?.data || null
    );
    toast.success('Abonnement activé');
  };

  const cancelSubscription = async (memberRow: GridRowModel) => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('cancelSubscription' as string);
    const cancelSubscription = await Axios.post(
      `members/cancelSubscription`,
      {
        id: memberRow?.id,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).catch();
    if (cancelSubscription) {
      membersStore.cancelSubscription(memberRow?.id);
      toast.success('Abonnement annulé');
    }
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    { field: 'phone', headerName: 'N° de Tel', minWidth: 130, flex: 1 },
    { field: 'social', headerName: 'Social', minWidth: 130, flex: 1 },
    { field: 'subscription', headerName: 'Abonnement', minWidth: 130, flex: 1 },
    {
      field: 'address',
      headerName: 'Adresse',
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'show_file',
      headerName: "Carte d'identité et Photo",
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <LoadingButton
            size='small'
            onClick={() => handleFilesDialogOpen(params.row as IMember)}
            loading={fileLoading && selectedPetiton?.id === params.row.id}
          >
            <VisibilityIcon />
          </LoadingButton>
        );
      },
    },
    {
      field: 'subscription',
      headerName: 'Adhesion',
      minWidth: 300,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        if (params.row.subscription) {
          return (
            <div>
              <span style={{ marginRight: 10 }}>
                Depuis <b>{moment(params.row.subscription).format('LL')}</b>
              </span>
              <Button
                size='small'
                variant='contained'
                onClick={() => cancelSubscription(params.row)}
              >
                Annuler
              </Button>
            </div>
          );
        } else {
          return (
            <Button
              variant='contained'
              onClick={() => activateSubscription(params.row)}
            >
              Activer un an
            </Button>
          );
        }
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
      const recaptcha = await executeRecaptcha('fetchMembers' as string);
      Axios.get('members', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          membersStore.setMembers(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* <LoadingButton
        size='small'
        variant='contained'
        style={{ marginBottom: 15 }}
        loading={downloadLoading}
        // onClick={download}
      >
        Scanner un QR Code
      </LoadingButton> */}
      <DataGrid
        rows={snap.members.map((x) => x)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 50, 100]}
        autoHeight
        loading={loading}
        autoPageSize
      />
      <div style={{ display: 'none' }}>{snap.members[0]?.subscription}</div>
      <Suspense fallback={<div></div>}>
        <FilesDialog
          open={openFileDialog}
          handleClose={handleFilesDialogClose}
          member={selectedPetiton}
          files={files}
        />
      </Suspense>
    </div>
  );
};

export default Members;
