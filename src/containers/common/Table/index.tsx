import { ReactNode, memo } from 'react';

import { TableProps } from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { StyledMuiTable, StyledTableContainer, StyledTableRow } from './styled';
import { ITableHeadCell } from './helpers';

interface IStyledTable extends TableProps {
  headCells?: ITableHeadCell[];
  children: ReactNode;
  tableTitle?: string;
  colSpan?: number;
 }

const StyledTable = ({ headCells, children, tableTitle, colSpan }: IStyledTable) => {
  return (
    <>
      <StyledTableContainer>
        <StyledMuiTable>
          <TableHead>
            <StyledTableRow>
              {
                tableTitle ? (
                  <TableCell colSpan={colSpan}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>
                        {tableTitle}
                      </Typography>
                    </Stack>
                  </TableCell>
                )
                  : (headCells?.map((props) => {
                    const { label } = props;

                    return (
                      <TableCell key={label} {...props}>
                        <Typography textTransform="uppercase">
                          {label}
                        </Typography>
                      </TableCell>
                    );
                  }))
                }
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {children}
          </TableBody>
        </StyledMuiTable>
      </StyledTableContainer>
    </>
  );
};

export default memo(StyledTable);
