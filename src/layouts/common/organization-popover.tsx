import { m } from 'framer-motion';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { _orgs } from 'src/_mock/_org';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function OrganizationPopover() {
  const popover = usePopover();

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<Iconify icon="ri:arrow-drop-down-line" />}
        size="large"
        fullWidth
        color="primary"
        component={m.button}
        whileTap="tap"
        onClick={popover.onOpen}
        sx={{
          ...(popover.open && {
            bgcolor: (theme) => theme.palette.action.selected,
          }),

          justifyContent: 'space-between',
        }}
      >
        {_orgs[1].name}
      </Button>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-center"
        sx={{ width: 247, mt: 2 }}
      >
        <Box sx={{ p: 1 }}>
          <Button
            variant="contained"
            endIcon={<Iconify icon="ri:add-box-fill" />}
            color="primary"
            onClick={popover.onClose}
            sx={{ width: '100%', justifyContent: 'space-between' }}
          >
            {' '}
            ADD ORGANIZATION{' '}
          </Button>
        </Box>

        <Scrollbar sx={{ height: 320 }}>
          {_orgs.map((org) => (
            <MenuItem key={org.id} sx={{ p: 1.5 }}>
              <ListItemText
                primary={org.name}
                primaryTypographyProps={{ typography: 'subtitle2' }}
                secondaryTypographyProps={{
                  typography: 'caption',
                  color: 'text.disabled',
                }}
              />
            </MenuItem>
          ))}
        </Scrollbar>
      </CustomPopover>
    </>
  );
}
