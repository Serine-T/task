import { memo } from 'react';

import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TableCell from '@mui/material/TableCell';
import StyledTable from '@containers/common/Table';
import { StyledTableRow } from '@containers/common/Table/styled';
import Checkbox from '@containers/common/Checkbox';
import { StyledStack, StyledTableCell } from '@containers/common/StyledAddEditTables/styled';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import { addUser, editUser } from '@features/users/actions';
import PAGE_ROUTES from '@routes/routingEnum';
import { IUserInfo } from '@features/users/types';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import { selectUsers } from '@features/users/selectors';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';

import {
  AddUserSchema,
  IAddUserForm,
  checkboxRows,
  inputsRows,
  defaultValues,
  formattingPayload,
  formattingDefaultValue,
  EditUserSchema,
} from './helpers';

interface IInputsTable {
  userInfo?: IUserInfo;
}

const InputsTable = ({ userInfo }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectUsers);
  const ValidationSchema = userInfo ? EditUserSchema : AddUserSchema;
  const methods = useForm<IAddUserForm>({
    resolver: yupResolver(ValidationSchema as any),
    defaultValues: userInfo ? formattingDefaultValue(userInfo) : defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const onSubmit = (data: IAddUserForm) => {
    const payload = formattingPayload(data);

    dispatch(userInfo ? editUser(payload) : addUser(payload)).unwrap().then(() => {
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
              const { label, field } = item;

              return (
                <StyledTableRow key={label}>
                  <StyledTableCell>
                    {`${label}: ${userInfo && field !== 'password' ? '*' : ''}`}
                  </StyledTableCell>
                  <TableCell>
                    <ReusableFields {...item} />
                  </TableCell>
                </StyledTableRow>
              );
            })}
            {checkboxRows.map(({ label, field }) => (
              <StyledTableRow key={label}>
                <StyledTableCell>
                  {`${label}:`}
                </StyledTableCell>
                <TableCell>
                  <Checkbox name={`permissions[${field}]`} />
                </TableCell>
              </StyledTableRow>
            ))}
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
