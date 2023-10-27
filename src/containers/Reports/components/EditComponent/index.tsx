import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectReports } from '@features/reports/selectors';
import { getReportById } from '@features/reports/actions';
import { IReportInfo } from '@features/reports/types';
import { getAllUsers } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from '../InputsTable';

const EditComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [reportsInfo, setReportsInfo] = useState<IReportInfo | null>(null);
  const { isLoading } = useAppSelector(selectReports);
  const { allUsers, isLoading: userLoading } = useAppSelector(selectUsers);

  useMount(() => {
    dispatch(getAllUsers());
    dispatch(getReportById(id as string)).unwrap().then((data) => {
      setReportsInfo(data);
    }).catch(() => navigate(PAGE_ROUTES.REPORTS));
  });

  if (userLoading || isLoading) {
    return <Loader />;
  }

  return (
    allUsers.length ? (
      <>
        {reportsInfo && <InputsTable reportsInfo={reportsInfo} />}
      </>
    ) : <EmptyState text="user" />
  );
};

export default EditComponent;
