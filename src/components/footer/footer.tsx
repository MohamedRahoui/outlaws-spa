import './footer.scss';
import FacebookIcon from '../../../assets/img/Facebook.svg';
import IstagramIcon from '../../../assets/img/Instagram.svg';
import TwitterIcon from '../../../assets/img/Twitter.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Outlaws from '../../../assets/img/outlaw.png';
const Footer = () => {
  const openUrl = (link: string) => {
    window.open(link);
  };
  return (
    <div className='footer'>
      <div className='divider'></div>
      <div className='content'>
        <div
          className='madeBy'
          onClick={() => openUrl('https://www.instagram.com/rhaszare')}
        >
          Made with <FavoriteIcon className='heartIcon' color='primary' /> by
          <b className='rhaszare'> Rhaszare</b>
        </div>
        <div className='collectif'>
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
      <div
        className='madeByMobile'
        onClick={() => openUrl('https://www.instagram.com/rhaszare')}
      >
        Made with <FavoriteIcon className='heartIcon' color='primary' /> by
        <b className='rhaszare'> Rhaszare</b>
      </div>
    </div>
  );
};
export default Footer;
