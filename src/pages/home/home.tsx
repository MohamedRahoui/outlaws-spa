import { Button, ButtonGroup } from '@mui/material';
import ST from './home.module.scss';
import Fist from '../../../assets/img/fist.png';
import { useHistory } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { appName, baseDescription, baseKeywords } from '../../helpers/tags';
const MobileButtons = lazy(() => import('./mobileActions/mobileActions'));
const Home = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <div className={ST.container}>
        <Helmet>
          <title>L'amour n'est pas un crime - {appName}</title>
          <meta
            name='keywords'
            content={"L'amour n'est pas un crime, " + baseKeywords}
          />
          <meta
            name='description'
            content={"L'amour n'est pas un crime, " + baseDescription}
          />
        </Helmet>
        <div className={ST.mainText}>
          <h1>L'AMOUR N'EST PAS UN CRIME.</h1>
          <br />
          <p>
            Vous avez été des milliers à signer notre manifeste des « Hors la
            loi » et nous vous en remercions.
          </p>
          <br />
          <p>
            Nous avons été extrêmement touchés par votre mobilisation et grâce à
            vous toutes et tous, nous avons pu ouvrir le débat, et libérer une
            parole longtemps enfouie.
          </p>
          <br />
          <br />
          <ButtonGroup variant='contained'>
            <Button onClick={() => history.push('/petition')}>
              Signer la pétition
            </Button>
            <Button onClick={() => history.push('/vote4love')}>
              Vote4Love
            </Button>
          </ButtonGroup>
        </div>

        <img src={Fist} className={ST.fist} />
      </div>
      <div className={ST.mobileContainer}>
        <div className={ST.mainText}>
          <h1>L'AMOUR N'EST PAS UN CRIME.</h1>
          <br />
          <p>
            Vous avez été des milliers à signer notre manifeste des « Hors la
            loi » et nous vous en remercions.
          </p>
        </div>
        <Suspense fallback={<span></span>}>
          <MobileButtons ST={ST} />
        </Suspense>
      </div>
    </React.Fragment>
  );
};
export default Home;
