// Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const socialMediaLinks = [
  { href: 'https://facebook.com', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://youtube.com', icon: FaYoutube, label: 'YouTube' },
  { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
];

const SocialMediaLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="text-gray-400 hover:text-white transition duration-300"
  >
    <Icon size={32} />
  </a>
);

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <CompanyInfo />
        <SocialMedia />
      </div>
      <FooterBottom />
    </div>
  </footer>
);

const CompanyInfo = () => (
  <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
    <h2 className="text-3xl font-bold text-center lg:text-left">EdgeScripts</h2>
    <p className="text-gray-400 mt-4 leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
      Los mejores scripts para mejorar tu experiencia de juego.
    </p>
  </div>
);

const SocialMedia = () => (
  <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col items-center lg:items-end">
    <h3 className="text-2xl font-semibold mb-4 text-center lg:text-right">Síguenos</h3>
    <div className="flex space-x-6">
      {socialMediaLinks.map((link, index) => (
        <SocialMediaLink key={index} {...link} />
      ))}
    </div>
  </div>
);

const FooterBottom = () => (
  <div className="mt-12 text-center text-gray-400 border-t border-gray-700 pt-6">
    <p>&copy; {new Date().getFullYear()} EdgeScripts. Todos los derechos reservados.</p>
  </div>
);

export default Footer;
