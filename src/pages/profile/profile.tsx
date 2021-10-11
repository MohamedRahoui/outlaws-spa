import ST from './profile.module.scss';
import { useHistory } from 'react-router-dom';
import { store } from '../../store';
import { useSnapshot } from 'valtio';
import { getFullNameEmail } from '../../helpers/user';
import { Alert, Avatar, Button } from '@mui/material';
import { useState } from 'react';
import CopyTextToClipboard from '../../helpers/tools';
import { Check } from '@mui/icons-material';

const Profile = () => {
  const history = useHistory();
  const snap = useSnapshot(store);
  const [copied, setCopied] = useState(false);
  const copy = () => {
    CopyTextToClipboard(
      `${import.meta.env.VITE_BASE_URL}/petition/${snap.user?.id}`
    )
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logout = () => {
    store.logout();
    history.push('/');
  };
  return (
    <div className={ST.container}>
      <div className={ST.heading}>Profil</div>
      <div className={ST.userCard}>
        <Avatar
          className={ST.avatar}
          alt={getFullNameEmail(snap.user)}
          src={snap.user?.image}
        />
        <div className={ST.info}>
          <div className={ST.name}>{getFullNameEmail(snap.user)}</div>
          {snap.user?.email !== getFullNameEmail(snap.user) &&
            snap.user?.email && (
              <div className={ST.email}>{snap.user?.email}</div>
            )}
        </div>
        <div className={ST.divider}></div>
        <div className={ST.scores}>
          <div className={ST.score}>Points disponibles : 5</div>
          <div className={ST.score}>Signatures validées : 30</div>
          <div className={ST.score}>Signatures en cours : 9</div>
        </div>
        <div className={ST.ShareText}>
          Partagez ce lien avec vos amis et gagnez des points pour chaque
          signature validée.
        </div>
        <div className={ST.link}>
          <div className={ST.LinkText}>{`${
            import.meta.env.VITE_BASE_URL
          }/petition/${snap.user?.id}`}</div>
          <Button
            size='small'
            variant='contained'
            color={copied ? 'success' : 'primary'}
            onClick={() => copy()}
            endIcon={copied ? <Check /> : null}
            className={ST.copy}
          >
            {copied ? 'Copié' : 'Copier'}
          </Button>
        </div>
        <Button variant='contained' onClick={() => logout()}>
          Déconnexion
        </Button>
      </div>
    </div>
  );
};
export default Profile;
