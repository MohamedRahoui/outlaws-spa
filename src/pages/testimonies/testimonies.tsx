import { Fab } from '@mui/material';
import { useSnapshot } from 'valtio';
import { testimoniesStore } from '../../store';
import ST from './testimonies.module.scss';
import ShareIcon from '@mui/icons-material/Share';
import { Suspense, useEffect, useState, lazy } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Axios from '../../helpers/axios';
import Masonry from 'react-masonry-css';
import QUOTATION_START from '../../../assets/img/quotation-start.svg';
import QUOTATION_END from '../../../assets/img/quotation-end.svg';
import LinearProgress from '@mui/material/LinearProgress';
import useInfiniteScroll from 'react-infinite-scroll-hook';
const TestimonyModal = lazy(() => import('./testimonyModal/testimonyModal'));
const Testimonies = () => {
  const snap = useSnapshot(testimoniesStore);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  useEffect(() => {
    fetchTestimonies();
  }, [executeRecaptcha]);

  const loadMore = async () => {
    if (!executeRecaptcha) return;
    setLoading(true);
    setError(false);
    const recaptcha = await executeRecaptcha(
      'fetchTestimoniesPublic' as string
    );
    const cursor = snap.testimonies[snap.testimonies.length - 1];
    Axios.get(`testimonies/public?cursor=${cursor.id}`, {
      headers: {
        'X-RECAPTCHA': recaptcha,
      },
    })
      .then((res) => {
        testimoniesStore.setTestimonies(
          [...snap.testimonies, ...res.data] || []
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: snap.testimonies?.length < snap.count,
    onLoadMore: loadMore,
    disabled: error,
  });
  const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 2,
    500: 1,
  };
  const fetchTestimonies = async () => {
    if (!executeRecaptcha) return;
    if (!snap.fetched) {
      setLoading(true);
      setError(false);
      const recaptcha = await executeRecaptcha(
        'fetchTestimoniesPublic' as string
      );
      Axios.get('testimonies/public', {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      })
        .then((res) => {
          testimoniesStore.setTestimonies(res.data.testimonies || []);
          testimoniesStore.setCount(res.data.count || 0);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
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
      {(loading || snap.testimonies?.length < snap.count) && (
        <div
          ref={sentryRef}
          style={{
            marginTop: 20,
          }}
        >
          <LinearProgress />
        </div>
      )}
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
      {modal && (
        <Suspense fallback={<LinearProgress />}>
          <TestimonyModal setModal={setModal} ST={ST} modal={modal} />
        </Suspense>
      )}
    </div>
  );
};

export default Testimonies;
