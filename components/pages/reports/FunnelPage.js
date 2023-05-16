import { useMutation } from '@tanstack/react-query';
import Page from 'components/layout/Page';
import PageHeader from 'components/layout/PageHeader';
import useApi from 'hooks/useApi';
import { useState } from 'react';
import FunnelChart from './FunnelChart';
import FunnelTable from './FunnelTable';
import FunnelForm from './FunnelForm';
import styles from './FunnelPage.module.css';

export default function FunnelPage() {
  const { post } = useApi();
  const { mutate, error, isLoading } = useMutation(data => post('/reports/funnel', data));
  const [data, setData] = useState();
  const [formData, setFormData] = useState();

  function handleOnSearch(data) {
    setFormData(data);

    mutate(data, {
      onSuccess: async data => {
        setData(data);
      },
    });
  }

  return (
    <Page>
      <PageHeader title="Funnel Report"></PageHeader>
      <FunnelChart data={data} />
      <FunnelTable data={data} />
      <div>
        <h2>Filters</h2>
        <FunnelForm onSearch={handleOnSearch} />
      </div>
    </Page>
  );
}