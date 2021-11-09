import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form } from 'formik';
import ST from './contactUs.module.scss';
import * as Yup from 'yup';
import { MyTextField } from '../../helpers/form';
import { useHistory } from 'react-router-dom';
import Axios from '../../helpers/axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { appName, baseDescription, baseKeywords } from '../../helpers/tags';

const ContactUs = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const history = useHistory();
  const formValidation = Yup.object({
    name: Yup.string()
      .max(40, 'Votre Nom ne peut pas dépasser 40 caractères')
      .min(3, 'Votre Nom doit contenir au moins 3 caractères')
      .required('Votre Nom est requis'),
    email: Yup.string()
      .email('Veuillez insérer un E-mail valide')
      .required('Votre E-mail est requis'),
    phone: Yup.string()
      .required('Votre N° de Téléphone est requis')
      .max(20, 'Votre N° de Téléphone ne peut pas dépasser 20 caractères')
      .min(6, 'Votre Nom doit contenir au moins 6 caractères'),
    message: Yup.string()
      .max(1000, 'Votre message ne peut pas dépasser 500 caractères')
      .min(5, 'Votre message doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    reason: Yup.string()
      .required('Votre choix est requis')
      .oneOf(
        ['Presse', 'R.Académique', 'Autres', 'Bug'],
        'Votre choix est requis'
      ),
  });
  return (
    <div className={ST.container}>
      <Helmet>
        <title>Nous contacter - {appName}</title>
        <meta name='keywords' content={'Nous contacter, ' + baseKeywords} />
        <meta
          name='description'
          content={'Nous contacter , ' + baseDescription}
        />
      </Helmet>
      <div className={ST.heading}>Nous contacter</div>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          message: '',
          reason: '',
        }}
        validationSchema={formValidation}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setSubmitting(true);
          let recaptcha = '';
          if (executeRecaptcha) {
            recaptcha = await executeRecaptcha('Message' as string);
          }
          Axios.post('/messages', values, {
            headers: {
              'X-RECAPTCHA': recaptcha,
            },
          })
            .then(() => {
              resetForm();
              setSubmitting(false);
              history.push('/');
              toast.success('Merci! Votre message est envoyé');
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
        {({ isSubmitting, errors, handleChange, touched, values }) => (
          <Form className={ST.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField name='name' label='Nom complet' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='email' label='Email' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='phone' label='Numéro de téléphone' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.reason}>
                  <InputLabel id='reason-label'>
                    Choisissez une Raison
                  </InputLabel>
                  <Select
                    labelId='reason-label'
                    id='reason'
                    value={values.reason}
                    label='Choisissez une Raison'
                    onChange={handleChange}
                    name='reason'
                  >
                    <MenuItem value='Presse'>Demande presse</MenuItem>
                    <MenuItem value='R.Académique'>
                      Recherche académique
                    </MenuItem>
                    <MenuItem value='Autres'>Autres</MenuItem>
                    <MenuItem value='Bug'>Bug sur le site</MenuItem>
                  </Select>
                  {errors.reason && (
                    <FormHelperText>{errors.reason}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  multiline
                  rows={4}
                  name='message'
                  label='Votre message'
                />
              </Grid>
            </Grid>
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
    </div>
  );
};

export default ContactUs;
