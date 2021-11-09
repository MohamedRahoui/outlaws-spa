import { Box } from '@mui/material';
import ST from './login.module.scss';
import Divider from '../../../assets/img/underlining.svg';
import FacebookLogin from '../../../assets/img/facebook-login.svg';
import GoogleLg from '../../../assets/img/google-login.svg';
import ILoginData from '../../models/login';
import { store } from '../../store';
import GoogleLogin from 'react-google-login';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useHistory } from 'react-router-dom';
import Axios from '../../helpers/axios';
import { toast } from 'react-toastify';
import { appName, baseDescription, baseKeywords } from '../../helpers/tags';
import { Helmet } from 'react-helmet-async';
const Login = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const history = useHistory();
  const responseGoogle = async (response: any) => {
    let recaptcha = '';
    if (executeRecaptcha) {
      recaptcha = await executeRecaptcha('googleAuth' as string);
    }
    Axios.post(
      `/auth/google`,
      {
        googleToken: response.tokenId,
      },
      {
        headers: {
          'X-RECAPTCHA': recaptcha,
        },
      }
    ).then((res) => {
      const loginData: ILoginData = res.data;
      store.login(loginData);
      toast.success(
        `Bienvenue ${
          loginData.user.firstName ||
          loginData.user.lastName ||
          loginData.user.email ||
          ''
        } !`
      );
      history.push('/');
    });
  };
  const GoogleAuthFailed = () => {
    toast.error('La connexion Google à échoué !');
  };
  return (
    <div className={ST.container}>
      <Helmet>
        <title>Se connecter - {appName}</title>
        <meta name='keywords' content={'Se connecter, ' + baseKeywords} />
        <meta
          name='description'
          content={'Se connecter , ' + baseDescription}
        />
      </Helmet>
      <div className={ST.leftSide}></div>
      <div className={ST.rigthSide}>
        <div className={ST.rightContent}>
          <div className={ST.heading}>
            Bienvenue, <span className={ST.redText}>hors la loi</span>
          </div>
          <p>
            Créez votre compte, aidez nous à atteindre le maximum de petitions
            signées et debloquez plein de cadeaux
          </p>
          <img src={Divider} className={ST.loginDivider} />
          <p>
            Pour vous connecter ou vous inscrire, continuez avec Google ou
            Facebook.
            <br />
            <small>Connexion et Inscription sans formulaire à remplir.</small>
          </p>
          <div className={ST.buttons}>
            <GoogleLogin
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              buttonText='Google'
              onSuccess={responseGoogle}
              onFailure={GoogleAuthFailed}
              cookiePolicy='single_host_origin'
              render={(renderProps) => (
                <Box
                  sx={{ boxShadow: 4 }}
                  onClick={renderProps.onClick}
                  className={ST.loginBtn}
                >
                  <img src={GoogleLg} />
                </Box>
              )}
            />
            <Box sx={{ boxShadow: 4 }} className={ST.loginBtn}>
              <img src={FacebookLogin} />
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
