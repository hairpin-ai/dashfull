'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OrgNewEditForm from '../org-new-edit-form';

// ----------------------------------------------------------------------

export default function OrgCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new org"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Org',
            href: paths.dashboard.org.root,
          },
          { name: 'New org' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OrgNewEditForm />
    </Container>
  );
}
