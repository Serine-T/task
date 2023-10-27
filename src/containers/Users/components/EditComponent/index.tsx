import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import useMount from '@customHooks/useMount';
import Loader from '@containers/common/Loader';
import PAGE_ROUTES from '@routes/routingEnum';
import { selectUsers } from '@features/users/selectors';
import { getUserById } from '@features/users/actions';
import { IUserInfo } from '@features/users/types';

import InputsTable from '../InputsTable';

const EditComponent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [usersInfo, setUsersInfo] = useState<IUserInfo | null>(null);
  const { isLoading } = useAppSelector(selectUsers);

  useMount(() => {
    dispatch(getUserById(id as string)).unwrap().then((data) => {
      setUsersInfo(data);
    }).catch(() => navigate(PAGE_ROUTES.USERS));
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
