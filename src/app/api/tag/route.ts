import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
	try {
		const tags = await prisma.tag.findMany();
		return NextResponse.json({ tags: tags }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: 'Error fetching tags', error: error.message },
			{ status: 500 },
		);
	}
}

// POST请求处理程序：创建新标签
export async function POST(req: NextRequest) {
	try {
		const { name } = await req.json();
		const isExist = await prisma.tag.findUnique({ where: { name } });
		if (isExist) {
			return NextResponse.json({ message: 'Tag already exists' }, { status: 400 });
		}
		const newTag = await prisma.tag.create({ data: { name } });
		return NextResponse.json(newTag, { status: 201 });
	} catch (error: any) {
		return NextResponse.json(
			{ message: 'Error creating tag', error: error.message },
			{ status: 500 },
		);
	}
}
