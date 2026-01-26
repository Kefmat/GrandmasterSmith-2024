import React from "react";
import { Container } from "@chakra-ui/react";
import Text from "@/features/Common/Components/Text/text";
const gdpr = () => {
  return (
    <Container maxWidth="container.md" className="pt-5">
      <div className="flex flex-col gap-2">
        <Text variant="h1" size="4xl">
          Privacy Policy for Grandmaster&apos;s Smith
        </Text>
        <p>Effective Date: 29. April. 2024</p>
        <hr />
        <p>
          Welcome to Grandmaster&apos;s Smith, the chess social network where
          players from around the world connect, compete, and share their
          passion for chess. This Privacy Policy outlines how we collect, use,
          protect, and share information about you as a user of
          Grandmaster&apos;s Smith. By using our platform, you agree to the
          collection and use of information in accordance with this policy.
        </p>
        <h2>Information We Collect</h2>
        <b>1. Personal Information:</b>
        <b>Basic User Data:</b>{" "}
        <p>
          When you create an account with Grandmaster&apos;s Smith, we collect
          basic personal information such as your name, email address, and
          country. We use Auth0 for authentication and do not store passwords.
        </p>
        <b>Chess Information:</b>
        <p>
          {" "}
          We collect data related to the games you play, the openings you store,
          your Elo rating, and any uploads or posts you make on our platform.
        </p>
        <h2>2. Cookies and Usage Data:</h2>
        <p>
          We use cookies primarily to authenticate users and improve user
          experience. You can instruct your browser to refuse all cookies or to
          indicate when a cookie is being sent. However, if you do not accept
          cookies, you may not be able to use some portions of our service.
        </p>
        <b>Use of Data</b>
        <p>
          Grandmaster&apos;s Smith uses the collected data for various purposes:
        </p>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>
            To allow you to participate in interactive features of our service
            when you choose to do so
          </li>
          <li>To provide customer support</li>
          <li>
            To gather analysis or valuable information so that we can improve
            our service
          </li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent, and address technical issues</li>
          <li>Transfer Of Data</li>
        </ul>
        <p>
          Your information, including Personal Data, may be transferred to — and
          maintained on — computers located outside of your state, province,
          country, or other governmental jurisdiction where the data protection
          laws may differ from those of your jurisdiction. If you are located
          outside Norway and choose to provide information to us, please note
          that we transfer the data, including Personal Data, to Norway and
          process it there.
        </p>
        <p>
          Your consent to this Privacy Policy followed by your submission of
          such information represents your agreement to that transfer.
        </p>
        <h2>Disclosure Of Data</h2>
        <b>Legal Requirements:</b>
        <p>
          Grandmaster&apos;s Smith may disclose your Personal Data in the good
          faith belief that such action is necessary to:
        </p>
        <b>Comply with a legal obligation</b>
        <p>
          Protect and defend the rights or property of Grandmaster&apos;s Smith
          Prevent or investigate possible wrongdoing in connection with the
          service
        </p>{" "}
        <p>
          Protect the personal safety of users of the service or the public
          Protect against legal liability Security Of Data
        </p>
        <p>
          {" "}
          The security of your data is important to us but remember that no
          method of transmission over the Internet is completely secure. While
          we strive to use commercially acceptable means to protect your
          Personal Data, we cannot guarantee its absolute security.
        </p>
      </div>
    </Container>
  );
};

export default gdpr;
