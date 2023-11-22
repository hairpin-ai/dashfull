// ----------------------------------------------------------------------

export type IOrgFilterValue = string | string[];

export type IOrgFilters = {
  roles: string[];
  experience: string;
  locations: string[];
  benefits: string[];
  employmentTypes: string[];
};

// ----------------------------------------------------------------------

export type IOrgCandidate = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IOrgCompany = {
  name: string;
  logo: string;
  phoneNumber: string;
  fullAddress: string;
};

export type IOrgSalary = {
  type: string;
  price: number;
  negotiable: boolean;
};

export type IOrgItem = {
  id: string;
  role: string;
  name: string;
  content: string;
  publish: string;
  createdAt: Date;
  skills: string[];
  expiredDate: Date;
  totalViews: number;
  experience: string;
  salary: IOrgSalary;
  benefits: string[];
  locations: string[];
  company: IOrgCompany;
  employmentTypes: string[];
  workingSchedule: string[];
  candidates: IOrgCandidate[];
};
