import { Avatar, Badge } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { userName } from '../../helpers/user';
import { store } from '../../store';
import ST from './userAvatar.module.scss';
import SettingsIcon from '@mui/icons-material/Settings';
const UserAvatar = () => {
  const snap = useSnapshot(store);
  const history = useHistory();
  const AvatarBadge = () => {
    return (
      <div className={ST.avatarBadge}>
        <SettingsIcon />
      </div>
    );
  };
  return (
    <div className={ST.avatarWrapper}>
      {snap.user && (
        <Badge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          badgeContent={<AvatarBadge />}
          onClick={() => history.push('/profile')}
        >
          <Avatar
            className={ST.avatarBtn}
            alt={userName(snap.user)}
            src={snap.user?.image}
            onClick={() => history.push('/profile')}
          />
        </Badge>
      )}
    </div>
  );
};

export default UserAvatar;
