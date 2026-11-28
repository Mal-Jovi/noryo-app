"use client";
import Image from "next/image";
import SearchBarIcon from "../app/assets/searchBarIcon.png";

export const SearchBar = () => {
  return (
    <div className="search-bar">
      <span className="circle" aria-hidden="true" />
      <span className="square" aria-hidden="true" />
      <Image
        src={SearchBarIcon}
        alt="Search Icon"
        className="search-bar-icon"
      />
    </div>
  );
};
