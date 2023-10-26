import { memo } from 'react';

import { useConfirm } from 'material-ui-confirm';

import StyledTypography from '../../../../StyledTypography';
import confirmOptionsDialog from '../../../../Confirm';

interface IDeleteAction {
  deleteAction: ()=> void;
}

const DeleteBtn = ({ deleteAction }: IDeleteAction) => {
  const confirm = useConfirm();
  const handleDelete = async () => {
    try {
      await confirm(confirmOptionsDialog({ questionText: 'Are you sure you want to delete this item ?' }));
      await deleteAction();
    } catch { }
  };

  return (
    <StyledTypography
      aria-disabled
      onClick={handleDelete}
      color="blue"
      cursor="pointer"
      variant="body3"
      underLine
    >
      Delete
    </StyledTypography>
  );
};

export default memo(DeleteBtn);
