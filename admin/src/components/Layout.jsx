import React from 'react';
import Header from './Header';

const Layout = ({ children, heading }) => {
  return (
    <div>
      <Header heading={heading} />
      {children}
    </div>
  );
};

export default Layout;
