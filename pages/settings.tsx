import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { formatCurrency } from "../global/utils/string_formatting";
import { showToast } from "../global/utils/toast_message";
import Header from "../global/views/header";
import LeftPanel from "../global/views/left_panel";
import { User } from "../modules/authentication/models/user_schema";

type SettingsProps = {
  user: User;
};

function Settings({ user }: SettingsProps) {
  const [loading, setLoading] = useState(false);
  const [stockbucks, setStockbucks] = useState(user?.stockbucks);

  const updateUserStockbucks = async (updatedStockbucksValue: number) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user?.email,
        updatedStockbucksValue,
      }),
    };

    // might have broke
    await fetch(`/api/user/update_user_stockbucks`, options).then((res) =>
      res.json().then((data) => {
        if (data.error) {
          showToast(data.error, "error");
        } else {
          user = data?.user;
        }
      })
    );
  };

  const handleAddStockbucks = async () => {
    await updateUserStockbucks(stockbucks + 5000.0);
    // function version of setState() prev
    setStockbucks((currentStockbucks) => currentStockbucks + 5000.0);
  };

  const handleRemoveStockbucks = async () => {
    if (stockbucks - 5000.0 >= 0.0) {
      await updateUserStockbucks(stockbucks - 5000.0);
      setStockbucks((currentStockbucks) => currentStockbucks - 5000.0);
    } else {
      showToast("Stockbucks cannot be less than 0!", "error");
    }
  };

  return (
    <div className="flex">
      <LeftPanel />
      {/* page content */}
      <div className={`flex flex-col h-screen px-10 w-[77.5%] right-0 absolute gap-4`}>
        <Header
          title="Settings"
          user_email={user?.email!}
          user_name={user?.name!}
          stockbucks={stockbucks}
          loading={loading}
          setLoading={setLoading}
        />

        <div className="flex flex-col gap-4 ">
          <span className="text-xl">{formatCurrency(stockbucks)}</span>
          {/* TODO: make temporary api routes to change currency */}
          <button
            className="bg-purple-lighter rounded-base p-4 w-52 font-bold"
            onClick={handleAddStockbucks}>
            ADD
          </button>
          {/* check for zero condition */}
          <button
            className="bg-red-lighter rounded-base p-4 w-52 font-bold"
            onClick={handleRemoveStockbucks}>
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const BASE_URL = `http://${context.req.headers.host}`;

  const session = await getSession({ req: context.req });
  let user;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: session?.user?.email,
    }),
  };

  await fetch(`${BASE_URL}/api/user/get_user`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        user = data?.user;
      }
    })
  );

  // to protect routes, we redirect if user is not logged in
  // and tries to access a page that needs a login
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      user,
    },
  };
};

export default Settings;
