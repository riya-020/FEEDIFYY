import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#343a40',
      color: '#dee2e6',
      padding: '1.5rem 0',
      marginTop: '3rem'
    }}>
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span className="mb-2 mb-md-0" style={{ fontSize: '0.95rem' }}>
          © {new Date().getFullYear()} <strong style={{ color: '#f8f9fa' }}>Feedify</strong>. All rights reserved.
        </span>

        <div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ color: '#adb5bd' }}>
            <FaInstagram size={22} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ color: '#adb5bd' }}>
            <FaLinkedin size={22} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="mx-3" style={{ color: '#adb5bd' }}>
            <FaGithub size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
