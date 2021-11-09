import { Grid, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import ST from './volunteer.module.scss';
import * as Yup from 'yup';
import { MyFieldError, MyFieldLabel, MyTextField } from '../../../helpers/form';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from '../../../helpers/axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { appName, baseDescription, baseKeywords } from '../../../helpers/tags';

const Volunteer = () => {
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
    birth: Yup.string()
      .max(12, 'Votre date de naissance est requise')
      .min(10, 'Votre date de naissance est requise')
      .required('Votre date de naissance est requise'),
    address: Yup.string()
      .max(150, 'Votre Adresse ne peut pas dépasser 150 caractères')
      .min(5, 'Votre Adresse doit contenir au moins 5 caractères')
      .required('Votre Adresse est requise'),
    help: Yup.string()
      .max(500, 'Votre réponse ne peut pas dépasser 500 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    expertise: Yup.string()
      .max(500, 'Votre réponse ne peut pas dépasser 500 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    qualifications: Yup.string()
      .max(500, 'Votre réponse ne peut pas dépasser 500 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    social: Yup.string().max(
      40,
      'Votre Compte ne peut pas dépasser 40 caractères'
    ),
  });
  return (
    <div className={ST.container}>
      <Helmet>
        <title>Devenir Bénévole - {appName}</title>
        <meta name='keywords' content={'Devenir Bénévole, ' + baseKeywords} />
        <meta
          name='description'
          content={'Devenir Bénévole , ' + baseDescription}
        />
      </Helmet>
      <div className={ST.heading}>Demande de bénévolat</div>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          birth: '',
          address: '',
          help: '',
          expertise: '',
          qualifications: '',
          social: '',
        }}
        validationSchema={formValidation}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setSubmitting(true);
          let recaptcha = '';
          if (executeRecaptcha) {
            recaptcha = await executeRecaptcha('Volunteer' as string);
          }
          Axios.post('/volunteers', values, {
            headers: {
              'X-RECAPTCHA': recaptcha,
            },
          })
            .then(() => {
              resetForm();
              window.scrollTo(0, 0);
              setSubmitting(false);
              history.push('/');
              toast.success('Merci! Votre demande est envoyé');
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
                <MyTextField name='birth' label='Date de naissance' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name='address'
                  label='Adresse'
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  multiline
                  rows={4}
                  name='help'
                  label='Comment pouvez-vous nous aider ?'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  multiline
                  rows={4}
                  name='expertise'
                  label='Quel est votre domaine d’expertise ?'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  multiline
                  rows={4}
                  name='qualifications'
                  label='Quelles sont vos qualifications ?'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name='social'
                  label='Compte social media (Optionnel)'
                  placeholder='Exemple: Facebook - Bruce Wayne'
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

export default Volunteer;
