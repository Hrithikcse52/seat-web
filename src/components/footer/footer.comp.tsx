import Logo from "components/logo.comp";
import { packageVer } from "config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4  rounded-lg shadow md:px-6 md:py-8 ">
      <div className="sm:flex sm:items-center sm:justify-between">
        <Logo />

        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 ">
          <li>
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6 ">About</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="mr-4 hover:underline md:mr-6">Privacy Policy</span>
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
        <Logo />
        <span> Version: {packageVer.version} </span>. All Rights Reserved. © 2022
      </span>
    </footer>
  );
}
