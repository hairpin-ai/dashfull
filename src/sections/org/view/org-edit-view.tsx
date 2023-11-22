'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _orgs } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OrgNewEditForm from '../org-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function OrgEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentOrg = _orgs.find((org) => org.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Org',
            href: paths.dashboard.org.root,
          },
          { name: currentOrg?.title },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OrgNewEditForm currentOrg={currentOrg} />
    </Container>
  );
}
