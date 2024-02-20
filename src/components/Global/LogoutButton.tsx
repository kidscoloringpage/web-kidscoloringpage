import {logout} from "../../lib/jwt.ts";

export function LogoutButton() {
    return (
        <button onClick={logout}
                className="md:font-sansita md:font-bold md:border md:border-black md:rounded-full md:text-center md:py-2 md:min-w-[126px] hover:text-[#F36A3C]">Logout
        </button>
    );
}