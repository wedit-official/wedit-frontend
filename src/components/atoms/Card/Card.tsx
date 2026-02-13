"use client";

import * as React from "react";
import Image from "next/image";

export type CardProps = {
  title: string;
  address: string;
  price: string;
  imageUrl: string;
  imageAlt?: string;
  onLike?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  className?: string;
};

export function Card({
  title,
  address,
  price,
  imageUrl,
  imageAlt,
  onLike,
  onShare,
  isLiked = false,
  className = "",
}: CardProps) {
  return (
    <div
      className={`w-full min-w-[966px] h-64 relative rounded-[5px] border border-purple-500 overflow-hidden ${className}`}
    >
      <div className="w-[926px] h-56 left-5 top-5 absolute bg-white border-b-[0.50px] border-black-tertiary overflow-hidden">
        <div className="w-48 h-48 left-[732px] top-[14px] absolute">
          <div className="w-full h-full relative rounded-xl overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt || title}
              fill
              className="object-cover"
              sizes="192px"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/20 rounded-xl" />
          </div>
        </div>

        <h3 className="left-[2px] top-[46px] absolute justify-start text-black-default text-2xl font-semibold uppercase leading-9">
          {title}
        </h3>

        <p className="left-[2px] top-[85px] absolute justify-start text-black-secondary text-base font-normal capitalize leading-5">
          {address}
        </p>

        <div className="w-full h-11 left-0 top-[161px] absolute">
          <p className="left-[70px] top-0 absolute justify-start text-brand-primary text-3xl font-semibold font-['Pretendard'] uppercase leading-10">
            {price}
          </p>
          <div className="left-0 top-[5px] absolute justify-start text-black-default text-2xl font-semibold uppercase leading-9">
            최저가
          </div>
        </div>

        <button
          onClick={onLike}
          className="w-7 h-7 left-0 top-0 absolute rounded overflow-hidden hover:opacity-70 transition-opacity"
          aria-label="좋아요"
        >
          <Image
            src="/icons/heart.svg"
            alt="좋아요"
            width={28}
            height={28}
            className={isLiked ? "opacity-100" : "opacity-50"}
          />
        </button>

        <button
          onClick={onShare}
          className="w-7 h-7 left-[44px] top-0 absolute overflow-hidden hover:opacity-70 transition-opacity"
          aria-label="공유"
        >
          <Image
            src="/icons/share.svg"
            alt="공유"
            width={28}
            height={28}
            className="opacity-50"
          />
        </button>
      </div>
    </div>
  );
}

