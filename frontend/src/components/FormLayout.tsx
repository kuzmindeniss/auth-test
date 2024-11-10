import { Box, FormGroup, Typography } from '@mui/material';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface FormLayoutProps extends PropsWithChildren {
  title: string;
  actions: ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = ({ title, actions, children }) => {
  return (
    <Box>
      <Typography variant='h4' align='center' mb={4}>{title}</Typography>
      <FormGroup sx={{ gap: 4, mb: 4 }}>
        {children}
      </FormGroup>
      {actions}
    </Box>
  )
};
