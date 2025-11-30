import {
  Copyright,
  FooterContainer,
  GetTheApp,
  Socials,
} from "@/styles/components/footer.styles";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStore } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import Logo from "./Logo";

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <article>
          <Logo variant="white" />
          <p>
            We are your one stop store for all things electronics, gadgets and
            more. Have fun shopping with us!
          </p>
          <Socials>
            <FaFacebookSquare />
            <RiInstagramFill />
            <FaXTwitter />
          </Socials>
        </article>

        <ul>
          <h3>Make money with us</h3>
          <li>Become an affiliate</li>
          <li>Become a seller</li>
          <li>Become an investor</li>
        </ul>
        <ul>
          <h3>Useful links</h3>
          <li>About us</li>
          <li>Terms and conditions</li>
          <li>Policies</li>
          <li>Contact us</li>
        </ul>

        <GetTheApp>
          <h3>Coming soon</h3>
          <div>
            <FaGooglePlay />
            <FaAppStore />
          </div>
        </GetTheApp>
      </div>
      <Copyright>
        <FaRegCopyright />
        <p>2025 City Store | All rights reserved</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
