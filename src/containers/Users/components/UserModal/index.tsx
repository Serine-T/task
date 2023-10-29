import { memo } from 'react';

import StyledTable from '@containers/common/Table';
import { useAppSelector } from '@features/app/hooks';
import { selectReports } from '@features/reports/selectors';
import TableRow from '@containers/Reports/components/TableRow';
import Modal from '@containers/common/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { headCells } from './helpers';

interface IUserReports {
  open: boolean;
  handleClose: () => void;
}

const UserReports = ({ open, handleClose }: IUserReports) => {
  const { data: reports } = useAppSelector(selectReports);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth="xl"
    >
      <Box p="16px">
        <Typography mb="16px" variant="h4">Reports</Typography>
        <StyledTable headCells={headCells}>
          { reports.map((item) => (
            <TableRow key={item.id} {...item} isUserPage />
          ))}
        </StyledTable>
      </Box>
    </Modal>
  );
};

export default memo(UserReports);
