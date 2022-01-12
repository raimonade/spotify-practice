import { useEffect, useState } from 'react';
import FastAverageColor from 'fast-average-color';

const Playlist = ({ playlist }) => {
	// const [color, setColor] = useState('#f3f3f3');
	const [color, setColor] = useState('#ada5a3');

	async function onImageLoad(e) {
		const color = await new FastAverageColor().getColorAsync(e.target);
		setColor(color.hex);
		console.log(`color:`, color);
	}

	return (
		<section
			className={`flex items-end space-x-7 bg-gradient-to-b to-black from-blue-500 text-white p-8`}
			style={
				{
					'--tw-gradient-from': `${color}`,
				} as React.CSSProperties
			}
		>
			{playlist ? (
				<>
					<img
						src={playlist?.images[0]?.url}
						alt="playlist cover"
						className="h-44 w-44 shadow-2xl"
						onLoad={onImageLoad}
						crossOrigin="anonymous"
					/>
					<div>
						<p>PLAYLIST</p>
						<h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
					</div>
				</>
			) : (
				<div className="flex items-center justify-center">SELECT PLAYLIST</div>
			)}
		</section>
	);
};

export default Playlist;
