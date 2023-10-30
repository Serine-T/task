import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllUsersPagination } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import useUnMount from '@customHooks/useUnMount';
import { resetUsers } from '@features/users/slice';
import useErrorHandler from '@customHooks/useErrorHandler';

import UsersTable from './components/UsersTable';

const Users = () => {
  const dispatch = useAppDispatch();
  const handleError = useErrorHandler();

  const { data: users, isLoading } = useAppSelector(selectUsers);

  useMount(() => {
    dispatch(getAllUsersPagination(0)).unwrap().catch((e) => {
      handleError(e.message);
    });
  });

  useUnMount(() => {
    dispatch(resetUsers());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <PageTitle title="Users" btnName="Add User" path={PAGE_ROUTES.ADD_USER} />
      {users.length ? (
        <UsersTable />
      ) : (
        <EmptyState text="There is no user. Please add a new one to proceed" />
      )}
    </>
  );
};

export default Users;
