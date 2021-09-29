import { Button, ButtonGroup } from '@mui/material';
import ST from './home.module.scss';
import Fist from '../../../assets/img/fist.png';

const Home = () => {
  return (
    <div className={ST.container}>
      <div className={ST.mainText}>
        <h1>L'AMOUR N'EST PAS UN CRIME.</h1>
        <br />
        <p>
          Vous avez été des milliers à signer notre manifeste des « Hors la loi
          » et nous vous en remercions.
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
          <Button>Signer la pétition</Button>
          <Button>Vote4Love</Button>
        </ButtonGroup>
      </div>

      <img src={Fist} className={ST.fist} />
    </div>
  );
};
export default Home;
