import { useState } from 'react';

import { useAppSelector } from '@features/app/hooks';
import { useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import { selectUsers } from '@features/users/selectors';
import { getUserById } from '@features/users/actions';
import { IUserInfo } from '@features/users/types';
import useDispatchWithErrorHandler from '@customHooks/useDispatchWithErrorHandler';

import InputsTable from '../components/AddTable';

const EditComponent = () => {
  const dispatch = useDispatchWithErrorHandler();
  const { id = '' } = useParams();

  const [usersInfo, setUsersInfo] = useState<IUserInfo | null>(null);
  const { isLoading } = useAppSelector(selectUsers);

  useMount(() => {
    dispatch(getUserById(id)).then((data) => {
      setUsersInfo(data);
    });
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {usersInfo && (
      <InputsTable usersInfo={usersInfo} />
      )}
    </>
  );
};

export default EditComponent;
