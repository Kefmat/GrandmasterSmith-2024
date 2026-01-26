import Container from "@/features/Common/Components/Container/Container";
import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import { Avatar, Link } from "@nextui-org/react"; // Import the correct package for the Link component
import Brand from "../../Component/Brand";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/AuthContext";
type avatarType =
  | "danger"
  | "success"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | undefined;
const FooterSection = () => {
  const { t } = useTranslation();
  const { gsUser } = useAuth();
  const colors = ["danger", "success", "warning", "default", "primary"];
  return (
    <footer
      className="footer bg-dark text-secondary   w-full absolute bottom-0"
      style={{ zIndex: 500 }}
    >
      <div className="footer__content flex flex-row justify-start pb-5 pl-10">
        {/* About the Site/Company */}
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row chat_about__container">
            <div className="flex flex-col gap-3 items-start -translate-y-5">
              <div
                className="avatar
              flex flex-row
              "
              >
                {gsUser
                  ? gsUser.friends.map((friend: any, index: number) => (
                      <Avatar
                        key={index}
                        isBordered
                        name={friend.username}
                        src={friend?.profilePicture}
                        showFallback
                        color={
                          colors[
                            Math.floor(Math.random() * colors.length)
                          ] as avatarType
                        }
                        className="hover:cursor-pointer"
                      />
                    ))
                  : ""}
              </div>

              <div className="footer__about " style={{ maxWidth: "600px" }}>
                <h4 className="text-lg font-semibold">
                  {t("footerSection.aboutOurSite")}
                </h4>
                <p className="mt-2">
                  {t("footerSection.aboutOurSiteDescription")}
                </p>
              </div>
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="flex flex-col justify-center ">
            <div className="footer__social flex flex-col items-center gap-2 justify-start py-4 ">
              <Brand />
              <div className="mt-5">
                <p className="text-xs text-secondary mt-0">
                  {t("footerSection.footerText", {
                    year: new Date().getFullYear(),
                  })}
                </p>
              </div>
            </div>
          </div>
          {/* Site Navigation */}
          <div className="flex flex-col items-center  gap-1 justify-center mt-4">
            <h4 className="text-lg font-semibold mb-1">
              {t("footerSection.followUs")}
            </h4>
            <div className="flex items-center space-x-4 mb-5">
              <Link
                href="https://twitter.com/yourhandle"
                className="text-secondary"
                aria-label="Twitter"
              >
                <Twitter fontSize="large" />
              </Link>
              <Link
                href="https://facebook.com/yourpage"
                className="text-secondary"
                aria-label="Facebook"
              >
                <Facebook fontSize="large" />
              </Link>
              <Link
                href="https://linkedin.com/company/yourcompany"
                aria-label="LinkedIn"
                className="text-secondary "
              >
                <LinkedIn fontSize="large" />
              </Link>
            </div>
          </div>
          <div className="footer__navigation mr-5 p-5">
            <h4 className="text-lg font-semibold">
              {t("footerSection.quickLinks")}
            </h4>
            <div className="flex flex-row justify-between gap-5 mt-3">
              <Link
                href="/"
                className="block py-1 bg-secondary p-2 rounded-md shadow-lg  text-primary"
              >
                {t("footerSection.home")}
              </Link>
              <Link
                href="/about"
                className="block py-1  bg-secondary p-2 rounded-md shadow-lg  text-primary"
              >
                {t("footerSection.aboutUs")}
              </Link>

              <Link
                href="/contact"
                className="block py-1  bg-secondary p-2 rounded-md shadow-lg  text-primary"
              >
                {t("footerSection.contact")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
