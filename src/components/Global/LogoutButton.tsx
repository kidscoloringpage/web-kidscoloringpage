import { logout } from '../../lib/jwt.ts';

export function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="hover:text-[#F36A3C] md:min-w-[126px] md:rounded-full md:border md:border-black md:py-2 md:text-center md:font-sansita md:font-bold"
    >
      Logout
    </button>
  );
}
