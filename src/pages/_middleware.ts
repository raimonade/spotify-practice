import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextMiddleware, NextResponse } from 'next/server';

export const middleware: NextMiddleware = async (req) => {
	const token = await getToken({
		req: req as unknown as NextApiRequest,
		secret: process.env.JWT_SECRET,
	});

	const { pathname } = req.nextUrl;

	// allow if token exist or request for next-auth routes.
	if (
		pathname.includes('/api/auth') ||
		pathname === '/login' ||
		token ||
		pathname.includes('/images')
	) {
		return NextResponse.next();
	}

	return NextResponse.redirect('/login');
};
