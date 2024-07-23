import React from "react";
import StockifyLogo from "/public/static/svgs/i_stockify_logo.svg";
import HomeNavIcon from "/public/static/svgs/i_home.svg";
import DashboardNavIcon from "/public/static/svgs/i_dashboard.svg";
import MarketNavIcon from "/public/static/svgs/i_market.svg";
import AnalyticsNavIcon from "/public/static/svgs/i_analytics.svg";
import PortfolioNavIcon from "/public/static/svgs/i_portfolio.svg";
import NewsNavIcon from "/public/static/svgs/i_news.svg";
import LogoutIcon from "/public/static/svgs/i_logout.svg";
import SettingsIcon from "/public/static/svgs/i_settings.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { signOut } from "next-auth/react";

type LeftPanelProps = {
  isExpanded?: boolean;
};

function LeftPanel({ isExpanded = true }: LeftPanelProps) {
  const router = useRouter();

  let navItems = [
    {
      id: uuidv4(),
      navItemIcon: <HomeNavIcon className="w-full h-full" />,
      navItemTitle: "Home",
      navPageLink: "/",
    },
    {
      id: uuidv4(),
      navItemIcon: <DashboardNavIcon className="w-full h-full" />,
      navItemTitle: "Dashboard",
      navPageLink: "/dashboard",
    },
    {
      id: uuidv4(),
      navItemIcon: <MarketNavIcon className="w-full h-full" />,
      navItemTitle: "Market",
      navPageLink: "/market",
    },
    {
      id: uuidv4(),
      navItemIcon: <PortfolioNavIcon className="w-full h-full" />,
      navItemTitle: "Portfolio",
      // TODO: add username support
      navPageLink: "/portfolio/portfolio",
    },
    {
      id: uuidv4(),
      navItemIcon: <AnalyticsNavIcon className="w-full h-full" />,
      navItemTitle: "Analytics",
      navPageLink: "/analytics/undefined",
    },
    {
      id: uuidv4(),
      navItemIcon: <NewsNavIcon className="w-full h-full" />,
      navItemTitle: "News",
      navPageLink: "/news",
    },
  ];

  const handleSignOut = () => {
    signOut();
  };

  return isExpanded ? (
    <div className={`fixed top-0 left-0 w-[22.5%] h-screen bg-white-lightest`}>
      {/* wrapper */}
      <div className="flex h-full flex-col px-2 py-8 overflow-y-scroll items-center">
        {/* logo */}
        <div className="flex gap-1 items-center w-full pl-2">
          <StockifyLogo className="w-8 h-8" />
          <span className="font-bold text-xl">STOCKIFY</span>
        </div>

        {/* divider */}
        <hr className="text-[#ffffff40] w-full my-4" />

        {/* nav bar */}
        {/* it is translated towards the left because of the highlight 
      bar design, only one side is rounded so we hide the other 
      rounded side by moving it off screen */}
        <div className="flex flex-col justify-between w-full flex-1">
          {/* middle nav bar section */}
          <nav className="w-full -translate-x-8 mt-8">
            <ul className="flex flex-col gap-4">
              {/* navbar items */}
              {navItems.map((navItem) => {
                return (
                  <Link href={navItem.navPageLink} key={navItem.id}>
                    <li
                      className={`${
                        router.pathname.includes(`/${navItem.navItemTitle.toLowerCase()}`) // check if selected
                          ? "bg-purple-lighter"
                          : "bg-transparent"
                      } flex items-center gap-2 rounded-full pl-14 py-2`}>
                      <div className="relative grid place-items-center w-6 h-6">
                        {navItem.navItemIcon}
                      </div>
                      <span
                        className={`${
                          router.pathname === `/${navItem.navItemTitle.toLowerCase()}`
                            ? "font-bold"
                            : ""
                        } text-lg pt-1`}>
                        {navItem.navItemTitle}
                      </span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>

          {/* bottom section */}
          <div className="flex flex-col -translate-x-8 gap-1">
            {/* settings button */}
            <Link href={`/settings`}>
              <div
                className={`${
                  router.pathname.includes(`/settings`) // check if selected
                    ? "bg-purple-lighter"
                    : "bg-transparent"
                } flex items-center gap-2 rounded-full pl-14 py-2`}>
                <div className="relative grid place-items-center w-6 h-6">
                  <SettingsIcon />
                </div>
                <span
                  className={`${router.pathname === "/settings" ? "font-bold" : ""} text-lg pt-1`}>
                  Settings
                </span>
              </div>
            </Link>
            {/* log out button */}
            <button onClick={handleSignOut}>
              <div className="flex items-center gap-2 rounded-full pl-14 py-2">
                <div className="relative grid place-items-center w-6 h-6">
                  <LogoutIcon />
                </div>
                <span className="text-lg pt-1">Log Out</span>
              </div>
            </button>
            {/* empty space to account for tablets */}
            <div className="h-32 bg-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // shrinked version
    <div className={`fixed top-0 left-0 w-[5%] h-screen bg-white-lightest`}>
      {/* wrapper */}
      <div className="flex h-full flex-col px-4 py-8 items-center">
        {/* logo */}
        <div className="flex gap-1 items-center w-full justify-center">
          <StockifyLogo className="w-10 h-10" />
          {/* <span className="font-bold text-xl">STOCKIFY</span> */}
        </div>

        {/* divider */}
        <hr className="text-[#ffffff40] w-full my-4" />

        {/* nav bar */}
        <nav className="w-full mt-8">
          <ul className="flex flex-col gap-5">
            {/* navbar items */}
            {navItems.map((navItem) => {
              return (
                <Link href={navItem.navPageLink} key={navItem.id}>
                  <li
                    className={`${
                      router.pathname === `/${navItem.navItemTitle.toLowerCase()}` // check if selected
                        ? "bg-purple-lighter"
                        : "bg-transparent"
                    } flex items-center justify-center rounded-xs p-2 relative`}>
                    <div className="relative grid place-items-center min-w-[20px] min-h-[20px]">
                      {navItem.navItemIcon}
                    </div>
                    <span className="hidden absolute z-30 hover:block text-black-default bg-yellow-lighter px-4 py-2 text-base pointer-events-none">
                      {navItem.navItemTitle}
                    </span>
                    {/* <span
                      className={`${
                        router.pathname === `/${navItem.navItemTitle.toLowerCase()}`
                          ? "font-bold"
                          : ""
                      } text-lg pt-1`}>
                      {navItem.navItemTitle}
                    </span> */}
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default LeftPanel;
