import { UserForm } from './types';

export const ADD_USER_FIELDS: { label: string; value: keyof UserForm }[] = [
	{ label: 'Name', value: 'name' },
	{ label: 'Username', value: 'username' },
	{ label: 'Email', value: 'email' },
];
