import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectReports } from '@features/reports/selectors';
import { getReportById } from '@features/reports/actions';
import { IReportInfo } from '@features/reports/types';

import InputsTable from '../InputsTable';

const EditComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [reportsInfo, setReportsInfo] = useState<IReportInfo | null>(null);
  const { isLoading } = useAppSelector(selectReports);

  useMount(() => {
    dispatch(getReportById(id as string)).unwrap().then((data) => {
      setReportsInfo(data);
    }).catch(() => navigate(PAGE_ROUTES.REPORTS));
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {reportsInfo && <InputsTable reportsInfo={reportsInfo} />}
    </>
  );
};

export default EditComponent;
