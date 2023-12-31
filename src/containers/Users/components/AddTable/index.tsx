import { memo } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import { useNavigate } from 'react-router-dom';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';
import { IUserInfo } from '@features/users/types';
import { selectUsers } from '@features/users/selectors';
import useDispatchWithErrorHandler from '@customHooks/useDispatchWithErrorHandler';
import { useAppSelector } from '@features/app/hooks';
import { addUser, editUser } from '@features/users/actions';

import { AddDataSchema, IAddDataForm, inputsRows, defaultValues, formattedPayload } from './helpers';

interface IInputsTable{
  usersInfo?: IUserInfo;
}

const InputsTable = ({ usersInfo }: IInputsTable) => {
  const dispatch = useDispatchWithErrorHandler();
  const navigate = useNavigate();

  const { actionLoading } = useAppSelector(selectUsers);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: usersInfo ?? defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattedPayload(data);

    dispatch(usersInfo ? editUser(payload) : addUser(payload)).then(() => {
      navigate(PAGE_ROUTES.USERS);
    });
  };

  return (
    <TitlesWithBackButton
      title={usersInfo ? 'Edit User' : 'Add User'}
      path="USERS"
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="USERS" colSpan={2}>
            {inputsRows.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields {...item} />
              </RowComponent>
            ))}
          </StyledTable>
          <SubmitBtn actionLoading={actionLoading} />
        </StyledStack>
      </FormProvider>
    </TitlesWithBackButton>
  );
};

export default memo(InputsTable);
