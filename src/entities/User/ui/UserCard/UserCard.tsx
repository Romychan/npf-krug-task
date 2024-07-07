import { Avatar } from '~/shared/ui/Avatar';

import styles from './UserCard.module.scss';

interface IUserCardProps {
	/** The user's name */
	name: string;
	/** The user's username */
	username: string;
	/** The user's avatar */
	avatar?: string;
}

/** This component is used to display the user's avatar, name and username */
export const UserCard = ({ name, username, avatar = '' }: IUserCardProps) => {
	return (
		<div className={styles.profile} data-testid='user-card'>
			<Avatar src={avatar} name={username} alt={username} size='xs' isBordered />

			<div className={styles.information}>
				<span className={styles.name}>{name}</span>
				<span className={styles.username}>@{username}</span>
			</div>
		</div>
	);
};
