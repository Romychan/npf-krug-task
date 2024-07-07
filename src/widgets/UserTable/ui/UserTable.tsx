import { useEffect } from 'react';

import { LoadUser } from '~/features/LoadUser';

import { fetchUsersRequest, LIMIT_USERS } from '~/entities/User';

import { Table, TableBody, TableHeader } from '~/shared/ui/Table';
import { useTypedSelector, useAppDispatch } from '~/shared/lib/hooks';

import { TABLE_USER_COLUMNS } from '../model/constants';
import { UserTable as UserTableType } from '../model/types';

import styles from './UserTable.module.scss';

/** This component is used to display a list of users in a table format */
export const UserTable = () => {
	const { users, isLoading } = useTypedSelector((state) => state.users);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsersRequest({ limit: LIMIT_USERS.toString() }));
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Table className={styles.table} data-testid='user-table'>
					<TableHeader columns={TABLE_USER_COLUMNS} />
					<TableBody columns={TABLE_USER_COLUMNS} data={users as UserTableType[]} isLoading={isLoading} />
				</Table>
			</div>

			<LoadUser />
		</div>
	);
};
