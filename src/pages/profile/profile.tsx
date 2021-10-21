import ST from './profile.module.scss';
import { useHistory } from 'react-router-dom';
import { store } from '../../store';
import { useSnapshot } from 'valtio';
import { getFullNameEmail } from '../../helpers/user';
import { Alert, Avatar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { CopyTextToClipboard } from '../../helpers/tools';
import { Check } from '@mui/icons-material';
import Axios from '../../helpers/axios';
import badgesImages from '../../helpers/badgesImages';
import { rewardsLabels } from '../../helpers/labels';
const Profile = () => {
  const history = useHistory();
  const snap = useSnapshot(store);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!snap.rewardsFetched) {
      Axios.get('data/rewards').then((res) => {
        store.setRewards(res.data || []);
      });
    }
    if (!snap.pointsFetched) {
      Axios.get('data/points').then((res) => {
        store.setPoints(res.data);
      });
    }
  }, []);
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
          <div className={ST.score}>
            Points disponibles : {snap.points.currentPoints}
          </div>
          <div className={ST.score}>
            Signatures validées : {snap.points.validatedPetitions}
          </div>
          <div className={ST.score}>
            Signatures en cours : {snap.points.petitionsInProgress}
          </div>
        </div>
              
        <div className={ST.rewards}>
          {snap.rewards?.length &&
            snap.rewards.map((reward) => (
              <div className={ST.rewardWrapper}>
                <div className={ST.reward}>
                  <img
                    className={ST.badge}
                    src={
                      snap.points.currentPoints < reward.price
                        ? badgesImages[reward.code]
                        : badgesImages[`${reward.code}_ACTIVE`]
                    }
                    alt={rewardsLabels[reward.code]}
                  />
                  <div className={ST.scoreBadge}>
                    {snap.points.currentPoints} /{reward.price}
                  </div>
                </div>
                <div className={ST.rewardLabel}>
                  {rewardsLabels[reward.code]}
                </div>
                <Button
                  variant='contained'
                  size='small'
                  className={ST.rewardOrder}
                  disabled={snap.points.currentPoints < reward.price}
                >
                  Commander
                </Button>
              </div>
            ))}
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
        <Button variant='contained' onClick={() => logout()} className={ST.logout}>
          Déconnexion
        </Button>
      </div>
    </div>
  );
};
export default Profile;
