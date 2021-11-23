import { Button, IconButton, Switch, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { IMessage, IOrder } from '../../../models/data';
import AnswersDialog from './answersDialog/answersDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';
import { ordersStore } from '../../../store';
import { rewardsLabels } from '../../../helpers/labels';

const Orders = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<IOrder | null>(null);
  const snap = useSnapshot(ordersStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchOrders();
  }, [executeRecaptcha]);

  const handleAnswersClose = () => {
    setDetails(false);
    setSelected(null);
  };

  const openOrder = (order: IOrder) => {
    setSelected(order);
    setDetails(true);
  };

  const validate = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
    status: 'accepted' | 'sent' | 'canceled'
  ) => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('setOrderStatus' as string);
    const statusUpdate = await Axios.post(
      `orders/status`,
      {
        id,
        [status]: event.target.checked,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).catch();
    if (statusUpdate) toast.success('Le statut de la commande est modifié');
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'email', headerName: 'Email', minWidth: 130, flex: 1 },
    { field: 'phone', headerName: 'Téléphone', minWidth: 130, flex: 1 },
    {
      field: 'rewardLabel',
      headerName: 'Produit',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <b>
            {rewardsLabels[params?.row?.order?.reward?.code || 'SUBSCRIPTION']}
          </b>
        );
      },
    },
    {
      field: 'accepted',
      headerName: 'Accepté',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            disabled={params.row.canceled}
            defaultChecked={params.row.accepted}
            onChange={(e) => validate(e, params.row.id, 'accepted')}
          />
        );
      },
    },
    {
      field: 'sent',
      headerName: 'Envoyé',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            disabled={
              params.row.reward?.code === 'SUBSCRIPTION' || params.row.canceled
            }
            defaultChecked={params.row.sent}
            onChange={(e) => validate(e, params.row.id, 'sent')}
          />
        );
      },
    },
    {
      field: 'canceled',
      headerName: 'Annulé',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <Switch
            defaultChecked={params.row.canceled}
            onChange={(e) => validate(e, params.row.id, 'canceled')}
          />
        );
      },
    },
    {
      field: 'show_details',
      headerName: 'Infos',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton
            size='small'
            onClick={() => openOrder(params.row as IOrder)}
            color='primary'
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  const fetchOrders = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha('fetchOrders' as string);
      Axios.get('orders', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          ordersStore.setOrders(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.orders.map((x) => x)}
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
        order={selected}
      />
    </div>
  );
};

export default Orders;
