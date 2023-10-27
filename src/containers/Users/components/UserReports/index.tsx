import { memo } from 'react';

import StyledTable from '@containers/common/Table';
import { useAppSelector } from '@features/app/hooks';
import { selectReports } from '@features/reports/selectors';
import TableRow from '@containers/Reports/components/TableRow';
import Modal from '@containers/common/Modal';
import Box from '@mui/material/Box';

import { headCells } from './helpers';

const UserReports = ({ open, handleClose }: any) => {
  const { data: reports } = useAppSelector(selectReports);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      fullWidth
      maxWidth="xl"
    >
      <Box p="16px">
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
