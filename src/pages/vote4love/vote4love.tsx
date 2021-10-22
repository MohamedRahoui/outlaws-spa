import { Grid, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import ST from './vote4love.module.scss';
import * as Yup from 'yup';
import { MyFieldError, MyFieldLabel, MyTextField } from '../../helpers/form';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from '../../helpers/axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';

const Vote4Love = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const history = useHistory();
  const formValidation = Yup.object({
    name: Yup.string().max(40, 'Votre Nom ne peut pas dépasser 40 caractères'),
    age: Yup.string().max(40, 'Votre age ne peut pas dépasser 40 caractères'),
    gender: Yup.string().max(
      40,
      'Votre genre ne peut pas dépasser 40 caractères'
    ),
    email: Yup.string().email('Veuillez insérer un E-mail valide'),
    love: Yup.string()
      .max(3000, 'Votre réponse ne peut pas dépasser 3000 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    right: Yup.string()
      .max(3000, 'Votre réponse ne peut pas dépasser 3000 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    choice: Yup.string()
      .max(3000, 'Votre réponse ne peut pas dépasser 3000 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    recommendation: Yup.string()
      .max(3000, 'Votre réponse ne peut pas dépasser 3000 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
  });
  return (
    <div className={ST.container}>
      <div className={ST.heading}>Vote 4 Love</div>
      <div className={ST.subHeading}>
        All languages are accepted <br /> <br />
        Toutes les langues sont acceptées <br /> <br />
        جميع اللغات مقبولة <br /> <br />
        ⴰⵍⵍ ⵍⴰⵏⴳⵓⴰⴳⴻⵙ ⴰⵔⴻ ⴰⵛⵛⴻpⵜⴻⴷ
      </div>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: '',
          age: '',
          gender: '',
          email: '',
          love: '',
          right: '',
          choice: '',
          recommendation: '',
        }}
        validationSchema={formValidation}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setSubmitting(true);
          let recaptcha = '';
          if (executeRecaptcha) {
            recaptcha = await executeRecaptcha('Vote4Love' as string);
          }
          Axios.post('/votes', values, {
            headers: {
              'X-RECAPTCHA': recaptcha,
            },
          })
            .then(() => {
              resetForm();
              window.scrollTo(0, 0);
              setSubmitting(false);
              history.push('/');
              toast.success('Merci! Votre vote est envoyé');
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
        {({ isSubmitting, errors, touched }) => (
          <Form className={ST.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField name='name' label='Full Name (optional)' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='age' label='Age (optional)' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='gender' label='Gender (optional)' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='email' label='Email (optional)' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    color:
                      !!errors.love && touched.love
                        ? '#f44336'
                        : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '1.4375em',
                    letterSpacing: '0.00938em',
                    marginBottom: 10,
                  }}
                >
                  What is Love for you?
                </div>
                <MyTextField name='love' multiline rows={5} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    color:
                      !!errors.right && touched.right
                        ? '#f44336'
                        : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '1.4375em',
                    letterSpacing: '0.00938em',
                    marginBottom: 10,
                  }}
                >
                  What is a right to you?
                  <br />
                  and can Love be considered as a right?
                </div>
                <MyTextField multiline rows={4} name='right' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    color:
                      !!errors.choice && touched.choice
                        ? '#f44336'
                        : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '1.4375em',
                    letterSpacing: '0.00938em',
                    marginBottom: 10,
                  }}
                >
                  In the Moroccan context where the law condemns love,
                  <br />
                  which one would you choose, love or law?
                </div>
                <MyTextField multiline rows={4} name='choice' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    color:
                      !!errors.recommendation && touched.recommendation
                        ? '#f44336'
                        : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: 400,
                    fontSize: '1rem',
                    lineHeight: '1.4375em',
                    letterSpacing: '0.00938em',
                    marginBottom: 10,
                  }}
                >
                  What are your recommendations for repealing Art.490 of the
                  Moroccan penal code? <br />
                  (and/ or Art.489/454/491)
                  <br />
                </div>
                <MyTextField multiline rows={4} name='recommendation' />
              </Grid>
            </Grid>
            <LoadingButton
              variant='contained'
              type='submit'
              className={ST.submit}
              loading={isSubmitting}
            >
              SUBMIT TO VOTE
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Vote4Love;
