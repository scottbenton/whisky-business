import React from "react";
import { Settings } from "components/pages/settings/Settings";

export const SettingsPage: React.FC = (props) => {
  return (
    <div className={" px-2 mx-auto flex flex-col"}>
      <h1 className={" text-2xl font-semibold"}>Settings</h1>
      <Settings />
    </div>
  );
};
