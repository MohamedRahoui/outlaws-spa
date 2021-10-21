import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { scrollTop } from './tools';
import { checkLogin } from './user';

function ScrollToTop({ history }: any) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      scrollTop();
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
