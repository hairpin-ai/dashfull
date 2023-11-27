'use client';

import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { countries } from 'src/assets/data';
import {
  _orgs,
  _roles,
  ORG_SORT_OPTIONS,
  ORG_BENEFIT_OPTIONS,
  ORG_EXPERIENCE_OPTIONS,
  ORG_EMPLOYMENT_TYPE_OPTIONS,
} from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { IOrgItem, IOrgFilters, IOrgFilterValue } from 'src/types/org';

import OrgList from '../org-list';
import OrgSort from '../org-sort';
import OrgSearch from '../org-search';
import OrgFilters from '../org-filters';
import OrgFiltersResult from '../org-filters-result';

// ----------------------------------------------------------------------

const defaultFilters: IOrgFilters = {
  roles: [],
  locations: [],
  benefits: [],
  experience: 'all',
  employmentTypes: [],
};

// ----------------------------------------------------------------------

export default function OrgListView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const [search, setSearch] = useState<{ query: string; results: IOrgItem[] }>({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: _orgs,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name: string, value: IOrgFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = _orgs.filter(
          (org) => org.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <OrgSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.org.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <OrgFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          locationOptions={countries}
          roleOptions={_roles}
          benefitOptions={ORG_BENEFIT_OPTIONS.map((option) => option.label)}
          experienceOptions={['all', ...ORG_EXPERIENCE_OPTIONS.map((option) => option.label)]}
          employmentTypeOptions={ORG_EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label)}
        />

        <OrgSort sort={sortBy} onSort={handleSortBy} sortOptions={ORG_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <OrgFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Organizations"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Org',
            href: paths.dashboard.org.root,
          },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.org.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            ADD ORGANIZATON
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled title="No Data" sx={{ py: 10 }} />}

      <OrgList orgs={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
}: {
  inputData: IOrgItem[];
  filters: IOrgFilters;
  sortBy: string;
}) => {
  const { employmentTypes, experience, roles, locations, benefits } = filters;

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // FILTERS
  if (employmentTypes.length) {
    inputData = inputData.filter((org) =>
      org.employmentTypes.some((item) => employmentTypes.includes(item))
    );
  }

  if (experience !== 'all') {
    inputData = inputData.filter((org) => org.experience === experience);
  }

  if (roles.length) {
    inputData = inputData.filter((org) => roles.includes(org.role));
  }

  if (locations.length) {
    inputData = inputData.filter((org) => org.locations.some((item) => locations.includes(item)));
  }

  if (benefits.length) {
    inputData = inputData.filter((org) => org.benefits.some((item) => benefits.includes(item)));
  }

  return inputData;
};
