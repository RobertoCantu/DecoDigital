import React from 'react'
// Components
import ClientGrid from '../../components/client_info/ClientGrid'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// Material ui
import { Container } from '@mui/material';

// Routes
import { PATH_DASHBOARD } from '../../routes/paths';

// Hooks
import useAuth from '../../hooks/useAuth';


function ClientInfo() {

  const {user} = useAuth();
  return (
    <Container maxWidth={false}>
      <HeaderBreadcrumbs
          heading="Mi información"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            
            { name: user?.nomter}
          ]}
        />
      <ClientGrid />
    </Container>
  )
}

export default ClientInfo