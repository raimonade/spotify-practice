import { currentTrackIdState, isPlayingState } from '@/atoms/songAtom';
import useSpotify from '@/hooks/useSpotify';
import { milistominutesandseconds } from '@/lib/time';
import { useRecoilState } from 'recoil';

interface SongProps {
	content: any;
	order: number;
}

const Song = ({ content, order }: SongProps) => {
	const spotify = useSpotify();
	const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
	const { track } = content;

	const playSong = () => {
		setCurrentTrackId(content.track.id);
		setIsPlaying(true);
		spotify.play({
			uris: [content.track.uri],
		});
	};

	return (
		<>
			{track && (
				<div
					className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
					onClick={playSong}
				>
					<div className="flex items-center space-x-4">
						<p className="w-10 text-right font-medium">{order + 1}</p>
						<img
							src={track.album.images[0].url}
							className="h-12 w-12"
							alt="album art"
						/>
						<div>
							<p className="w-36 lg:w-64 text-white truncate">{track.name}</p>
							<p className="w-40">{track.artists[0].name}</p>
						</div>
					</div>
					<div className="flex items-center justify-between ml-auto md:ml-0">
						<p className="hidden md:inline">{track.album.name}</p>
						<p>{milistominutesandseconds(track.duration_ms)}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Song;
