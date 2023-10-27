import { memo, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import StyledTable from '@containers/common/Table';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { getAllUsersPagination } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import Typography from '@mui/material/Typography';

import { headCells } from './helpers';
import UserReports from '../UserReports';
import TableRow from './TableRow';

const UsersTable = () => {
  const dispatch = useAppDispatch();

  const { data: users, isLoading, offset, hasMoreItems } = useAppSelector(selectUsers);

  const fetchMoreData = async () => {
    dispatch(getAllUsersPagination(offset));
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  // TODO: delete div
  return (
    <>
      <div id="scrollableDiv" style={{ height: '600px', overflowY: 'scroll' }}>
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
      </div>
      { open && <UserReports open={open} handleClose={handleClose} />}
    </>
  );
};

export default memo(UsersTable);
