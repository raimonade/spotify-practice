import Center from '@/components/Center';
import Head from 'next/head';
import Sidebar from '@/components/Sidebar';
import { useRecoilState } from 'recoil';
import { playlistState } from '@/atoms/playlistAtom';
import { useEffect } from 'react';
import useSpotify from '@/hooks/useSpotify';
import { getSession } from 'next-auth/react';
import Player from '@/components/Player';

export default function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<main className="flex">
				<Sidebar />
				<Center />
			</main>
			<div className="sticky bottom-0">
				<Player />
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
}
