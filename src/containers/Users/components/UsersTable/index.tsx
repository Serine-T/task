import { memo, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import StyledTable from '@containers/common/Table';
import { useAppSelector } from '@features/app/hooks';
import { getAllUsersPagination } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useDispatchWithErrorHandler from '@customHooks/useDispatchWithErrorHandler';

import { headCells } from './helpers';
import UserReports from '../UserModal';
import TableRow from './TableRow';

const UsersTable = () => {
  const dispatch = useDispatchWithErrorHandler();
  const { data: users, isLoading, offset, hasMoreItems } = useAppSelector(selectUsers);
  const [open, setOpen] = useState(false);

  const fetchMoreData = async () => {
    dispatch(getAllUsersPagination(offset));
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box id="scrollableDiv" style={{ height: '600px', overflowY: 'scroll' }}>
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreData}
          hasMore={hasMoreItems}
          scrollableTarget="scrollableDiv"
          loader={<Typography>Loading more users...</Typography>}
        >
          <StyledTable headCells={headCells}>
            { users.map((item) => (
              <TableRow key={item.id} {...item} setOpen={setOpen} />
            ))}
          </StyledTable>
        </InfiniteScroll>
      </Box>
      { open && <UserReports open={open} handleClose={handleClose} />}
    </>
  );
};

export default memo(UsersTable);
