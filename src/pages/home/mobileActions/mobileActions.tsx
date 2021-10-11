import Pen from '../../../../assets/img/pen.svg';
import JoinUs from '../../../../assets/img/join-us.svg';
import Testimony from '../../../../assets/img/temoignage-menu.svg';
import Logo from '../../../../assets/img/outlaw.png';
import Vote4Love from '../../../../assets/img/vote4love/vote.png';
import Contact from '../../../../assets/img/contact.svg';
import { useHistory } from 'react-router-dom';
const MobileActions = ({ ST }: { ST: CSSModuleClasses }) => {
  const history = useHistory();
  const actions = [
    {
      src: Pen,
      label: 'Signer la petition.',
      link: '/petition',
    },
    {
      src: Vote4Love,
      label: 'Vote4Love.',
    },
    {
      src: Logo,
      label: 'A propos de nous.',
    },
    {
      src: JoinUs,
      label: 'Nous rejoindre.',
      link: '/join-us',
    },
    {
      src: Testimony,
      label: 'Témoignages.',
    },
    {
      src: Contact,
      label: 'Nous contacter.',
    },
  ];
  return (
    <div className={ST.mobileActions}>
      {actions.map((action, key) => (
        <div
          className={ST.mobileAction}
          key={key}
          onClick={() => (action.link ? history.push(action.link) : null)}
        >
          <img src={action.src} />
          <div className={ST.label}>{action.label}</div>
        </div>
      ))}
    </div>
  );
};
export default MobileActions;
