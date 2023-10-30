import { Dispatch, SetStateAction, memo, useCallback } from 'react';

import DeleteBtn from '@containers/common/Table/components/DeleteBtn';
import RowTitle from '@containers/common/Table/components/EditBtn';
import { StyledTableCell, StyledTableRow } from '@containers/common/Table/styled';
import { deleteReport, getAllReports } from '@features/reports/actions';
import { formattedDate } from '@utils/helpers';
import { IUserInfo } from '@features/users/types';
import { useNavigate } from 'react-router-dom';
import { StyledUnderLinedText } from '@containers/common/StyledTypography/styled';
import useDispatchWithErrorHandler from '@customHooks/useDispatchWithErrorHandler';

interface ITableRow extends IUserInfo {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TableRow = ({ id, name, email, dateJoined, setOpen }: ITableRow) => {
  const dispatch = useDispatchWithErrorHandler();
  const navigate = useNavigate();

  const deleteAction = useCallback(() => {
    dispatch(deleteReport(id)).then(() => {
      dispatch(getAllReports());
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleOpen = () => {
    dispatch(getAllReports(id)).then((data) => {
      if (data.length) {
        setOpen(true);
        navigate(`/users?userId=${id}`);
      }
    });
  };

  return (
    <StyledTableRow>
      <StyledTableCell>{id}</StyledTableCell>
      <StyledTableCell>{name}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{formattedDate(dateJoined)}</StyledTableCell>
      <StyledTableCell>
        <StyledUnderLinedText variant="body3" onClick={handleOpen}>
          View reports
        </StyledUnderLinedText>
      </StyledTableCell>
      <StyledTableCell>
        <RowTitle title="Edit" path={`/users/edit/${id}`} />
      </StyledTableCell>
      <StyledTableCell>
        <DeleteBtn deleteAction={deleteAction} />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default memo(TableRow);
