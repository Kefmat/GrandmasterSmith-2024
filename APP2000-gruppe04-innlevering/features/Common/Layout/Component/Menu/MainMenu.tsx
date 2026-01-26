import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";
import React from "react";
import { useTranslation } from "react-i18next";
import Brand from "../Brand";
import i18n from "i18next";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/router";

/**
 * @description MainMenuLayout er en layout for hovedmeny.
 * @author Borgar Flaen Stensrud
 * @usage <MainMenuLayout /> in components/menu/MainMenu.tsx
 * @example <MainMenuLayout  />
 *
 * @use Avatar,Button,Dropdown,DropdownItem,DropdownMenu,DropdownTrigger,Link,Navbar,
 * NavbarBrand,NavbarContent,NavbarItem,NavbarMenuToggle,NavbarMenu,
 * NavbarMenuItem,Autocomplete,AutocompleteItem fra @nextui-org/react
 * @use <LogoutButton />
 * @use <Image />
 * @use react
 * @version 1.0 2024-28-01
 * TODO: implementere bruk av <Image /> for effektiv bildelasting.
 * TODO: exporter types til egen fil.
 *
 */

export default function MainMenuLayout() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const { gsUser } = useAuth();

  const onLogout = () => {
    const logout = async () => {
      router.push("/api/auth/logout");
    };
    logout();
  };

  const menuItems = [
    "Profile",
    "Friends",
    "Activity",
    "Messages",
    "My Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleLogout = () => {
    onLogout && onLogout();
  };

  // Handler for changing the language
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Navbar
      className="bg-dark text-secondary"
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      maxWidth="full"
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden text-white"
      />
      <NavbarContent justify="start">
        <NavbarBrand className="">
          <Brand />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="center" className="hidden md:flex gap-4 ">
        <NavbarItem>
          <Link color="secondary" href="/">
            {t("home")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="secondary" href="/social-network">
            {t("socialNetwork")}
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="secondary" href="/about">
            {t("aboutUs")}
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/contact" aria-current="page" color="secondary">
            {t("contactUs")}
          </Link>
        </NavbarItem>
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button variant="solid" className="text-secondary" color="success">
              Games
            </Button>
          </DropdownTrigger>
          <DropdownMenu variant="faded" aria-label="Static Actions">
            <DropdownItem
              key="usage_metrics"
              description={t("seeAllPlayedGames")}
              href="/"
            >
              {t("myGames")}
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description={t("practiceMoves")}
              href="/games/practice"
            >
              {t("practiceMoves")}
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description={t("spectateOtherPlayers")}
              href="/games/pvp"
            >
              {t("liveGames")}
            </DropdownItem>

            <DropdownItem
              key="Play vs AI"
              description={t("spectateOtherPlayers")}
              href="/games/ai"
            >
              {t("vsComputerGames")}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarContent justify="end">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              {/* Add an Image for the language button */}
              <h2>{t("language")}</h2>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Language Selector"
            className="w-[340px] text-primary"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="en"
              description={t("langEN")}
              onClick={() => changeLanguage("en")}
            >
              <h2>{t("langEN")}</h2>
            </DropdownItem>
            <DropdownItem
              key="no"
              description={t("langNO")}
              onClick={() => changeLanguage("no")}
            >
              <h2>{t("langNO")}</h2>
            </DropdownItem>
            <DropdownItem
              key="ru"
              description={t("langRU")}
              onClick={() => changeLanguage("ru")}
            >
              <h2>{t("langRU")}</h2>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {!gsUser ? (
          <NavbarItem>
            <Button
              as={Link}
              href="/api/auth/login"
              color="secondary"
              variant="solid"
              className="text-primary"
              style={{ color: "primary" }}
            >
              {t("login")}
            </Button>
          </NavbarItem>
        ) : (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={gsUser ? gsUser.username : "User"}
                size="sm"
                style={{ color: "black" }}
                src={gsUser && gsUser?.picture}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label={t("profileActions")}
              className="text-primary"
              variant="flat"
            >
              <DropdownItem
                key="profile"
                className=" gap-2 text-secondary bg-dark p-4"
              >
                <p className="font-semibold">{t("signedInAs")}</p>
                <p className="">
                  {gsUser && gsUser.username}
                  <br /> {gsUser && gsUser?.email}
                  <br /> Elo: {gsUser && gsUser?.elo}
                </p>
              </DropdownItem>
              <DropdownItem key="settings">{t("mySettings")}</DropdownItem>
              <DropdownItem key="team_settings">
                {t("teamSettings")}
              </DropdownItem>
              <DropdownItem key="analytics">{t("analytics")}</DropdownItem>
              <DropdownItem key="system">{t("system")}</DropdownItem>
              <DropdownItem key="configurations">
                {t("configurations")}
              </DropdownItem>

              <DropdownItem key="help_and_feedback">
                {t("helpAndFeedback")}
              </DropdownItem>
              <DropdownItem
                key="log_out"
                color="primary"
                variant="solid"
                className="bg-error text-center"
              >
                <Link color="secondary" onClick={() => handleLogout()}>
                  {t("logout")}
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarMenu className="flex ">
        {menuItems.map((item, index) => (
          <NavbarMenuItem className="mt-5" key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full flex justify-center items-center"
              href="#"
              size="lg"
            >
              {t(item.toLowerCase())}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
