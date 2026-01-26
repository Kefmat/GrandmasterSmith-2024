import CenteredLayout from "@/features/Common/Layout/Page/centered"; // Update the import path
import BackgroundChess from "@/features/Common/Layout/Page/BackgroundChess"; // Update the import path

import SignUp from "@/features/User/Layout/Sections/SignUp";
/**
 * @description SignUpPageLayout er en layout for sign-up.
 * @author Borgar Flaen Stensrud
 * @usage <SignUpPageLayout /> in pages/auth/sign-up/index.tsx
 *
 * @example <SignUpPageLayout />
 *
 * @use clerk.js
 * @use <CenteredLayout> <MainMenuLayout /> <BackgroundChess> <SignUp /> </BackgroundChess> </CenteredLayout>
 * @version 1.0 2024-28-01
 * !!Done, utgår ved nytt login system.
 * @old <SignUp afterSignUpUrl="/social-network" />
 *
 * @Referanse https://demos.creative-tim.com/material-kit/pages/sign-in.html
 * @Referanse This page is inspired by create tim's material-kit 2 react template.
 * we took inspiration from the template to create our sign-up page.
 *
 */

export default function SignUpPageLayout() {
  return (
    <div className="dark">
      <CenteredLayout>
        <BackgroundChess>
          <SignUp />
        </BackgroundChess>
      </CenteredLayout>
    </div>
  );
}
