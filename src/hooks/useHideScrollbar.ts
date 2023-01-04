import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const useHideScrollbar = () => {
  const isMobileUp = useMediaQuery({
    query: '(min-width: 640px)',
  });

  useEffect(() => {
    document.body.style.overflowY = 'hidden';

    if (
      document.documentElement.scrollHeight >
        document.documentElement.clientHeight &&
      isMobileUp
    ) {
      document.body.style.paddingRight = '15px';
    }

    return () => {
      document.body.style.overflowY = '';
      document.body.style.paddingRight = '';
    };
  }, []);
};

export default useHideScrollbar;
