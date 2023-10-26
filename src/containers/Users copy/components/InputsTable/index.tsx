import { memo, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import StyledTable from '@containers/common/Table';
import { StyledStack } from '@containers/common/StyledAddEditTables/styled';
import TitlesWithBackButton from '@containers/common/TitlesWithBackButton';
import PAGE_ROUTES from '@routes/routingEnum';
import ReusableFields from '@containers/common/Table/components/ReusableFields';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@features/app/hooks';
import SubmitBtn from '@containers/common/Table/components/SubmitBtn';
import RowComponent from '@containers/common/Table/components/RowComponent';
import { IReportInfo } from '@features/reports/types';
import { selectReports } from '@features/reports/selectors';
import { addReport, editReport } from '@features/reports/actions';
import useMount from '@customHooks/useMount';
import { getAllUsers } from '@features/users/actions';
import { getOptionsArray } from '@utils/helpers';
import { ISelectOptions } from '@utils/types';

import { AddDataSchema, IAddDataForm, inputsRows, defaultValues, formattedPayload } from './helpers';

interface IInputsTable{
  reportsInfo?: IReportInfo;
}

const InputsTable = ({ reportsInfo }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectReports);
  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: reportsInfo ?? defaultValues,
  });

  const [usersList, setUsersList] = useState<ISelectOptions[]>([]);

  const { handleSubmit } = methods;

  useMount(() => {
    dispatch(getAllUsers()).unwrap().then((data) => {
      const newList = getOptionsArray(data);

      setUsersList(newList);
    }).catch(() => {});
  });

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattedPayload(data);

    dispatch(reportsInfo ? editReport(payload) : addReport(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.REPORTS);
    }).catch((e) => {
      console.log(e); // TODO

      navigate(PAGE_ROUTES.REPORTS);
    });
  };

  return (
    <TitlesWithBackButton
      title={reportsInfo ? 'Edit Report' : 'Add Report'}
      path="REPORTS"
    >
      <FormProvider {...methods}>
        <StyledStack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
        >
          <StyledTable tableTitle="REPORTS" colSpan={2}>
            {inputsRows.map((item) => (
              <RowComponent key={item.label} {...item}>
                <ReusableFields
                  {...item}
                  selectList={[{
                    field: 'userId',
                    options: usersList,
                  }]}
                />
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
