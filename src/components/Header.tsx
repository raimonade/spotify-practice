import { useSession } from 'next-auth/react';
import User from './User';

const Header = () => {
	const { data: session } = useSession();
	return (
		<div>
			<User session={session} />
		</div>
	);
};

export default Header;
