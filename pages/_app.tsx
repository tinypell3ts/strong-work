import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { Header } from '../components';
import { Provider } from 'next-auth/client';

function MyApp({ Component, pageProps }) {
    return (
        <Provider session={pageProps.session}>
            <div className="h-screen bg-indigo-500">
                <Header />
                <Component {...pageProps} />
            </div>
        </Provider>
    );
}

export default MyApp;
