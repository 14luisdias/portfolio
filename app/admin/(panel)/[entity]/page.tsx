import { notFound } from 'next/navigation';
import { getEntityConfig } from '@/lib/admin-config';
import { fetchEntityList } from '@/lib/admin-data';
import AdminList from '@/components/admin/AdminList';

export const dynamic = 'force-dynamic';

export default async function EntityListPage({ params }: { params: { entity: string } }) {
  const config = getEntityConfig(params.entity);
  if (!config) notFound();

  const items = await fetchEntityList(params.entity);
  return <AdminList config={config} items={items} />;
}
