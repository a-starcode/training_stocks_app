import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import StockIconApple from "../../public/static/svgs/i_stock_apple.svg";

type LeftPanelTestProps = {
  showNav: boolean;
};   

const SideBar = forwardRef<HTMLDivElement, LeftPanelTestProps>(
  ({ showNav }: LeftPanelTestProps, ref) => {
    const router = useRouter();

    return (
      <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
        <div className="flex justify-center mt-6 mb-14">
          <picture>
            <img className="w-32 h-auto" src="/ferox-transparent.png" alt="company logo" />
          </picture>
        </div>

        <div className="flex flex-col">
          <Link href="/">
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname == "/"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}>
              <div className="mr-2">
                <StockIconApple className="h-5 w-5" />
              </div>
              <div>
                <p>Home</p>
              </div>
            </div>
          </Link>
          <Link href="/account">
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname == "/account"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}>
              <div className="mr-2">
                <StockIconApple className="h-5 w-5" />
              </div>
              <div>
                <p>Account</p>
              </div>
            </div>
          </Link>
          <Link href="/billing">
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname == "/billing"
                  ? "bg-orange-100 text-orange-500"
                  : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
              }`}>
              <div className="mr-2">
                <StockIconApple className="h-5 w-5" />
              </div>
              <div>
                <p>Billing</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
);

SideBar.displayName = "SideBar";

export default SideBar;
