import { memo, useCallback } from 'react';

import DeleteBtn from '@containers/common/Table/components/DeleteBtn';
import RowTitle from '@containers/common/Table/components/EditBtn';
import { StyledTableCell, StyledTableRow } from '@containers/common/Table/styled';
import { useAppDispatch } from '@features/app/hooks';
import { deleteReport, getAllReports } from '@features/reports/actions';
import { formattedDate } from '@utils/helpers';
import { IReportInfo } from '@features/reports/types';

interface ITableRow extends IReportInfo {
  isUserPage?: boolean;
}

const TableRow = ({ id, title, userId, dateCreated, isUserPage = false }: ITableRow) => {
  const dispatch = useAppDispatch();
  const deleteAction = useCallback(() => {
    dispatch(deleteReport(id)).unwrap().then(() => {
      dispatch(getAllReports());
    }).catch(() => {});
  }, [id, dispatch]);

  return (
    <StyledTableRow>
      <StyledTableCell>{id}</StyledTableCell>
      <StyledTableCell>{title}</StyledTableCell>
      <StyledTableCell>{userId}</StyledTableCell>
      <StyledTableCell>{formattedDate(dateCreated)}</StyledTableCell>
      { !isUserPage && (
      <StyledTableCell>
        <RowTitle title="Edit" path={`/reports/edit/${id}`} />
      </StyledTableCell>
      )}
      { !isUserPage && (
      <StyledTableCell>
        <DeleteBtn deleteAction={deleteAction} />
      </StyledTableCell>
      )}
    </StyledTableRow>
  );
};

export default memo(TableRow);
