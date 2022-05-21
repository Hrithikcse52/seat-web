import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4  rounded-lg shadow md:px-6 md:py-8 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a
          href="https://flowbite.com"
          className="flex items-center mb-4 sm:mb-0"
        >
          {/* <img
          src="/docs/images/logo.svg"
          className="mr-3 h-8"
          alt="Flowbite Logo"
        /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            LOGO
          </span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 ">
          <li>
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6 ">About</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6">Licensing</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6">Contact</span>
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center ">
        © 2022{" "}
        <Link href="/">
          <span className="hover:underline">Take Your Seat™</span>
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
