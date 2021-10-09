import { maxWidth } from '@mui/system';
import Outlaws from '../../../assets/img/outlaw.png';
const HomeStaff = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 152px)',
      }}
    >
      <img
        src={Outlaws}
        style={{
          width: 300,
          maxWidth: '100%',
        }}
      />
    </div>
  );
};
export default HomeStaff;
