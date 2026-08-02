import { NextResponse } from 'next/server';
import { MOCK_USERS } from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = (searchParams.get('role') || 'ADMIN').toUpperCase();
  const roleKey = role.toLowerCase();
  const user = MOCK_USERS[roleKey] || MOCK_USERS.admin;

  return NextResponse.json({
    user,
    role,
    authenticated: true,
  });
}
