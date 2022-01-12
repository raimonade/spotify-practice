import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSongInfo from '@/hooks/useSongInfo';
import useSpotify from '@/hooks/useSpotify';
import debounce from 'lodash/debounce';
import {
	RewindIcon,
	PlayIcon,
	ReplyIcon,
	SwitchHorizontalIcon,
	FastForwardIcon,
	VolumeUpIcon,
} from '@heroicons/react/solid';
import { HeartIcon, PauseIcon, VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Player = () => {
	const spotify = useSpotify();
	const { data: session, status } = useSession();
	const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const [volume, setVolume] = useState(50);
	const songInfo = useSongInfo();

	const fetchCurrentSong = async () => {
		if (!songInfo) {
			const current = await spotify.getMyCurrentPlayingTrack();
			if (current) {
				console.log('now playing:', current.body?.item);
				setCurrentTrackId(current.body?.item?.id);
				const playbackState = await spotify.getMyCurrentPlaybackState();
				if (playbackState) setIsPlaying(playbackState.body?.is_playing);
			}
		}
	};

	const handleVolumeChange = async (e) => {
		const vol = Number(e.target.value);
		setVolume(vol);
	};

	const handleClickPause = async () => {
		const state = await spotify.getMyCurrentPlaybackState();
		if (state?.body.is_playing) {
			spotify.pause();
			setIsPlaying(false);
			return;
		}
		spotify.play();
		setIsPlaying(true);
	};

	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			try {
				spotify.setVolume(volume);
			} catch (err) {
				console.error('error adjusting volume:', err);
			}
		}, 500),
		[volume]
	);

	useEffect(() => {
		if (spotify.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
			setVolume(50);
		}
	}, [currentTrackId, spotify, session]);

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
	}, [volume]);

	return (
		<div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
			{/* left */}
			<div className="flex items-center space-x-4 ">
				<img
					className="hidden md:inline h-10 w-10"
					src={songInfo?.album.images?.[0]?.url}
					alt=""
				/>
				<div>
					<h3>{songInfo?.name}</h3>
					<p>{songInfo?.artists?.[0]?.name}</p>
				</div>
			</div>
			<div className="flex flex-col items-center align-center justify-center">
				<div className="flex items-center justify-evenly w-full">
					<SwitchHorizontalIcon className="button" />
					<RewindIcon className="button" />
					{!isPlaying ? (
						<PlayIcon onClick={handleClickPause} className="button w-10 h-10" />
					) : (
						<PauseIcon onClick={handleClickPause} className="button w-10 h-10" />
					)}
					<FastForwardIcon className="button" />
					<ReplyIcon className="button" />
				</div>
				<div className="w-full mt-2 bg-gray-600  h-1">
					<div className="bg-gray-100 h-1" style={{ width: '45%' }}></div>
				</div>
			</div>
			<div className="flex items-center space-x-3 md:space-x-4 justify-end">
				<VolumeDownIcon
					className="button"
					onClick={() => volume > 0 && setVolume(volume - 10)}
				/>
				<input
					className="range-progress"
					type="range"
					value={volume}
					min={0}
					max={100}
					onChange={handleVolumeChange}
				/>
				<VolumeUpIcon
					className="button"
					onClick={() => volume < 100 && setVolume(volume + 10)}
				/>
			</div>
		</div>
	);
};

export default Player;
