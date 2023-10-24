import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import { StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { addUser, editUser } from '@features/users/actions';
import PAGE_ROUTES from '@routes/routingEnum';
import { IUserInfo } from '@features/users/types';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { selectUsers } from '@features/users/selectors';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';

import { IAddForm, AddSchema, inputsRows, defaultValues } from './helpers';

interface IInputsTable {
  userInfo?: IUserInfo;
}

const InputsTable = ({ userInfo }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectUsers);
  const methods = useForm<IAddForm>({
    resolver: yupResolver(AddSchema as any),
    defaultValues: userInfo || defaultValues,
  });

  const { handleSubmit, setError } = methods;

  const onSubmit = (data: IAddForm) => {
    dispatch(userInfo ? editUser(data) : addUser(data)).unwrap().then(() => {
      navigate(PAGE_ROUTES.USERS);
    }).catch((e) => {
      if (e.message === 'User does not exist!') {
        navigate(PAGE_ROUTES.USERS);
      } else {
        setError('email', { message: e.message });
      }
    });
  };

  return (
    <TitlesWithBackButton title={userInfo ? 'Edit User' : 'Add User'} path="USERS">
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="USER INFO" colSpan={2}>
            {inputsRows.map((item) => {
              const { label } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>
                    {label}
                  </StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
