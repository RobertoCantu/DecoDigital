import React from 'react'
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { Container } from '@mui/material';
import { ProductList } from '../../components/Products/ProductList'

// Routes
import { PATH_DASHBOARD } from '../../routes/paths';

function ProductsList() {
  return (
    <Container maxWidth={false}>
      <HeaderBreadcrumbs
          heading="Lista de productos"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            
            { name: 'Lista de productos' }
          ]}
        />
      <ProductList />
    </Container>
  )
}

export default ProductsList;