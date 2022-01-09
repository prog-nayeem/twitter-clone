import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../style/globals.css';
import ProgressBar from '@badrap/bar-of-progress';
import { Router } from 'next/dist/client/router';

// porgress ber functionality here

const progress = new ProgressBar({
  size: 3,
  color: 'blue',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
