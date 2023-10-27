import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { StyledUnderLinedText } from '@containers/common/StyledTypography/styled';

interface IEditBtn {
  title: string;
  path: string;
}

const EditBtn = ({ title, path }: IEditBtn) => {
  const navigate = useNavigate();
  const handleEdit = () => navigate(path);

  return (
    <StyledUnderLinedText
      onClick={handleEdit}
      variant="body3"
    >
      {title}
    </StyledUnderLinedText>
  );
};

export default memo(EditBtn);
