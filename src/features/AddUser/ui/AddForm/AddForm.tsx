import { createUserRequest } from '~/entities/User';

import { FormControl } from '~/shared/ui/FormControl';
import { Input } from '~/shared/ui/Input';
import { Button } from '~/shared/ui/Button';
import { useAppDispatch, useFormState, useTypedSelector } from '~/shared/lib/hooks';

import { UserForm } from '../../model/types';
import { validateUserForm } from '../../lib/utils';
import { ADD_USER_FIELDS } from '../../model/constants';

import styles from './AddForm.module.scss';

interface IAddFormProps {
	/** The callback that will be called after clicking Cancel or Add */
	onComplete: () => void;
}

/** This component of the form is for adding a new user */
export const AddForm = ({ onComplete }: IAddFormProps) => {
	const {
		values: fields,
		errors,
		handleChange,
		handleSubmit,
	} = useFormState<UserForm>({ email: '', name: '', username: '' }, validateUserForm);
	const dispatch = useAppDispatch();
	const limit = useTypedSelector((state) => state.users.limit);

	const handleSubmitForm = (values: UserForm) => {
		dispatch(createUserRequest({ user: values, limit }));
		onComplete();
	};

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)} data-testid='new-user-form'>
				{ADD_USER_FIELDS.map(({ label, value }) => (
					<FormControl key={value} label={label} labelId={value} error={errors[value]} required>
						<Input
							id={value}
							name={value}
							variant='bordered'
							size='sm'
							maxLength={32}
							minLength={3}
							value={fields[value]}
							error={errors[value]}
							onChange={handleChange}
						/>
					</FormControl>
				))}

				<div className={styles.actions}>
					<Button size='sm' color='primary' variant='flat' data-testid='cancel-add-user' onClick={onComplete}>
						Cancel
					</Button>
					<Button type='submit' color='primary' variant='filled' size='sm' data-testid='add-user'>
						Add
					</Button>
				</div>
			</form>
		</div>
	);
};
