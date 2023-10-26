import { memo, useCallback } from 'react';

import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import DeleteBtn from '@containers/common/Table/components/TablesActions/DeleteAction';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import Loader from '@containers/common/Loader';
import RowTitle from '@containers/common/Table/components/RowTitle';
import { formattedDate } from '@utils/helpers';
import { selectReports } from '@features/reports/selectors';
import { deleteReport, getAllReports } from '@features/reports/actions';

import { headCells } from './helpers';
import { StyledTableCell } from './styles';

const ReportsTable = () => {
  const dispatch = useAppDispatch();
  const { data: reports, isLoading } = useAppSelector(selectReports);
  const deleteAction = useCallback((id: string) => {
    dispatch(deleteReport(id)).unwrap().finally(() => {
      dispatch(getAllReports());
    });
  }, [dispatch]);

  console.log('reports', reports);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <StyledTable headCells={headCells}>
      { reports.map(({ id, title, dateCreated, userId }) => (
        <StyledTableRow key={id}>
          <StyledTableCell>{id}</StyledTableCell>
          <StyledTableCell>{title}</StyledTableCell>
          <StyledTableCell>{userId}</StyledTableCell>
          <StyledTableCell>{formattedDate(dateCreated)}</StyledTableCell>
          <StyledTableCell>
            <RowTitle title="Edit" path={`/reports/edit/${id}`} />
          </StyledTableCell>
          <StyledTableCell>
            <DeleteBtn deleteAction={() => deleteAction(id)} />
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </StyledTable>
  );
};

export default memo(ReportsTable);
