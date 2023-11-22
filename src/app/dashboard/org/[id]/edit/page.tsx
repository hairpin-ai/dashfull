import { _orgs } from 'src/_mock/_org';

import { OrgEditView } from 'src/sections/org/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Org Edit',
};

type Props = {
  params: {
    id: string;
  };
};

export default function OrgEditPage({ params }: Props) {
  const { id } = params;

  return <OrgEditView id={id} />;
}

export async function generateStaticParams() {
  return _orgs.map((org) => ({
    id: org.id,
  }));
}
