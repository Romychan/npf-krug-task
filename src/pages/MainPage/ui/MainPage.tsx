import { useEffect } from 'react';

import { UserTable } from '~/widgets/UserTable';

import { AddUser } from '~/features/AddUser';

import { useTypedSelector } from '~/shared/lib/hooks';
import { useToast } from '~/shared/ui/Toast';

import styles from './MainPage.module.scss';

/** This component is used to display the main page */
export const MainPage = () => {
	const { message, error } = useTypedSelector((state) => state.users);
	const { addToast } = useToast();

	useEffect(() => {
		if (message) {
			addToast({ title: message, type: 'success' });
		}

		if (error) {
			addToast({ title: error, type: 'error' });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message, error]);

	return (
		<div className={styles.container}>
			<div className='container'>
				<div className={styles.inner}>
					<div className={styles.header}>
						<h1 className={styles.title}>Users</h1>
						<AddUser />
					</div>

					<UserTable />
				</div>
			</div>
		</div>
	);
};
