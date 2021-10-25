import { Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form } from 'formik';
import ST from './trainee.module.scss';
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
import { Helmet } from 'react-helmet';
import { appName, baseDescription, baseKeywords } from '../../../helpers/tags';

const Trainee = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const history = useHistory();
  const formValidation = Yup.object({
    name: Yup.string()
      .max(40, 'Votre Nom ne peut pas dépasser 40 caractères')
      .min(3, 'Votre Nom doit contenir au moins 3 caractères')
      .required('Votre Nom est requis'),
    social: Yup.string().max(
      40,
      'Votre Compter ne peut pas dépasser 40 caractères'
    ),
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
    degree: Yup.string()
      .max(150, 'Votre réponse ne peut pas dépasser 150 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    speciality: Yup.string()
      .max(300, 'Votre réponse ne peut pas dépasser 300 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    availability: Yup.string()
      .max(100, 'Votre réponse ne peut pas dépasser 100 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    letter: Yup.string()
      .max(3000, 'Votre réponse ne peut pas dépasser 3000 caractères')
      .min(5, 'Votre réponse doit contenir au moins 5 caractères')
      .required('Votre réponse est requise'),
    cv: Yup.array()
      .min(1, 'Votre CV est requis')
      .required('Votre CV est requis')
      .test(
        'file-size',
        'La taille du fichier ne doit pas depasser 5MB',
        (value: any) => filesSizeCheck(value, 5)
      )
      .test('file-type', 'Le fichier doit être de type PDF', (value: any) =>
        filesTypeCheck(value, ['application/pdf'])
      ),
  });
  return (
    <div className={ST.container}>
      <Helmet>
        <title>Demande de stage - {appName}</title>
        <meta name='keywords' content={'Demande de stage, ' + baseKeywords} />
        <meta
          name='description'
          content={'Demande de stage , ' + baseDescription}
        />
      </Helmet>
      <div className={ST.heading}>Effectuer un stage</div>
      <Formik
        validateOnChange={true}
        initialValues={{
          name: '',
          email: '',
          phone: '',
          birth: '',
          address: '',
          degree: '',
          speciality: '',
          availability: '',
          letter: '',
          social: '',
          cv: [],
        }}
        validationSchema={formValidation}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          console.log(values);

          setSubmitting(true);
          let recaptcha = '';
          if (executeRecaptcha) {
            recaptcha = await executeRecaptcha('CreateTrainee');
          }
          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            if (key === 'cv' && value) {
              const files = value as any[];
              files.forEach((file) => {
                formData.append(key, file);
              });
            } else if (key && value) {
              formData.append(key, value as string);
            }
          }
          Axios.post('/trainees', formData, {
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
        {({ isSubmitting, values, setFieldValue, errors }) => (
          <Form className={ST.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField name='name' label='Nom complet' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='email' label='Email' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='phone' label='N° de téléphone' />
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
                <MyTextField name='degree' label="Niveau d'étude" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='speciality' label='Spécialité' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name='availability'
                  label='Date de disponibilité'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name='letter'
                  label='Pourquoi souhaitez-vous rejoindre le Collectif 490 ?'
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
                  fieldName='cv'
                  setFieldValue={setFieldValue}
                  label='Curriculum Vitae (CV)'
                  innerLabel='Cliquez ici pour Télecharger votre CV'
                  maxFiles={1}
                  typesMessage='PDF'
                  maxSize='5MB'
                  types={['application/pdf']}
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

export default Trainee;
