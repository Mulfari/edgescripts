import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => (
  <nav className="flex text-gray-700 text-sm mb-4" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      <li className="inline-flex items-center">
        <Link to="/" className="inline-flex items-center text-gray-700 hover:text-gray-900">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 20l-6-6h4V9a2 2 0 012-2h2a2 2 0 012 2v5h4l-6 6zM5 8h10a1 1 0 00.8-1.6L11.2.8a1 1 0 00-1.4 0L4.2 6.4A1 1 0 005 8z" />
          </svg>
          Home
        </Link>
      </li>
      <li>
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <Link to="/products" className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2">
            Products
          </Link>
        </div>
      </li>
      <li aria-current="page">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-1 text-gray-500 md:ml-2">Warzone</span>
        </div>
      </li>
    </ol>
  </nav>
);

export default Breadcrumb;
