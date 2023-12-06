import { m } from 'framer-motion';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _orgs } from 'src/_mock/_org';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// import { IOrgItem } from 'src/types/org';

// ----------------------------------------------------------------------

export default function OrganizationPopover() {
  const popover = usePopover();

  return (
    <>
      <Button
        variant="contained"
        endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
        fullWidth
        // color="primary"
        component={m.button}
        whileTap="tap"
        onClick={popover.onOpen}
        sx={{
          justifyContent: 'space-between',
        }}
      >
        {_orgs[1].title}
      </Button>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-center"
        sx={{ width: 247, mt: 2 }}
      >
        <Box sx={{ p: 1 }}>
          <Button
            variant="outlined"
            endIcon={<Iconify icon="mingcute:add-line" />}
            component={RouterLink}
            href={paths.dashboard.org.new}
            onClick={popover.onClose}
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            {' '}
            Add Organization{' '}
          </Button>
        </Box>

        <Scrollbar sx={{ maxHeight: 320, pb: 2 }}>
          {_orgs.map((org) => (
            <MenuItem
              key={org.id}
              sx={{ p: 1.5 }}
              component={RouterLink}
              href={paths.dashboard.org.details(org.id)}
            >
              <ListItemText primary={org.title} />
            </MenuItem>
          ))}
        </Scrollbar>
      </CustomPopover>
    </>
  );
}
