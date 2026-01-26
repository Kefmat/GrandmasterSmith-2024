import React from "react";
import { useTranslation } from "react-i18next";

interface User {
  user: {
    username: string;
    elo: number;
  };
}

const UserProfile: React.FC<User> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("userProfile.title")}</h2>
      <p>
        {t("userProfile.username")} {user.username}
      </p>
      <p>
        {t("userProfile.elo")} {user.elo}
      </p>
    </div>
  );
};

export default UserProfile;
