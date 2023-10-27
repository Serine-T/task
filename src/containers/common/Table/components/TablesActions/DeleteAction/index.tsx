import { memo } from 'react';

import { useConfirm } from 'material-ui-confirm';
import { StyledUnderLinedText } from '@containers/common/StyledTypography/styled';

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
    <StyledUnderLinedText
      aria-disabled
      onClick={handleDelete}
      variant="body3"
    >
      Delete
    </StyledUnderLinedText>
  );
};

export default memo(DeleteBtn);
