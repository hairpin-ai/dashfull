import { _orgs } from 'src/_mock/_org';

import { OrgDetailsView } from 'src/sections/org/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Org Details',
};

type Props = {
  params: {
    id: string;
  };
};

export default function OrgDetailsPage({ params }: Props) {
  const { id } = params;

  return <OrgDetailsView id={id} />;
}

export async function generateStaticParams() {
  return _orgs.map((org) => ({
    id: org.id,
  }));
}
