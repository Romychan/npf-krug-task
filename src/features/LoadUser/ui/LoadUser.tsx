import { fetchUsersRequest, LIMIT_USERS_INCREASE } from '~/entities/User';

import { Button } from '~/shared/ui/Button';
import { useAppDispatch, useTypedSelector } from '~/shared/lib/hooks';

interface ILoadUserProps {
	/** The number of users to increase the limit by. */
	increaseLimit?: number;
}

/** This component is used to load users from the server */
export const LoadUser = ({ increaseLimit = LIMIT_USERS_INCREASE }: ILoadUserProps) => {
	const { limit, total } = useTypedSelector((state) => state.users);
	const dispatch = useAppDispatch();

	const handleLoadMoreUsers = () => {
		const newLimit = limit + increaseLimit;

		dispatch(fetchUsersRequest({ limit: newLimit.toString() }));
	};

	if (limit >= total) {
		return null;
	}

	return (
		<Button onClick={handleLoadMoreUsers} color='primary' variant='flat' size='sm' data-testid='load-more-users'>
			Load More Users
		</Button>
	);
};
