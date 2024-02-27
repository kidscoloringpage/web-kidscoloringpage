export function MobileNavButton() {
  return (
    <button
      onClick={() => {
        const menu = document.getElementById('menu');
        menu.classList.toggle('hidden');
      }}
      className="cursor-pointer md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M4 5L20 5"
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 12L20 12"
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 19L20 19"
          stroke="#000000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
