import {
  AppBar,
  createTheme,
  Dialog,
  Grid,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ST from './order.module.scss';
import { getFullNameEmail } from '../../../helpers/user';
import { IReward } from '../../../models/data';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Axios from '../../../helpers/axios';
import { toast } from 'react-toastify';
import { MyTextField } from '../../../helpers/form';
import { LoadingButton } from '@mui/lab';
import { rewardsLabels } from '../../../helpers/labels';
const OrderModal = ({
  handleClose,
  setReward,
  open,
  reward,
}: {
  open: boolean;
  handleClose: any;
  setReward: any;
  reward: IReward | null;
}) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const mobile = useMediaQuery('(max-width:991px)');
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#f31800',
      },
      secondary: {
        main: '#151516',
      },
    },
    typography: {
      fontFamily: 'Rubik, sans-serif',
    },
  });
  const formValidation = Yup.object({
    phone: Yup.string()
      .required('Votre N° de Téléphone est requis')
      .max(20, 'Votre N° de Téléphone ne peut pas dépasser 20 caractères')
      .min(6, 'Votre Nom doit contenir au moins 6 caractères'),
    name: Yup.string()
      .max(40, 'Votre Nom ne peut pas dépasser 40 caractères')
      .min(3, 'Votre Nom doit contenir au moins 3 caractères')
      .required('Votre Nom est requis'),
    address: Yup.string()
      .max(150, 'Votre Adresse ne peut pas dépasser 150 caractères')
      .min(5, 'Votre Adresse doit contenir au moins 5 caractères')
      .required('Votre Adresse est requis'),
    email: Yup.string()
      .email('Veuillez insérer un E-mail valide')
      .required('Votre E-mail est requis'),
  });
  return (
    <Dialog onClose={handleClose} open={open} fullScreen={mobile}>
      <AppBar sx={{ position: 'relative' }} color='transparent'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => handleClose(false)}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Commander
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={ST.orderWrapper}>
        <div className={ST.orderForm}>
          <div className={ST.orderTitle}>
            {rewardsLabels[reward?.code || 'SUBSCRIPTION']}
          </div>
          <ThemeProvider theme={lightTheme}>
            <Formik
              validateOnChange={true}
              initialValues={{
                name: '',
                email: '',
                address: '',
                phone: '',
              }}
              validationSchema={formValidation}
              onSubmit={async (
                values,
                { setSubmitting, setErrors, resetForm }
              ) => {
                setSubmitting(true);
                let recaptcha = '';
                if (executeRecaptcha) {
                  recaptcha = await executeRecaptcha('OrderReward' as string);
                }
                Axios.post(
                  '/orders',
                  {
                    ...values,
                    rewardId: reward?.id,
                  },
                  {
                    headers: {
                      'X-RECAPTCHA': recaptcha,
                    },
                  }
                )
                  .then(() => {
                    resetForm();
                    handleClose(false);
                    setReward(null);
                    toast.success('Félicitation vous venez de commander!');
                    setSubmitting(false);
                  })
                  .catch((errors) => {
                    const res = errors.response;
                    if (res.status === 422 && res.data) {
                      setErrors(res.data);
                    }
                    setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form className={ST.form}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <MyTextField name='name' label='Nom complet' />
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField name='email' label='Email' />
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField name='phone' label='N° de Téléphone' />
                    </Grid>
                    <Grid item xs={12}>
                      <MyTextField
                        name='address'
                        label='Adresse'
                        multiline
                        rows={4}
                      />
                    </Grid>
                  </Grid>
                  <br />
                  <LoadingButton
                    variant='contained'
                    type='submit'
                    className={ST.submit}
                    loading={isSubmitting}
                  >
                    Commander
                  </LoadingButton>
                </Form>
              )}
            </Formik>
          </ThemeProvider>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderModal;
