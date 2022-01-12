import { playlistState } from '@/atoms/playlistAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Song from './Song';
import SongsHeader from './SongsHeader';

const Songs = () => {
	const playlist = useRecoilValue(playlistState);

	return (
		<div className="px-8 flex flex-col space-y-1 pb-28 text-white">
			<SongsHeader />
			{playlist?.tracks.items
				?.filter((item) => item?.track !== null)
				.map((track, i) => (
					<Song content={track} order={i} key={i} />
				))}
		</div>
	);
};

export default Songs;
