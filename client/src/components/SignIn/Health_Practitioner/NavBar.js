import * as React from 'react';
import {Link, Breadcrumbs} from '@mui/material';

function NavBar() {
  return (
    <nav className="nav">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="#819672" href="/">
          Home
        </Link>
        <Link underline="hover" color="#819672" href="/about">
          About
        </Link>
        <Link underline="hover" color="#819672" href="/services">
          Services
        </Link>
        <Link underline="hover" color="#819672" href="/contact">
          Contact
        </Link>
      </Breadcrumbs>
    </nav>
  );
}

export default NavBar;
