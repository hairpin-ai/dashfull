import { m } from 'framer-motion';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { fToNow } from 'src/utils/format-time';

import { _contacts } from 'src/_mock';

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
        {_contacts[0].name}
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
          {_contacts.map((contact) => (
            <MenuItem key={contact.id} sx={{ p: 1.5 }}>
              {/* <Badge
                variant={contact.status as 'alway' | 'online' | 'busy' | 'offline'}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ mr: 2 }}
              >
                <Avatar alt={contact.name} src={contact.avatarUrl} />
          </Badge> */}

              <ListItemText
                primary={contact.name}
                secondary={contact.status === 'offline' ? fToNow(contact.lastActivity) : ''}
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
