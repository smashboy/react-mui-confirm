import React from 'react';
import Head from 'next/head';
import { useConfirmDialog } from '../../dist';
import { Button } from '@material-ui/core';

const Home = () => {
  const confirm = useConfirmDialog();

  const handleSimpleConfirm = () =>
    confirm({
      title: 'Are you sure you want to confirm this thingy?',
      disableRejectOnCancel: true,
    });

  const handleConfirmText = () =>
    confirm({
      title: 'Are you sure you want to delete your thingy?',
      description: (
        <>
          Please type <b>THINGY</b> to confirm.
        </>
      ),
      confirmText: 'THINGY',
      disableRejectOnCancel: true,
      confirmTextFieldProps: {
        variant: 'outlined',
        color: 'primary',
        size: 'small',
      },
    });

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={handleSimpleConfirm} variant="contained">
        Simple confirm
      </Button>
      <Button onClick={handleConfirmText} variant="contained">
        Confirm input
      </Button>
    </div>
  );
};

export default Home;
