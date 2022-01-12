import { signOut, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import shuffle from 'lodash/shuffle';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistState, playlistIdState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import Songs from './Songs';
import Playlist from './Playlist';
import User from './User';
import Header from './Header';
// import useSpotify from '@/hooks/useSpotify';

const Center = () => {
	const spotify = useSpotify();

	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState(playlistState);

	useEffect(() => {
		if (playlistId) {
			if (spotify?.getAccessToken()) {
				getPlaylist(playlistId);
			}
		}
	}, [spotify, playlistId]);

	async function getPlaylist(playlistId: string) {
		const res = await spotify.getPlaylist(playlistId);
		try {
			console.log('playlist', res.body);
			setPlaylist(res.body);
		} catch (err) {
			console.error('playlist fetch err:', err);
		}
	}

	return (
		<div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
			<Header />
			<Playlist playlist={playlist} />
			<Songs />
		</div>
	);
};

export default Center;
