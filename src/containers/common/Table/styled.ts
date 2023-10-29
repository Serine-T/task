import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  boxShadow: 'none',
  border: `1px solid ${theme.palette.grey[500]}`,
  borderRadius: 0,
  overflowX: 'auto',
  width: '100%',
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  th: {
    background: theme.palette.grey[700],
    fontWeight: 500,

    '.MuiTypography-body1': {
      textTransform: 'uppercase',
    },
  },
  'td, th': {
    borderRight: `1px solid ${theme.palette.grey[500]}`,
    fontSize: '12px',
    padding: '20px 16px',
  },
  'th:last-child, td:last-child': {
    borderRight: 0,
  },

  '&:last-child td': {
    borderBottom: 0,
  },
}));

export const StyledMuiTable = styled(Table)(() => ({
  boxShadow: 'none',
  minWidth: '432px',
}));

export const StyledTableCell = styled(TableCell)(() => ({
  width: '193px',
}));
