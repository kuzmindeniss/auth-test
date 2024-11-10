import { Grid2 as Grid } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid container height='100vh' spacing={2} alignItems='center' justifyContent='center'>
      <Grid size={6}>
        <Outlet />
      </Grid>
    </Grid>
  )
};
