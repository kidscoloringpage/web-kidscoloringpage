import { hasLoginDialog } from '../../stores/page.ts';

export function LoginButton() {
  return (
    <button
      onClick={() => hasLoginDialog.set(true)}
      className="button hidden min-w-[126px] text-center md:block"
    >
      Start Free
    </button>
  );
}
