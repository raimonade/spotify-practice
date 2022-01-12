import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import spotifyApi from '@/lib/spotify';

const useSpotify = (): typeof spotifyApi => {
	const { data: session } = useSession();

	useEffect(() => {
		if (session) {
			// if refresh token attempt fails, direct user to login
			if (session.error === 'RefreshTokenError') {
				void signIn();
			}
			//   @ts-ignore
			spotifyApi.setAccessToken(session.user?.accessToken ?? '');
		}
	}, [session]);

	return spotifyApi;
};

export default useSpotify;
