import { playlistIdState } from '@/atoms/playlistAtom';
import useSpotify from '@/hooks/useSpotify';
import {
	HomeIcon,
	SearchIcon,
	LibraryIcon,
	RssIcon,
	PlusCircleIcon,
	HeartIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Sidebar = () => {
	const spotify = useSpotify();
	const { data: session, status } = useSession();
	const [playlists, setPlaylists] = useState([]);
	const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

	useEffect(() => {
		if (spotify?.getAccessToken()) {
			getUserPlaylists();
		}
	}, [session, spotify]);

	async function getUserPlaylists(): Promise<void> {
		const res = await spotify.getUserPlaylists();
		if (res) {
			setPlaylists(res.body?.items);
			console.log(res.body.items);
		}
	}

	return (
		<div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
			<div className="space-y-4">
				{/* <button
					onClick={() => signOut()}
					className="flex items-center space-x-2 hover:text-white"
				>
					<p>Logout</p>
				</button> */}
				<button className="flex items-center space-x-2 hover:text-white font-bold">
					<HomeIcon className="h-5 w-5" />
					<p>Home</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white font-bold">
					<SearchIcon className="h-5 w-5" />
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white font-bold">
					<LibraryIcon className="h-5 w-5" />
					<p>Your Library</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900" />
				<button className="flex items-center space-x-2 hover:text-white font-bold">
					<PlusCircleIcon className="h-5 w-5" />
					<p>Create Playlist</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white font-bold">
					<HeartIcon className="h-5 w-5" />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white font-bold">
					<RssIcon className="h-5 w-5" />
					<p>Your episodes</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900" />
				{playlists &&
					playlists.map((playlist, i) => (
						<p
							className={`cursor-pointer hover:text-white ${
								playlist.id === playlistId
									? 'font-semibold text-white'
									: 'font-regular'
							}`}
							key={playlist.id}
							onClick={() => playlist.id !== playlistId && setPlaylistId(playlist.id)}
						>
							{playlist.name}
						</p>
					))}
			</div>
		</div>
	);
};

export default Sidebar;
