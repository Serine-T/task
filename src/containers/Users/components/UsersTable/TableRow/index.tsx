import { Dispatch, SetStateAction, memo, useCallback } from 'react';

import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { StyledTableRow } from '@containers/common/Table/styled';
import { useAppDispatch } from '@features/app/hooks';
import { deleteReport, getAllReports } from '@features/reports/actions';
import { formattedDate } from '@utils/helpers';
import { IUserInfo } from '@features/users/types';
import StyledTypography from '@containers/common/StyledTypography';
import { useNavigate } from 'react-router-dom';

import { StyledTableCell } from './styles';

interface ITableRow extends IUserInfo {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TableRow = ({ id, name, email, dateJoined, setOpen }: ITableRow) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteAction = useCallback(() => {
    dispatch(deleteReport(id)).unwrap().then(() => {
      dispatch(getAllReports());
    }).catch(() => {});
  }, [id, dispatch]);

  const handleOpen = () => {
    dispatch(getAllReports(id as string)).unwrap().then((data) => {
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
        <StyledTypography onClick={handleOpen}>
          View reports
        </StyledTypography>
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
