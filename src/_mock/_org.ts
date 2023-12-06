import { subDays } from 'date-fns';

import { countries } from 'src/assets/data';

import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const ORG_DETAILS_TABS = [
  { value: 'content', label: 'org Content' },
  { value: 'teams', label: 'Teams' },
];

export const ORG_SKILL_OPTIONS = [
  'UI',
  'UX',
  'Html',
  'JavaScript',
  'TypeScript',
  'Communication',
  'Problem Solving',
  'Leadership',
  'Time Management',
  'Adaptability',
  'Collaboration',
  'Creativity',
  'Critical Thinking',
  'Technical Skills',
  'Customer Service',
  'Project Management',
  'Problem Diagnosis',
];

export const ORG_WORKING_SCHEDULE_OPTIONS = [
  'Monday to Friday',
  'Weekend availability',
  'Day shift',
];

export const ORG_EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'On Demand', label: 'On Demand' },
  { value: 'Negotiable', label: 'Negotiable' },
];

export const ORG_EXPERIENCE_OPTIONS = [
  { value: 'No experience', label: 'No experience' },
  { value: '1 year exp', label: '1 year exp' },
  { value: '2 year exp', label: '2 year exp' },
  { value: '> 3 year exp', label: '> 3 year exp' },
];

export const ORG_BENEFIT_OPTIONS = [
  { value: 'Free parking', label: 'Free parking' },
  { value: 'Bonus commission', label: 'Bonus commission' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Device support', label: 'Device support' },
  { value: 'Health care', label: 'Health care' },
  { value: 'Training', label: 'Training' },
  { value: 'Health Insurance', label: 'Health Insurance' },
  { value: 'Retirement Plans', label: 'Retirement Plans' },
  { value: 'Paid Time Off', label: 'Paid Time Off' },
  { value: 'Flexible Work Schedule', label: 'Flexible Work Schedule' },
];

export const ORG_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const ORG_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

const TEAMS = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

const CONTENT = `
<h6>Organization Description</h6>
<br/>

<p>Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</p>



<br/>
<br/>
`;

export const _orgs = [...Array(3)].map((_, index) => {
  const publish = index % 3 ? 'published' : 'draft';

  const salary = {
    type: (index % 5 && 'Custom') || 'Hourly',
    price: _mock.number.price(index),
    negotiable: _mock.boolean(index),
  };

  const benefits = ORG_BENEFIT_OPTIONS.slice(0, 3).map((option) => option.label);

  const experience =
    ORG_EXPERIENCE_OPTIONS.map((option) => option.label)[index] || ORG_EXPERIENCE_OPTIONS[1].label;

  const employmentTypes = (index % 2 && ['Part-time']) ||
    (index % 3 && ['On Demand']) ||
    (index % 4 && ['Negotiable']) || ['Full-time'];

  const company = {
    name: _mock.companyName(index),
    logo: _mock.image.company(index),
    phoneNumber: _mock.phoneNumber(index),
    fullAddress: _mock.fullAddress(index),
  };

  const org = {
    orgTitle: _mock.orgTitle(index),
    logo: _mock.image.org(index),
    phoneNumber: _mock.phoneNumber(index),
    address: _mock.fullAddress(index),
  };

  const system = {
    systemTitle: _mock.systemTitle(index),
    systemNumber: _mock.systemNumber(index),
    sysytemDescription: _mock.systemDescription(index),
    createDate: subDays(new Date(), index),
  };

  const locations = countries.slice(1, index + 2).map((option) => option.label);

  return {
    id: _mock.id(index),
    org,
    salary,
    publish,
    company,
    benefits,
    locations,
    experience,
    employmentTypes,
    content: CONTENT,
    teams: TEAMS,
    role: _mock.role(index),
    title: _mock.orgTitle(index),
    createdAt: _mock.time(index),
    expiredDate: _mock.time(index),
    skills: ORG_SKILL_OPTIONS.slice(0, 3),
    totalViews: _mock.number.nativeL(index),
    workingSchedule: ORG_WORKING_SCHEDULE_OPTIONS.slice(0, 2),
    fullAddress: _mock.fullAddress(index),
    phoneNumber: _mock.phoneNumber(index),
    system,
  };
});
