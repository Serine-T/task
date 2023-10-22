import { memo } from 'react';

import { useConfirm } from 'material-ui-confirm';

import StyledTypography from '../../../../StyledTypography';
import confirmOptionsDialog from '../../../../Confirm';

interface IDeleteAction {
  questionText: string;
  deleteAction: ()=> void;
}

const DeleteBtn = ({ questionText, deleteAction }: IDeleteAction) => {
  const confirm = useConfirm();
  const handleDelete = async () => {
    try {
      await confirm(confirmOptionsDialog({ questionText }));
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
    >
      Delete
    </StyledTypography>
  );
};

export default memo(DeleteBtn);
