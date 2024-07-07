import { deleteUserRequest } from '~/entities/User';

import { useAppDispatch, useTypedSelector } from '~/shared/lib/hooks';
import { Button } from '~/shared/ui/Button';
import { Icon } from '~/shared/ui/Icon';

interface IDeleteUserProps {
	/** ID of the user to be deleted */
	id: number;
}

/** This component is used to delete the user on the server */
export const DeleteUser = ({ id }: IDeleteUserProps) => {
	const dispatch = useAppDispatch();
	const limit = useTypedSelector((state) => state.users.limit);

	const handleDeleteUser = () => {
		dispatch(deleteUserRequest({ id, limit }));
	};

	return (
		<Button
			type='button'
			onClick={handleDeleteUser}
			color='primary'
			variant='light'
			size='sm'
			aria-label='Delete a user'
			title='Delete'
			isIconOnly
			data-testid='delete-user'
		>
			<Icon name='trash' />
		</Button>
	);
};
