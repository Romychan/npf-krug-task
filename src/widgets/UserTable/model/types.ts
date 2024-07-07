import { ReactNode } from 'react';

import { User } from '~/entities/User';

/** Type for columns of a table with a user */
export interface UserTable extends User {
	/** The content of the profile column */
	profile: ReactNode;
	/** The content of the actions column */
	actions: ReactNode;
}
