import Loader from '@containers/common/Loader';
import { getAllUsers } from '@features/users/actions';
import useMount from '@customHooks/useMount';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { selectUsers } from '@features/users/selectors';
import EmptyState from '@containers/common/EmptyState';

import InputsTable from '../InputsTable';

const AddComponent = () => {
  const { allUsers, isLoading } = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useMount(() => {
    dispatch(getAllUsers());
  });

  if (isLoading) {
    return <Loader />;
  }

  return (allUsers.length
    ? <InputsTable />
    : <EmptyState text="There is no user. Please add a new one to proceed" />
  );
};

export default AddComponent;
