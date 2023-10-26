import { memo, useCallback } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { deleteUser, getAllUsers } from '@features/users/actions';
import { selectUsers } from '@features/users/selectors';
import Loader from '@containers/common/Loader';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { formattedDate } from '@utils/helpers';
import { incrementOffset } from '@features/users/slice';
import Typography from '@mui/material/Typography';

import { headCells } from './helpers';
import { StyledTableCell } from './styles';

const UsersTable = () => {
  const dispatch = useAppDispatch();
  const { data: users, isLoading, offset, hasMoreItems } = useAppSelector(selectUsers);
  const deleteAction = useCallback((id: string) => {
    dispatch(deleteUser(id)).unwrap().finally(() => {
      dispatch(incrementOffset());
      dispatch(getAllUsers(offset));
    });
  }, [dispatch, offset]);

  const fetchMoreData = async () => {
    dispatch(getAllUsers(offset));
  };

  if (isLoading) {
    return <Loader />;
  }

  // TODO: delete div
  return (
    <div id="scrollableDiv" style={{ height: 'calc(80vh - 80px)', overflowY: 'scroll' }}>
      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMoreItems}
        scrollableTarget="scrollableDiv"
        loader={<Typography>Loading more users...</Typography>}
      >
        <StyledTable headCells={headCells}>
          { users.map(({ id, email, dateJoined, name }) => (
            <StyledTableRow key={id}>
              <StyledTableCell>{id}</StyledTableCell>
              <StyledTableCell>{name}</StyledTableCell>
              <StyledTableCell>{email}</StyledTableCell>
              <StyledTableCell>{formattedDate(dateJoined)}</StyledTableCell>
              <StyledTableCell>
                <RowTitle title="Edit" path={`/users/edit/${id}`} />
              </StyledTableCell>
              <StyledTableCell>
                <DeleteBtn
                  deleteAction={() => deleteAction(id)}
                  questionText="Are you sure you want to delete this user ?"
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTable>
      </InfiniteScroll>
    </div>
  );
};

export default memo(UsersTable);
