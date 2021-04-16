import React from 'react';
import Head from 'next/head';
import { useConfirmDialog } from '../../dist';

const Home = () => {
  useConfirmDialog();

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Home;
