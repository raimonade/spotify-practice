import { currentTrackIdState } from '@/atoms/songAtom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from './useSpotify';

const useSongInfo = () => {
	const spotify = useSpotify();
	const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [songInfo, setSongInfo] = useState(null);

	useEffect(() => {
		const fetchSongInfo = async () => {
			if (currentTrackId) {
				const token = spotify.getAccessToken();
				const trackInfo = await fetch(
					`https://api.spotify.com/v1/tracks/${currentTrackId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				).then((res) => res.json());

				setSongInfo(trackInfo);
			}
		};
		fetchSongInfo();
	}, [currentTrackId, spotify]);

	return songInfo;
};

export default useSongInfo;
