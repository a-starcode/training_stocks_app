import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "/public/static/svgs/i_search.svg";
import CaretIcon from "/public/static/svgs/i_caret.svg";
import NotificationBellIcon from "/public/static/svgs/i_notification_bell.svg";
import { search, SearchResult } from "../models/search";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { formatCurrency } from "../utils/string_formatting";
import { BeatLoader } from "react-spinners";

type HeaderProps = {
  title?: string;
  user_name: string;
  user_email: string;
  stockbucks: number;
  loading?: boolean;
  setLoading?: (state: boolean) => void;
};

function Header({
  title = "Title",
  user_name,
  user_email,
  stockbucks = 5000.0,
  loading,
  setLoading,
}: HeaderProps) {
  const [userOptionsDetails, setUserOptionsDetails] = useState(false);

  const handleMouseEnter = () => {
    setUserOptionsDetails(true);
  };

  const handleMouseLeave = () => {
    setUserOptionsDetails(false);
  };

  return (
    <div className="flex py-4 mt-7 justify-between items-center">
      {/* header title */}
      <h1 className="font-bold text-3xl cursor-pointer">{title}</h1>

      <SearchBox loading={loading!} setLoading={setLoading!} />

      {/* notifications + user options wrapper */}
      <div className="flex gap-10 items-center">
        {/* notifications */}
        <div className="relative w-fit h-fit cursor-pointer">
          {/* container + icon */}
          <div className="grid place-items-center w-12 h-12 bg-white-lightest rounded-full p-[10px]">
            <NotificationBellIcon className="w-full h-full" />
          </div>

          {/* purple dot notification indicator */}
          <div className="w-3 h-3 bg-purple-default absolute right-0 top-0 rounded-full"></div>
        </div>

        {/* user options detailed view */}
        <div className="relative">
          <UserOptions
            user_email={user_email}
            user_name={user_name}
            stockbucks={stockbucks}
            onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            classNames={`${userOptionsDetails ? "opacity-0" : "flex"}`}
          />
          {userOptionsDetails && (
            <UserOptionsDetailed
              user_email={user_email}
              user_name={user_name}
              stockbucks={stockbucks}
              onMouseLeave={handleMouseLeave}
              classNames={`${userOptionsDetails ? "flex" : "hidden"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

interface UserOptionsProps extends HeaderProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  classNames: string;
}

function UserOptions({
  user_name,
  user_email,
  stockbucks,
  onMouseEnter,
  onMouseLeave,
  classNames,
}: UserOptionsProps) {
  return (
    <div
      className={`flex gap-5 items-center cursor-pointer ${classNames}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {/* user image */}
      <div className="relative place-items-center w-12 h-12 rounded-full overflow-hidden">
        <Image src={`/static/images/default_profile.png`} alt="Profile Picture" fill={true} />
      </div>

      {/* user name + user email */}
      <div className="flex flex-col gap-1">
        <p className="text-base">{user_name}</p>
        <p className="text-white-lighter text-sm">{user_email}</p>
      </div>

      {/* down arrow indicator expand menu */}
      <div className="flex items-center ">
        <CaretIcon className="w-6 h-6" />
      </div>
    </div>
  );
}

function UserOptionsDetailed({
  user_name,
  user_email,
  stockbucks,
  onMouseEnter,
  onMouseLeave,
  classNames,
}: UserOptionsProps) {
  return (
    <div
      className={`z-50 absolute top-0 -translate-y-4 flex rounded-base bg-white-lightest shadow-md flex-col px-6 pt-3 pb-2 gap-2 ${classNames} cursor-pointer`}
      onMouseLeave={onMouseLeave}>
      {/* image + name & email */}
      <div className="flex items-center gap-5">
        {/* image */}
        <div className="relative place-items-center w-12 h-12 rounded-sm overflow-hidden">
          <Image src={`/static/images/default_profile.png`} alt="Profile Picture" fill={true} />
        </div>
        {/* name + email */}
        <div className="flex flex-col">
          <p className="text-lg">{user_name}</p>
          <p className="text-white-lighter text-sm">{user_email}</p>
        </div>
      </div>

      {/* stockbucks */}
      <div className="flex justify-center font-bold text-xl">{formatCurrency(stockbucks)}</div>
    </div>
  );
}

type SearchBoxProps = {
  loading: boolean;
  setLoading: (state: boolean) => void;
};
function SearchBox({ loading, setLoading }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [clickedSearch, setClickedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const searchResultsDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // TODO: remove this function and everything handle on submit
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // TODO: implement security features on input
  const handleSearch = async () => {
    setLoading(true);
    if (query.length >= 2) {
      setIsSearchBoxVisible(true);
      const searchResults = await search(query);
      setSearchResults(searchResults);
      setLoading(false);
    } else {
      setSearchResults([]);
      setIsSearchBoxVisible(false);
    }
  };

  // const handleOnSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   event.preventDefault(); // stops page from reloading

  //   handleSearch();
  // };

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchResultsDivRef.current &&
      !searchResultsDivRef.current.contains(event.target as Node)
    ) {
      setIsSearchBoxVisible(false);
    }
  };

  const handleClickInside = () => {
    setIsSearchBoxVisible(true);
  };

  const handleSearchResultItemClick = async (symbol: string) => {
    setClickedSearch(true);

    await router.push({
      pathname: `/analytics/${symbol}`,
      // query: { symbol },
    });

    setClickedSearch(false);
    setIsSearchBoxVisible(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col relative w-full max-w-md mx-2" onClick={handleClickInside}>
      {/* search box */}
      <div className="flex flex-1 items-center relative h-12">
        <input
          className="w-full h-full bg-white-lightest rounded-full py-2 pl-16 focus:outline-purple-default focus:outline-1 focus:outline text-lg"
          placeholder="Search"
          type="text"
          value={query}
          onKeyPress={handleKeyPress}
          onChange={handleInputChange}></input>

        {/* search icon */}
        <button
          className="absolute left-0 px-5 py-[10px] h-full z-20"
          onSubmit={() => handleSearch()}>
          <SearchIcon className="h-full w-full hover:text-purple-default" />
        </button>
      </div>

      {/* search results box */}
      {clickedSearch || loading ? (
        <div className="flex flex-col w-full" ref={searchResultsDivRef}>
          <ul className="flex w-full flex-col z-30 bg-black-default rounded-base gap-2 p-2 absolute max-h-80 top-14 overflow-y-scroll border-white-default border border-1 h-80">
            <li key={uuidv4()}>
              <div className="flex justify-center items-center w-full h-full">
                <BeatLoader color="#fff" size={10} />
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          {isSearchBoxVisible && searchResults.length > 0 && (
            <div className="flex flex-col w-full" ref={searchResultsDivRef}>
              <ul className="flex w-full flex-col z-30 bg-black-default rounded-base gap-2 p-2 absolute max-h-80 top-14 overflow-y-scroll border-white-default border border-1">
                {loading ? (
                  <li>
                    <div className="flex justify-center items-center w-full h-full">
                      <BeatLoader color="#fff" size={10} />
                    </div>
                  </li>
                ) : (
                  <div>
                    {searchResults.map((result) => (
                      <li
                        className="text-base rounded-base p-3 text-white-default bg-transparent hover:bg-white-lightest cursor-pointer"
                        onClick={() => handleSearchResultItemClick(result.symbol)}
                        key={uuidv4()}>
                        {result.symbol} - {result.name} ({result.type})
                      </li>
                    ))}
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
