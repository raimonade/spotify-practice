import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { bigLogo, brandColor } from '../lib/vars';

const Login = ({ providers }) => {
	return (
		<div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
			<img className="p-10" src={bigLogo} alt="spotify logo" />
			{Object.values(providers).map((provider: ClientSafeProvider) => (
				<div key={provider.name}>
					<button
						onClick={() => signIn(provider.id, { callbackUrl: '/' })}
						className={`bg-[#18D860] text-white p-5 rounded-full`}
					>
						Login with {provider.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default Login;

export async function getServerSideProps() {
	const providers: any = await getProviders();
	return {
		props: {
			providers,
		},
	};
}
