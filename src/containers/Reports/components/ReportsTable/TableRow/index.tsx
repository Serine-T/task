import { memo, useCallback } from 'react';

import { StyledTableRow } from '@containers/common/Table/styled';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { formattedDate } from '@utils/helpers';
import { IReportInfo } from '@features/reports/types';
import { useAppDispatch } from '@features/app/hooks';
import { deleteReport, getAllReports } from '@features/reports/actions';

import { StyledTableCell } from '../styles';

const TableRow = ({ id, title, userId, dateCreated }: IReportInfo) => {
  const dispatch = useAppDispatch();
  const deleteAction = useCallback(() => {
    dispatch(deleteReport(id)).unwrap().finally(() => {
      dispatch(getAllReports());
    });
  }, [dispatch, id]);

  return (
    <StyledTableRow key={id}>
      <StyledTableCell>{id}</StyledTableCell>
      <StyledTableCell>{title}</StyledTableCell>
      <StyledTableCell>{userId}</StyledTableCell>
      <StyledTableCell>{formattedDate(dateCreated)}</StyledTableCell>
      <StyledTableCell>
        <RowTitle title="Edit" path={`/reports/edit/${id}`} />
      </StyledTableCell>
      <StyledTableCell>
        <DeleteBtn deleteAction={deleteAction} />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default memo(TableRow);
