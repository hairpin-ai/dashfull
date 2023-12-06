import { subDays } from 'date-fns';

import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const SYSTEM_STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft' },
  { value: 'testnet', label: 'Testnet' },
  { value: 'audited', label: 'Auditied' },
  { value: 'deployed', label: 'Deployed' },
];

export const _systems = [...Array(3)].map((_, index) => {
  const status =
    (index % 2 && 'draft') || (index % 3 && 'testnet') || (index % 4 && 'audited') || 'deployed';

  return {
    id: _mock.id(index),
    status: SYSTEM_STATUS_OPTIONS,
    systemTitle: _mock.systemTitle(index),
    systemNumber: _mock.systemNumber(index),
    sysytemDescription: _mock.systemDescription(index),
    createDate: subDays(new Date(), index),
  };
});
