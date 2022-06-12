import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center justify-center ">
      <Link href="/" passHref>
        <a className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-notebook"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
            <line x1="13" y1="8" x2="15" y2="8" />
            <line x1="13" y1="12" x2="15" y2="12" />
          </svg>
          membook
        </a>
      </Link>
    </div>
  );
}
