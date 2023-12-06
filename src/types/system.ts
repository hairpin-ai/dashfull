// ----------------------------------------------------------------------

export type ISystemTableFilterValue = string | string[] | Date | null;

export type ISystemTableFilters = {
  id: string;
  status: string;
  systemTitle: string;
  systemNumber: number;
  createDate: Date;
};

// ----------------------------------------------------------------------

export type ISystem = {
  id: string;
  status: string;
  systemTitle: string;
  systemNumber: number;
  createDate: Date;
};
