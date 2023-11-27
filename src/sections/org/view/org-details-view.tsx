'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _orgs, ORG_DETAILS_TABS, ORG_PUBLISH_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';

import OrgDetailsTeams from '../org-details-teams';
import OrgDetailsToolbar from '../org-details-toolbar';
import OrgDetailsContent from '../org-details-content';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function OrgDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentOrg = _orgs.filter((org) => org.id === id)[0];

  const [publish, setPublish] = useState(currentOrg?.publish);

  const [currentTab, setCurrentTab] = useState('content');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {ORG_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'teams' ? <Label variant="filled">{currentOrg?.teams.length}</Label> : ''
          }
        />
      ))}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <OrgDetailsToolbar
        backLink={paths.dashboard.org.root}
        editLink={paths.dashboard.org.edit(`${currentOrg?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={ORG_PUBLISH_OPTIONS}
      />
      {renderTabs}

      {currentTab === 'content' && <OrgDetailsContent org={currentOrg} />}

      {currentTab === 'teams' && <OrgDetailsTeams teams={currentOrg?.teams} />}
    </Container>
  );
}
