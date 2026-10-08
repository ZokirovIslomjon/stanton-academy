import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Ignore the /:lang prefix so switching language doesn't scroll back to the top
  const pathname = useLocation().pathname.replace(/^\/[^/]+/, '') || '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;