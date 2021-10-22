import {
  Fab,
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
import { useSnapshot } from 'valtio';
import { testimoniesStore } from '../../store';
import ST from './testimonies.module.scss';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { MyTextField } from '../../helpers/form';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Axios from '../../helpers/axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Masonry from 'react-masonry-css';
import QUOTATION_START from '../../../assets/img/quotation-start.svg';
import QUOTATION_END from '../../../assets/img/quotation-end.svg';
const Testimonies = () => {
  const snap = useSnapshot(testimoniesStore);
  const mobile = useMediaQuery('(max-width:991px)');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  useEffect(() => {
    fetchTestimonies();
  }, [executeRecaptcha]);
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 2,
    500: 1,
  };
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
  const fetchTestimonies = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      const recaptcha = await executeRecaptcha(
        'fetchTestimoniesPublic' as string
      );
      Axios.get('testimonies/public', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          testimoniesStore.setTestimonies(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };
  return (
    <div className={ST.container}>
      <div className={ST.heading}>Témoignages</div>
      <div className={ST.subHeading}>
        <br />
        <b> Libérer la parole pour changer la loi!</b> <br />
        <br />
        Nous voulons créer un espace sûr pour que vous puissiez vous manifester
        et nous dire, anonymement, ce qui a fait de vous un hors-la-loi.
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={ST.blocks}
        columnClassName={ST.blocksGridColumn}
      >
        {snap.testimonies.map((testimony, i) => (
          <div className={ST.block} key={i}>
            <div className={ST.text}>
              <img src={QUOTATION_START} /> &nbsp; <span>{testimony.text}</span>{' '}
              &nbsp; <img src={QUOTATION_END} />
            </div>
            <div className={ST.info}>
              {testimony.name || 'Anonyme'}
              {testimony.age && ', ' + testimony.age}
              {testimony.city && ', ' + testimony.city}
            </div>
          </div>
        ))}
      </Masonry>
      <Fab
        variant='extended'
        color='primary'
        size='small'
        className={ST.testimonyAction}
        onClick={() => setModal(true)}
      >
        <ShareIcon sx={{ mr: 1 }} />
        Raconte ton histoire
      </Fab>

      {/* MODAL */}
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
              Partagez votre témoignage avec nous et aidez-nous à changer ces
              lois obsolètes.
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
                  recaptcha = await executeRecaptcha(
                    'PublicTestimony' as string
                  );
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
                      'Merci d’avoir partagé ton témoignage ! Ta voix compte.'
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
            <DialogContentText>
              <br />
              Une fois ton témoignage validé par notre équipe, tu pourras le
              voir dans cette page et peut-être même sur nos réseaux sociaux.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModal(false)} color='secondary'>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default Testimonies;
