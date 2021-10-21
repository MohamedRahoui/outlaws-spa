import { Button, IconButton, Switch } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { IMessage } from '../../../models/data';
import { messagesStore } from '../../../store';
import AnswersDialog from './answersDialog/answersDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';

const Messages = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<IMessage | null>(null);
  const snap = useSnapshot(messagesStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchMessages();
  }, [executeRecaptcha]);

  const handleAnswersClose = () => {
    setDetails(false);
    setSelected(null);
  };

  const openAnswers = (message: IMessage) => {
    setSelected(message);
    setDetails(true);
  };
  const validate = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('setMessageTreated' as string);
    const treated = await Axios.post(
      `messages/treated`,
      {
        id,
        treated: event.target.checked,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).catch();
    if (treated) toast.success('Le statut du message est modifié');
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    { field: 'phone', headerName: 'Téléphone', minWidth: 130, flex: 1 },
    { field: 'reason', headerName: 'Raison', minWidth: 130, flex: 1 },
    {
      field: 'treated',
      headerName: 'Traité',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            defaultChecked={params.row.treated}
            onChange={(e) => validate(e, params.row.id)}
          />
        );
      },
    },
    {
      field: 'show_details',
      headerName: 'Message',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton
            size='small'
            onClick={() => openAnswers(params.row as IMessage)}
            color='primary'
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  const fetchMessages = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha('fetchMessages' as string);
      Axios.get('messages', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          messagesStore.setMessages(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.messages.map((x) => x)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 50, 100]}
        autoHeight
        loading={loading}
        autoPageSize
      />
      <AnswersDialog
        open={details}
        handleClose={handleAnswersClose}
        message={selected}
      />
    </div>
  );
};

export default Messages;
