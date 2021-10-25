import { Grid, IconButton } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import ST from './petition.module.scss';
import * as Yup from 'yup';
import { MyFieldError, MyFieldLabel, MyTextField } from '../../helpers/form';
import SignatureCanvas from 'react-signature-canvas';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  filesSizeCheck,
  filesTypeCheck,
  FileUpload,
} from '../../helpers/fileUpload';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../helpers/axios';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { toast } from 'react-toastify';
import { scrollTop } from '../../helpers/tools';
import { Helmet } from 'react-helmet';
import { appName, baseDescription, baseKeywords } from '../../helpers/tags';
const Petition = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [signCanvas, setSignCanvas] = useState<any>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formValidation = Yup.object({
    firstname: Yup.string()
      .max(40, 'Votre Pénom ne peut pas dépasser 40 caractères')
      .min(3, 'Votre Pénom doit contenir au moins 3 caractères')
      .required('Votre Pénom est requis'),
    lastname: Yup.string()
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
    cin: Yup.string()
      .max(12, 'Votre CIN ne peut pas dépasser 12 caractères')
      .min(6, 'Votre CIN doit contenir au moins 6 caractères')
      .required('Votre CIN est requis'),
    electoral_number: Yup.string()
      .max(
        40,
        "Votre N° d'inscription aux listes électorales ne peut pas dépasser 40 caractères"
      )
      .min(
        1,
        "Votre N° d'inscription aux listes électorales doit contenir au moins 1 caractères"
      )
      .required("Votre N° d'inscription aux listes électorales est requis"),
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
    signature: Yup.mixed().test(
      'signed',
      'Votre Signature manuscrite est requise',
      () => !signCanvas.isEmpty()
    ),
  });
  return (
    <div className={ST.container}>
      <Helmet>
        <title>Signer la pétition - {appName}</title>
        <meta name='keywords' content={'Signer la pétition, ' + baseKeywords} />
        <meta
          name='description'
          content={'Signer la pétition, ' + baseDescription}
        />
      </Helmet>
      <div className={ST.heading}>Pétition </div>
      <div className={ST.petitionText}>
        <p>
          اعتبارا لما نص عليه الدستور المغربي من التزام بالعمل على منظومتي حقوق
          الإنسان والقانون الدولي الإنساني.
          <br />
          وحيث ان المملكة المغربية، تعتبر نفسها عضوا نشيطا في المنظمات الدولية،
          وتتعهد بالتزام ما تقتضيه مواثيقها، من مبادئ وحقوق وواجبات. وتؤكد
          تشبثها بحقوق الإنسان كما هي متعارف عليها عالميا.
          <br />
          وتطبيقا لأحكام الفصل 15 من دستور 2011 وتماشيا مع القانون التنظيمي
          44.14 بتحديد شروط وكيفيات ممارسة المواطنات والمواطنين الحق في تقديم
          .العرائض إلى السلطات العمومية،
          <br />
          فنحن الموقعات والموقعين على هذه العريضة، نطالب بحذف الفصول المجرمة
          للحريات الفردية من القانون الجنائي المغربي.
          <br />
        </p>
      </div>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          address: '',
          cin: '',
          electoral_number: '',
          identity_card: [] as any,
          signature: '',
        }}
        validationSchema={formValidation}
        onSubmit={async (values, { setSubmitting, setErrors, resetForm }) => {
          setSubmitting(true);
          let recaptcha = '';
          if (executeRecaptcha) {
            recaptcha = await executeRecaptcha('SignPetition' as string);
          }
          const formData = new FormData();
          const userIdValidation = Yup.string().uuid().required();
          const userIdIsValid = await userIdValidation.isValid(userId);
          if (userIdIsValid && userId) {
            formData.append('user_id', userId);
          }
          for (const [key, value] of Object.entries(values)) {
            if (key === 'identity_card') {
              const files = value as any[];
              files.forEach((file, i) => {
                formData.append(`${key}_${i + 1}`, file);
              });
            } else if (key === 'signature') {
              const file = new File([value], 'signature.png', {
                type: 'image/png',
              });
              formData.append('signature', file);
            } else {
              formData.append(key, value);
            }
          }
          Axios.post('/petitions', formData, {
            headers: {
              'X-RECAPTCHA': recaptcha,
            },
          })
            .then(() => {
              resetForm();
              signCanvas.clear();
              scrollTop();
              toast.success('Félicitation vous venez de signez la pétition');
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
        {({ isSubmitting, values, setFieldValue, errors, touched }) => (
          <Form className={ST.form}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MyTextField name='firstname' label='Prénom' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='lastname' label='Nom' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField name='email' label='Email' />
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
                <MyTextField name='cin' label='Numéro de CIN' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MyTextField
                  name='electoral_number'
                  label="Numéro d'inscription aux listes électorales"
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
              <Grid item xs={12} sm={6}>
                <MyFieldLabel
                  label='Signature manuscrite'
                  error={!!(errors.signature && touched.signature)}
                />
                <div className={ST.signWrapper}>
                  <SignatureCanvas
                    clearOnResize={true}
                    penColor='black'
                    canvasProps={{
                      className: ST.sigCanvas,
                      onMouseUp: async () => {
                        if (!signCanvas.isEmpty()) {
                          await signCanvas.getCanvas().toBlob((blob: any) => {
                            setFieldValue('signature', blob);
                          });
                        }
                      },
                      onTouchEnd: async () => {
                        if (!signCanvas.isEmpty()) {
                          await signCanvas.getCanvas().toBlob((blob: any) => {
                            setFieldValue('signature', blob);
                          });
                        }
                      },
                    }}
                    ref={(ref: any) => {
                      setSignCanvas(ref);
                    }}
                  />
                  <IconButton
                    className={ST.resetIcon}
                    onClick={() => {
                      signCanvas.clear();
                      setFieldValue('signature', '');
                    }}
                  >
                    <ReplayIcon />
                  </IconButton>
                </div>
                {errors.signature && touched.signature && (
                  <MyFieldError error={errors.signature} />
                )}
              </Grid>
            </Grid>
            <LoadingButton
              variant='contained'
              type='submit'
              className={ST.submit}
              loading={isSubmitting}
            >
              Signer
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Petition;
