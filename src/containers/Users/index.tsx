import PAGE_ROUTES from '@routes/routingEnum';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import {
  getAllUsers,
} from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import useMount from '@customHooks/useMount';
import PageTitle from '@containers/common/PageTitle';
import EmptyState from '@containers/common/EmptyState';
import Box from '@mui/material/Box';

import UsersTable from './UsersTable';

const Users = () => {
  const dispatch = useAppDispatch();
  const { data: users, isLoading } = useAppSelector(selectUsers);

  // console.log('users.length', users.length, total);

  // // const limit = 2;
  // const [offset, setOffset] = useState(2);
  // // const [hasMoreItems, setHasMoreItems] = useState(users.length < total);
  // const hasMoreItems = true;

  // console.log('hasMoreItems', hasMoreItems);

  // const fetchMoreData = () => {
  //   // const newOffset = offset + limit;

  //   console.log('fetchMoreData');

  //   // setOffset(newOffset);
  //   dispatch(getAllUsers(offset));
  //   // setHasMoreItems(users.length + limit < total);
  // };

  // useMount(() => {
  //   dispatch(getAllUsers(offset));
  // });

  // const [users, setUsers] = useState([]);
  // const [hasMoreItems, setHasMoreItems] = useState(true);
  // const [offset, setOffset] = useState(0);
  // const limit = 2; // Since you've specified a limit of 2.

  useMount(() => {
    dispatch(getAllUsers(0)); // Fetch initial data when the component mounts
  });

  // useEffect(() => {
  //   console.log('offset', offset);
  // }, [offset]);

  // useEffect(() => {
  //   console.log('users', users);
  // }, [users]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box height="400px">
      <PageTitle title="Users" btnName="Add User" path={PAGE_ROUTES.ADD_USER} />
      {users.length ? (
        <UsersTable />
      ) : (
        <EmptyState text="You don’t have any users, please add new to proceed" />
      )}
    </Box>
  );
};

export default Users;
