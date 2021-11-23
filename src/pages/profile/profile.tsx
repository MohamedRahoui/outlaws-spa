import ST from './profile.module.scss';
import { useHistory } from 'react-router-dom';
import { store } from '../../store';
import { useSnapshot } from 'valtio';
import { getFullNameEmail } from '../../helpers/user';
import { Alert, Avatar, Button, Tooltip } from '@mui/material';
import { lazy, Suspense, useEffect, useState } from 'react';
import { CopyTextToClipboard } from '../../helpers/tools';
import { Check } from '@mui/icons-material';
import Axios from '../../helpers/axios';
import badgesImages from '../../helpers/badgesImages';
import { rewardsLabels } from '../../helpers/labels';
import MemberCard from '../../../assets/img/memberCard.svg';
import OrderModal from './order/order';
import { IReward } from '../../models/data';
import { toast } from 'react-toastify';
const CardModal = lazy(() => import('./memberCard/memberCard'));
const Profile = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [currentReward, setReward] = useState<IReward | null>(null);
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
    if (!snap.subscriptionFetched) {
      Axios.get('data/subscription').then((res) => {
        store.setSubscription(res.data);
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

  const orderReward = (reward: IReward) => {
    if (reward.code === 'SUBSCRIPTION' && !snap.points.isMember) {
      toast.info(
        'Avant de commander, veuillez remplir le formulaire Nous Rejoindre / Adhérent'
      );
    } else {
      setReward(reward);
      setOrderOpen(true);
    }
  };

  return (
    <div className={ST.container}>
      <div className={ST.heading}>Profil</div>
      <div className={ST.userCard}>
        <div className={ST.avatarWrapper}>
          <Avatar
            className={ST.avatar}
            alt={getFullNameEmail(snap.user)}
            src={snap.user?.image}
          />
          {snap.subscription?.expiry && (
            <Tooltip title="Carte d'adhèrent" onClick={() => setCardOpen(true)}>
              <img src={MemberCard} className={ST.memberCard} />
            </Tooltip>
          )}
        </div>

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
          <div className={ST.score}>
            Commandes effectuées : {snap.points.orders.length}
          </div>
        </div>

        <div className={ST.rewards}>
          {!!snap.rewards?.length &&
            snap.rewards.map((reward, key) => (
              <div className={ST.rewardWrapper} key={key}>
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
                  onClick={() => orderReward(reward)}
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
        <Button
          variant='contained'
          onClick={() => logout()}
          className={ST.logout}
        >
          Déconnexion
        </Button>
      </div>
      <Suspense fallback={<span></span>}>
        <CardModal
          handleClose={setCardOpen}
          open={cardOpen}
          user={snap.user}
          subscription={snap.subscription}
        />
      </Suspense>
      <Suspense fallback={<span></span>}>
        <OrderModal
          handleClose={setOrderOpen}
          open={orderOpen}
          reward={currentReward}
          setReward={setReward}
        />
      </Suspense>
    </div>
  );
};
export default Profile;
