/* eslint-disable @next/next/no-img-element */
import React from "react";

import Link from "next/link";
import { footerLinks, socialLinks } from "@/app/lib/constants";

const Footer = () => {
  return (
    <footer className="mt-8 footer footer-center rounded p-6 bg-neutral text-neutral-content">
      <nav className="grid grid-flow-col gap-4">
        {footerLinks.map((link, idx) => {
          return (
            <Link
              key={idx}
              href={link.url}
              className="no-underline link link:hover text-sm"
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          {socialLinks.map((link, idx) => {
            return (
              <Link key={idx} href={link.url}>
                <img src={link.icon} alt={link.title} width={32} height={32} />
              </Link>
            );
          })}
        </div>
      </nav>
      <aside>
        <p>&copy; 2024, All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
