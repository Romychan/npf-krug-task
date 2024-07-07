import ReactDOM from 'react-dom/client';

import { MainPage } from '~/pages/MainPage';

import { ToastProvider } from '~/shared/ui/Toast';

import { RootStoreProvider } from '~/app/providers/withRootStore';
import { startWorker } from '~/app/lib/startWorker';

import '~/app/assets/styles/style.scss';

startWorker().then(() => {
	ReactDOM.createRoot(document.getElementById('root')!).render(
		<RootStoreProvider>
			<ToastProvider position='bottom-left'>
				<MainPage />
			</ToastProvider>
		</RootStoreProvider>,
	);
});
