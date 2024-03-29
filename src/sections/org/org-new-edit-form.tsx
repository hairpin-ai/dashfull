import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { countries } from 'src/assets/data';
import {
  _roles,
  ORG_SKILL_OPTIONS,
  ORG_BENEFIT_OPTIONS,
  ORG_EXPERIENCE_OPTIONS,
  ORG_EMPLOYMENT_TYPE_OPTIONS,
  ORG_WORKING_SCHEDULE_OPTIONS,
} from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFRadioGroup,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';

import { IOrgItem } from 'src/types/org';

// ----------------------------------------------------------------------

type Props = {
  currentOrg?: IOrgItem;
};

export default function OrgNewEditForm({ currentOrg }: Props) {
  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const NewOrgSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    employmentTypes: Yup.array().min(1, 'Choose at least one option'),
    role: Yup.string().required('Role is required'),
    skills: Yup.array().min(1, 'Choose at least one option'),
    workingSchedule: Yup.array().min(1, 'Choose at least one option'),
    benefits: Yup.array().min(1, 'Choose at least one option'),
    locations: Yup.array().min(1, 'Choose at least one option'),
    expiredDate: Yup.mixed<any>().nullable().required('Expired date is required'),
    salary: Yup.object().shape({
      type: Yup.string(),
      price: Yup.number().min(1, 'Price is required'),
      negotiable: Yup.boolean(),
    }),
    experience: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentOrg?.title || '',
      content: currentOrg?.content || '',
      employmentTypes: currentOrg?.employmentTypes || [],
      experience: currentOrg?.experience || '1 year exp',
      role: currentOrg?.role || _roles[1],
      skills: currentOrg?.skills || [],
      workingSchedule: currentOrg?.workingSchedule || [],
      locations: currentOrg?.locations || [],
      benefits: currentOrg?.benefits || [],
      expiredDate: currentOrg?.expiredDate || null,
      salary: currentOrg?.salary || {
        type: 'Hourly',
        price: 0,
        negotiable: false,
      },
    }),
    [currentOrg]
  );

  const methods = useForm({
    resolver: yupResolver(NewOrgSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentOrg) {
      reset(defaultValues);
    }
  }, [currentOrg, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentOrg ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.org.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Name</Typography>
              <RHFTextField name="title" placeholder="Ex: Software Engineer..." />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Employment type</Typography>
              <RHFMultiCheckbox
                row
                spacing={4}
                name="employmentTypes"
                options={ORG_EMPLOYMENT_TYPE_OPTIONS}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Experience</Typography>
              <RHFRadioGroup row spacing={4} name="experience" options={ORG_EXPERIENCE_OPTIONS} />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Role</Typography>
              <RHFAutocomplete
                name="role"
                autoHighlight
                options={_roles.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Skills</Typography>
              <RHFAutocomplete
                name="skills"
                placeholder="+ Skills"
                multiple
                disableCloseOnSelect
                options={ORG_SKILL_OPTIONS.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Working schedule</Typography>
              <RHFAutocomplete
                name="workingSchedule"
                placeholder="+ Schedule"
                multiple
                disableCloseOnSelect
                options={ORG_WORKING_SCHEDULE_OPTIONS.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Locations</Typography>
              <RHFAutocomplete
                name="locations"
                placeholder="+ Locations"
                multiple
                disableCloseOnSelect
                options={countries.map((option) => option.label)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Expired</Typography>
              <Controller
                name="expiredDate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    {...field}
                    format="dd/MM/yyyy"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle2">Salary</Typography>

              <Controller
                name="salary.type"
                control={control}
                render={({ field }) => (
                  <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
                    {[
                      {
                        label: 'Hourly',
                        icon: <Iconify icon="solar:clock-circle-bold" width={32} sx={{ mb: 2 }} />,
                      },
                      {
                        label: 'Custom',
                        icon: <Iconify icon="solar:wad-of-money-bold" width={32} sx={{ mb: 2 }} />,
                      },
                    ].map((item) => (
                      <Paper
                        component={ButtonBase}
                        variant="outlined"
                        key={item.label}
                        onClick={() => field.onChange(item.label)}
                        sx={{
                          p: 2.5,
                          borderRadius: 1,
                          typography: 'subtitle2',
                          flexDirection: 'column',
                          ...(item.label === field.value && {
                            borderWidth: 2,
                            borderColor: 'text.primary',
                          }),
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Paper>
                    ))}
                  </Box>
                )}
              />

              <RHFTextField
                name="salary.price"
                placeholder="0.00"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFSwitch name="salary.negotiable" label="Salary is negotiable" />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">Benefits</Typography>
              <RHFMultiCheckbox
                name="benefits"
                options={ORG_BENEFIT_OPTIONS}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentOrg ? 'Create Org' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}
