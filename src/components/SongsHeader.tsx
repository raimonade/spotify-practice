import ClockIcon from '@heroicons/react/outline/ClockIcon';

const SongsHeader = () => {
	return (
		<div className="flex flex-col text-sm">
			<div className="grid grid-cols-2 text-gray-500 py-4 px-5">
				<div className="flex items-center space-x-4">
					<p className="w-4 text-right">#</p>
					<div>
						<p className="w-36 lg:w-64 ">TITLE</p>
					</div>
				</div>
				<div className="flex items-center justify-between ml-auto md:ml-0">
					<p className="hidden md:inline">ALBUM</p>
					<ClockIcon className="w-6 h-6" />
				</div>
			</div>
			<hr className="w-full border-gray-800" />
		</div>
	);
};

export default SongsHeader;
