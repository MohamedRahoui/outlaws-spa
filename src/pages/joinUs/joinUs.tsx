import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSnapshot } from 'valtio';
import { store } from '../../store';
import ST from './joinUs.module.scss';

const JoinUs = () => {
  const history = useHistory();
  const snap = useSnapshot(store);
  const blocks = [
    {
      path: '/join-us/member',
      label: 'Adhérent',
      auth: true,
    },
    {
      path: '/join-us/volunteer',
      label: 'Bénévole',
    },
    {
      path: '/join-us/trainee',
      label: 'Stagiaire',
    },
  ];
  const handlePath = (path: string, auth?: boolean) => {
    if (auth && !snap.user)
      return toast.warning(
        'Vous devez vous connecter pour acceder à cette page'
      );
    history.push(path);
  };
  return (
    <div className={ST.container}>
      <div className={ST.heading}>Nous rejoidnre</div>
      <div className={ST.subHeading}>
        Vous souhaitez rejoindre notre association en tant que :
      </div>
      <div className={ST.blocks}>
        {blocks.map((block, key) => (
          <div
            className={ST.block}
            key={key}
            onClick={() => handlePath(block.path, block.auth)}
          >
            {block.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinUs;