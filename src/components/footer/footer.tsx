import './footer.scss';
import FacebookIcon from '../../../assets/img/Facebook.svg';
import IstagramIcon from '../../../assets/img/Instagram.svg';
import TwitterIcon from '../../../assets/img/Twitter.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Outlaws from '../../../assets/img/outlaw.png';
import { Button } from '@mui/material';
import Transfer from '../transfer/transfer';
import { Suspense, useState } from 'react';
const Footer = () => {
  const [openDonate, setOpenDonate] = useState(false);
  const openUrl = (link: string) => {
    window.open(link);
  };
  const donate = () => {
    setOpenDonate(true);
  };
  return (
    <div className='footer'>
      <div className='divider'></div>
      <div
        className='madeByMobile'
        onClick={() => openUrl('https://www.codentype.com')}
      >
        Made with{' '}
        <FavoriteIcon className='heartIcon' color='primary' aria-label='Love' />{' '}
        by
        <b className='codentype'> CodenType</b>
      </div>
      <div className='content'>
        <div
          className='madeBy'
          onClick={() => openUrl('https://www.codentype.com')}
        >
          Made with{' '}
          <FavoriteIcon
            className='heartIcon'
            color='primary'
            aria-label='Love'
          />{' '}
          by
          <b className='codentype'> CodenType</b>
        </div>
        <div className='collectif'>
          <Button
            variant='contained'
            className='donate'
            size='small'
            onClick={() => donate()}
          >
            Faire un don
          </Button>
          <div>Collectif 490 (HORS LA LOI)</div>
          <div className='socials'>
            <img
              src={IstagramIcon}
              alt='Moroccan Outlaws Instagram'
              onClick={() =>
                openUrl('https://www.instagram.com/moroccan.outlaws.490/')
              }
            />
            <img
              src={FacebookIcon}
              alt='Moroccan Outlaws Facebook'
              onClick={() =>
                openUrl('https://www.facebook.com/Moroccanoutlaws/')
              }
            />
            <img
              src={TwitterIcon}
              alt='Moroccan Outlaws Twitter'
              onClick={() => openUrl('https://twitter.com/moroccanoutlaws')}
            />
          </div>
        </div>
        <div className='stop490'>
          <img src={Outlaws} alt='Moroccan Outlwas' width='30' />
          <b>#STOP490</b>
        </div>
      </div>
      <Suspense fallback={<span></span>}>
        <Transfer handleClose={setOpenDonate} open={openDonate} />
      </Suspense>
    </div>
  );
};
export default Footer;
