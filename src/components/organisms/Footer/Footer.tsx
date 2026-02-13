import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full h-40 relative bg-gray-200 overflow-hidden">
      {/* Right Section */}
      <div className="absolute right-12 top-[67px] flex items-center gap-7">
        {/* 이용약관 */}
        <Link
          href="/terms"
          className="text-black-secondary text-lg font-normal underline capitalize leading-6 hover:text-black-default transition-colors"
        >
          이용약관
        </Link>

        {/* 개인정보 처리방침 */}
        <Link
          href="/privacy"
          className="text-black-secondary text-lg font-normal underline capitalize leading-6 hover:text-black-default transition-colors"
        >
          개인정보 처리방침
        </Link>

        {/* Instagram Icon */}
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 overflow-hidden flex items-center justify-center"
          aria-label="Instagram"
        >
          <Image
            src="/icons/insta.svg"
            alt="Instagram"
            width={36}
            height={36}
            className="w-9 h-9"
          />
        </Link>
      </div>

      {/* Copyright */}
      <p className="left-12 top-[100px] absolute justify-start text-black-secondary text-base font-normal capitalize leading-5">
        © 2026 웨딧. All rights reserved.
      </p>

      {/* WEDIT Logo */}
      <h2 className="left-12 top-[28px] absolute justify-start text-black-secondary text-2xl font-semibold uppercase leading-9">
        WEDIT
      </h2>

      {/* Email */}
      <p className="left-12 top-[75px] absolute justify-start text-black-secondary text-base font-normal lowercase leading-5">
        제휴 및 입점 문의 : Weditteam0@gmail.com
      </p>
    </footer>
  );
}

