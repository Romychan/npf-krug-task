import { IColumnTable, ISortingTable } from '..';

export interface MockUser {
	id: number;
	username: string;
	name: string;
	email: string;
}

export const MOCK_COLUMNS: IColumnTable<MockUser, keyof MockUser>[] = [
	{ label: 'ID', accessor: 'id', width: 120, isSortable: true },
	{
		label: 'Profile',
		accessor: 'name',
		width: 240,
		isSortable: true,
		renderCell: ({ currentData }) => `${currentData.name} ${currentData.username}`,
	},
	{ label: 'Email', accessor: 'email', width: 240 },
];

export const MOCK_SORTING: ISortingTable<MockUser, keyof MockUser> = {
	column: 'id',
	order: 'ascending',
};

export const MOCK_DATA_TABLE: MockUser[] = [
	{
		id: 1,
		name: 'Test Name',
		username: 'testname',
		email: 'test@test.test',
	},
];
