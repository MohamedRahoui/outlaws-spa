import './footer.scss';
import FacebookIcon from '../../../assets/img/Facebook.svg';
import IstagramIcon from '../../../assets/img/Instagram.svg';
import TwitterIcon from '../../../assets/img/Twitter.svg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Outlaws from '../../../assets/img/outlaw.png';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='divider'></div>
      <div className='content'>
        <div className='madeBy'>
          Made with <FavoriteIcon className='heartIcon' color='primary' /> by
          <b className='rhaszare'> Rhaszare</b>
        </div>
        <div className='collectif'>
          <div>Collectif 490 (HORS LA LOI)</div>
          <div className='socials'>
            <img src={IstagramIcon} alt='Moroccan Outlaws Instagram' />
            <img src={FacebookIcon} alt='Moroccan Outlaws Facebook' />
            <img src={TwitterIcon} alt='Moroccan Outlaws Twitter' />
          </div>
        </div>
        <div className='stop490'>
          <img src={Outlaws} alt='Moroccan Outlwas' width='30' />
          <b>#STOP490</b>
        </div>
      </div>
    </div>
  );
};
export default Footer;
