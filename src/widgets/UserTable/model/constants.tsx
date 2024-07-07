import { DeleteUser } from '~/features/DeleteUser';

import { UserCard } from '~/entities/User';

import { IColumnTable } from '~/shared/ui/Table';

import { UserTable } from './types';

export const TABLE_USER_COLUMNS: IColumnTable<UserTable, keyof UserTable>[] = [
	{
		label: 'ID',
		accessor: 'id',
		width: 50,
	},
	{
		label: 'Profile',
		accessor: 'profile',
		width: 510,
		renderCell: ({ currentData: { name, username, image } }) => (
			<UserCard name={name} username={username} avatar={image} />
		),
	},
	{
		label: 'Email',
		accessor: 'email',
		width: 510,
	},
	{
		label: '',
		accessor: 'actions',
		renderCell: ({ currentData: { id } }) => <DeleteUser id={id} />,
		width: 70,
	},
];
