import React from 'react';

import classes from './PageNotFound.module.scss';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className={classes.Container}>
      <h1 className={classes.PageTitle}>Page not found :(</h1>
      <p>But here's another knock-knock joke to cheer you up:</p>
      <p className={classes.JokeLine}>- Knock-knock!</p>
      <p className={classes.JokeLine}>- Who's there?</p>
      <p className={classes.JokeLine}>- To</p>
      <p className={classes.JokeLine}>- To who?</p>
      <p className={classes.JokeLine}>- No, it’s to <i>whom</i>!</p>
      <Link to="/" className={classes.Button}>Return home</Link>
    </div>
  );
};

export default PageNotFound;
