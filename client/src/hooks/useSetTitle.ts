import { useEffect } from 'react';

const useSetTitle = (title?: string) => {
  useEffect(() => {
    const siteName = 'Fable Store';

    document.title = siteName;

    if (title) {
      document.title = `${title} | ${siteName}`;
    }
  }, [title]);
};

export default useSetTitle;
