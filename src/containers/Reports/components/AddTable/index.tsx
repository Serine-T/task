import { memo } from 'react';

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
import { getOptionsArray } from '@utils/helpers';
import { selectUsers } from '@features/users/selectors';

import { AddDataSchema, IAddDataForm, inputsRows, defaultValues, formattedPayload } from './helpers';

interface IInputsTable{
  reportsInfo?: IReportInfo;
}

const InputsTable = ({ reportsInfo }: IInputsTable) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { actionLoading } = useAppSelector(selectReports);
  const { allUsers } = useAppSelector(selectUsers);

  const methods = useForm<IAddDataForm>({
    resolver: yupResolver(AddDataSchema),
    defaultValues: reportsInfo ?? defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IAddDataForm) => {
    const payload = formattedPayload(data);

    dispatch(reportsInfo ? editReport(payload) : addReport(payload)).unwrap().then(() => {
      navigate(PAGE_ROUTES.REPORTS);
    }).catch((e) => {
      console.log(e); // TODO
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
                    options: getOptionsArray(allUsers),
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
