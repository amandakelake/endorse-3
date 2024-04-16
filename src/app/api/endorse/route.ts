import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const list = await prisma.endorse.findMany();
		return NextResponse.json({ list }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: 'Error fetching tags', error: error.message },
			{ status: 500 },
		);
	}
}
