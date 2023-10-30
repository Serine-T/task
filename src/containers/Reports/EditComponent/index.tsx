import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import { selectReports } from '@features/reports/selectors';
import { getReportById } from '@features/reports/actions';
import { IReportInfo } from '@features/reports/types';
import { getAllUsers } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import EmptyState from '@containers/common/EmptyState';
import useErrorHandler from '@customHooks/useErrorHandler';

import InputsTable from '../components/AddTable';

const EditComponent = () => {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const [reportsInfo, setReportsInfo] = useState<IReportInfo | null>(null);
  const { isLoading } = useAppSelector(selectReports);
  const { allUsers, isLoading: userLoading } = useAppSelector(selectUsers);
  const handleError = useErrorHandler();

  useMount(() => {
    dispatch(getAllUsers());
    dispatch(getReportById(id)).unwrap().then((data) => {
      setReportsInfo(data);
    }).catch((e) => {
      handleError(e.message);
    });
  });

  if (userLoading || isLoading) {
    return <Loader />;
  }

  return (
    allUsers.length ? (
      <>
        {reportsInfo && <InputsTable reportsInfo={reportsInfo} />}
      </>
    ) : <EmptyState text="There is no user. Please add a new one to proceed" />
  );
};

export default EditComponent;
