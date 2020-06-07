import React from 'react';

import classes from './Layout.module.scss';

const Layout = (props) => {
  return (
    <>
      <div className={classes.Background}></div>
      {props.children}
    </>
  );
};

export default Layout;
