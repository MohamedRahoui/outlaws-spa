import { Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form } from 'formik';
import ST from './member.module.scss';
import * as Yup from 'yup';
import { MyTextField } from '../../../helpers/form';
import {
  filesSizeCheck,
  filesTypeCheck,
  FileUpload,
} from '../../../helpers/fileUpload';
import { useHistory } from 'react-router-dom';
import Axios from '../../../helpers/axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { appName, baseDescription, baseKeywords } from '../../../helpers/tags';
import { Suspense, useState } from 'react';
import Transfer from '../../../components/transfer/transfer';
const Member = () => {
  const history = useHistory();
  const [openTransfer, setOpenTransfer] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
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
    identity_card: Yup.array()
      .min(2, 'Votre carte didentité est requise (Recto et Verso)')
      .required('Votre carte didentité est requise (Recto et Verso)')
      .test(
        'file-size',
        'La taille des images ne doit pas depasser 20MB',
        (value: any) => filesSizeCheck(value, 20)
      )
      .test(
        'file-type',
        'Les images doivent être de type PNG ou JPG',
        (value: any) => filesTypeCheck(value, ['image/png', 'image/jpeg'])
      ),
    picture: Yup.array()
      .length(1, 'Votre photo est requise')
      .required('Votre photo est requise')
      .test(
        'file-size',
        'La taille des images ne doit pas depasser 20MB',
        (value: any) => filesSizeCheck(value, 20)
      )
      .test(
        'file-type',
        'Les images doivent être de type PNG ou JPG',
        (value: any) => filesTypeCheck(value, ['image/png', 'image/jpeg'])
      ),
    social: Yup.string().max(
      40,
      'Votre Compte ne peut pas dépasser 40 caractères'
    ),
  });
  return (
    <div className={ST.container}>
      <Helmet>
        <title>Devenir adhérent - {appName}</title>
        <meta
          name='keywords'
          content={'Devenir adhérent, subscription, member ' + baseKeywords}
        />
        <meta
          name='description'
          content={'Devenir adhérent, ' + baseDescription}
        />
      </Helmet>
      <div className={ST.heading}>Devenir adhérent</div>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          birth: '',
          address: '',
          social: '',
          identity_card: [] as any,
          picture: [] as any,
        }}
        validationSchema={formValidation}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setSubmitting(true);
          let recaptcha = '';
          if (executeRecaptcha) {
            recaptcha = await executeRecaptcha('BecomeMember' as string);
          }
          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            if (key === 'identity_card') {
              const files = value as any[];
              files.forEach((file, i) => {
                formData.append(`${key}_${i + 1}`, file);
              });
            } else if (key === 'picture') {
              const files = value as any[];
              if (files?.length !== 1) return;
              formData.append('picture', files[0]);
            } else {
              formData.append(key, value);
            }
          }
          Axios.post('/members', formData, {
            headers: {
              'X-RECAPTCHA': recaptcha,
            },
          })
            .then(() => {
              resetForm();
              setOpenTransfer(true);
              // history.push('/profile');
              toast.success('Votre demande est envoyé');
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
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className={ST.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField name='name' label='Prénom' />
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
                  name='social'
                  label='Compte social media (Optionnel)'
                  placeholder='Exemple: Facebook - Bruce Wayne'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  values={values}
                  fieldName='picture'
                  setFieldValue={setFieldValue}
                  label='Photo récente'
                  innerLabel='Cliquez ici pour Télecharger votre photo'
                  maxFiles={1}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FileUpload
                  values={values}
                  fieldName='identity_card'
                  setFieldValue={setFieldValue}
                  label="Copie de la carte d'identité nationale"
                  innerLabel='Cliquez ici pour Télecharger le Recto et le Verso'
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
      <Suspense fallback={<span></span>}>
        <Transfer
          handleClose={setOpenTransfer}
          open={openTransfer}
          mode='payement'
        />
      </Suspense>
    </div>
  );
};

export default Member;
