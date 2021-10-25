import { createTheme } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextField } from '../../../helpers/form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  useMediaQuery,
  ThemeProvider,
  DialogActions,
  Button,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Axios from '../../../helpers/axios';
const TestimonyModal = ({
  setModal,
  modal,
  ST,
}: {
  setModal: any;
  modal: boolean;
  ST: any;
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
      fontFamily: 'Lato, sans-serif',
    },
  });
  const formValidation = Yup.object({
    name: Yup.string().max(40, 'Votre Nom ne peut pas dépasser 40 caractères'),
    age: Yup.string().max(10, 'Votre age ne peut pas dépasser 10 caractères'),
    city: Yup.string().max(
      40,
      'Votre Ville ne peut pas dépasser 40 caractères'
    ),
    text: Yup.string()
      .max(1000, 'Votre témoignage ne peut pas dépasser 1000 caractères')
      .min(5, 'Votre témoignage doit contenir au moins 5 caractères')
      .required('Votre témoignage est requis'),
  });
  return (
    <ThemeProvider theme={lightTheme}>
      <Dialog fullScreen={mobile} open={modal}>
        <DialogTitle>Raconte ton histoire</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Au Maroc,
            <b> l'amour est toujours un crime . </b>
            Les personnes hétérosexuelles et homosexuelles font face à des
            accusations criminelles ,
            <b>
              {' '}
              les femmes n'ont pas le droit de contrôler leur propre corps.
            </b>
            <br />
            <b>Il est temps que cela cesse ! </b> <br />
            Chez <b className={ST.primaryText}> Moroccan Outlaws </b> , nous
            pensons que vous avez une voix et que vous devez être entendu.
            Partagez votre témoignage avec nous et aidez-nous à changer ces lois
            obsolètes.
            <b>
              <br /> Toutes et tous hors-la-loi, jusqu’à ce que la loi change.
            </b>
          </DialogContentText>
          <Formik
            validateOnChange={true}
            initialValues={{
              name: '',
              age: '',
              city: '',
              text: '',
            }}
            validationSchema={formValidation}
            onSubmit={async (
              values,
              { setSubmitting, setErrors, resetForm }
            ) => {
              setSubmitting(true);
              let recaptcha = '';
              if (executeRecaptcha) {
                recaptcha = await executeRecaptcha('PublicTestimony' as string);
              }
              Axios.post('/testimonies', values, {
                headers: {
                  'X-RECAPTCHA': recaptcha,
                },
              })
                .then(() => {
                  resetForm();
                  setSubmitting(false);
                  setModal(false);
                  toast.success(
                    'Merci d’avoir partagé votre témoignage ! Votre voix compte.'
                  );
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
                    <MyTextField name='name' label='Nom (Optionel)' />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField name='age' label='Age (Optionel)' />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField name='city' label='Ville (Optionel)' />
                  </Grid>
                  <Grid item xs={12}>
                    <MyTextField
                      multiline
                      rows={4}
                      name='text'
                      label='Votre témoignage'
                    />
                  </Grid>
                </Grid>
                <br />
                <DialogContentText>
                  Une votre ton témoignage validé par notre équipe, vous pourrez
                  le voir dans cette page et peut-être même sur nos réseaux
                  sociaux.
                </DialogContentText>
                <br />
                <LoadingButton
                  variant='contained'
                  type='submit'
                  className={ST.submit}
                  loading={isSubmitting}
                >
                  Envoyer
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModal(false)} color='secondary'>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default TestimonyModal;
