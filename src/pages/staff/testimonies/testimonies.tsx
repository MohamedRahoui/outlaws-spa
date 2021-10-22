import { Button, IconButton, Switch } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useSnapshot } from 'valtio';
import Axios from '../../../helpers/axios';
import { ITestimony } from '../../../models/data';
import { testimoniesStaffStore } from '../../../store';
import AnswersDialog from './answersDialog/answersDialog';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { toast } from 'react-toastify';

const Testimonies = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<ITestimony | null>(null);
  const snap = useSnapshot(testimoniesStaffStore);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchTestimonies();
  }, [executeRecaptcha]);

  const handleAnswersClose = () => {
    setDetails(false);
    setSelected(null);
  };

  const openAnswers = (testimony: ITestimony) => {
    setSelected(testimony);
    setDetails(true);
  };
  const validate = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (!executeRecaptcha) return [];
    const recaptcha = await executeRecaptcha('setTestimonyValid' as string);
    const valid = await Axios.post(
      `testimonies/valid`,
      {
        id,
        valid: event.target.checked,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).catch();
    if (valid) toast.success('Le statut du témoignage est modifié');
  };
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', minWidth: 130, flex: 1 },
    { field: 'age', headerName: 'Age', minWidth: 130, flex: 1 },
    { field: 'city', headerName: 'Ville', minWidth: 130, flex: 1 },
    {
      field: 'valid',
      headerName: 'Publié',
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
    {
      field: 'show_details',
      headerName: 'Témoignage',
      width: 130,
      flex: 1,
      align: 'center',
      renderCell: (params) => {
        return (
          <IconButton
            size='small'
            onClick={() => openAnswers(params.row as ITestimony)}
            color='primary'
          >
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  const fetchTestimonies = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha(
        'fetchTestimoniesStaff' as string
      );
      Axios.get('testimonies', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          testimoniesStaffStore.setTestimonies(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={snap.testimonies.map((x) => x)}
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
        testimony={selected}
      />
    </div>
  );
};

export default Testimonies;
