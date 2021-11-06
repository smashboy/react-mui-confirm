import React from 'react';
import Head from 'next/head';
import { useConfirmDialog } from '../../dist';
import { Button } from '@mui/material';

const Home = () => {
  const confirm = useConfirmDialog();

  const handleSimpleConfirm = () =>
    confirm({
      title: 'Are you sure you want to confirm this thingy?',
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
      confirmTextFieldProps: {
        variant: 'outlined',
        color: 'primary',
        size: 'small',
      },
      cancelButtonProps: {
        color: 'inherit',
      },
    });

  const handleConfirmTimer = () =>
    confirm({
      title: 'Auto close alert',
      timer: 10000,
      dialogProps: {
        maxWidth: 'sm',
        fullWidth: true,
      },
    });

  const simulateFetch = (rejectFetch?: boolean): Promise<string> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        rejectFetch ? reject() : resolve('thingy');
      }, 2000);
    });

  const handleFetchOnConfirm = () =>
    confirm({
      title: 'Are you sure you want to fetch this thingy?',
      onConfirm: async () => {
        const res = await simulateFetch();
        console.log(res)
      },
      cancelButtonProps: {
        color: 'inherit',
      },
    });

  const simulateRejectedFetch = async () => {
    try {
      await confirm({
        title: 'Are you sure you want to fetch this thingy?',
        onConfirm: async () => {
          await simulateFetch(true);
        },
        rejectOnCancel: true,
        cancelButtonProps: {
          color: 'inherit',
        },
      });
    } catch (error) {
      console.error('ERROR HANDLER', error);
    }
  };

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
      <Button onClick={handleConfirmTimer} variant="contained">
        Auto close timer
      </Button>
      <Button onClick={handleFetchOnConfirm} variant="contained">
        Confirm fetch
      </Button>
      <Button onClick={simulateRejectedFetch} variant="contained">
        Handle fetch error
      </Button>
    </div>
  );
};

export default Home;
