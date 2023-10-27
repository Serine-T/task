import { memo } from 'react';

import StyledTable from '@containers/common/Table';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import { selectReports } from '@features/reports/selectors';
import { getAllReports } from '@features/reports/actions';
import { useParams } from 'react-router-dom';
import { selectUsers } from '@features/users/selectors';
import EmptyState from '@containers/common/EmptyState';
import TableRow from '@containers/Reports/components/TableRow';
import useMount from '@customHooks/useMount';

import { headCells } from './helpers';

const UserReports = () => {
  const dispatch = useAppDispatch();
  const { data: reports, isLoading } = useAppSelector(selectReports);
  const { isLoading: usersLoading } = useAppSelector(selectUsers);

  const { id } = useParams();

  useMount(() => {
    dispatch(getAllReports(id as string));
  });

  if (isLoading || usersLoading) {
    return <Loader />;
  }

  return (
    <>
      {reports.length ? (
        <StyledTable headCells={headCells}>
          { reports.map((item) => (
            <TableRow key={item.id} {...item} isUserPage />
          ))}
        </StyledTable>
      ) : (
        <EmptyState text="The user doesn't have any reports." />
      )}
    </>
  );
};

export default memo(UserReports);
