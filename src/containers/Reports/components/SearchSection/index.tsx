import { memo } from 'react';

import StyledSearchSection from '@containers/common/StyledSearchContainer';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { StyledSearchRows } from '@containers/common/StyledSearchContainer/styled';
import Select from '@containers/common/Select';
import Stack from '@mui/material/Stack';
import PAGE_ROUTES from '@routes/routingEnum';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { constructQueryString, getOptionsArray } from '@utils/helpers';
import { useAppSelector } from '@features/app/hooks';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';
import { selectUsers } from '@features/users/selectors';

import { FiltersSchema, IFiltersForm } from './helpers';

const SearchSection = () => {
  const { allUsers } = useAppSelector(selectUsers);

  const navigate = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const { userId = '' } = params;

  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      userId: userId as string,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({
      userId: data.userId,
    });

    navigate(`${PAGE_ROUTES.REPORTS}?${queryParams}`);
  };

  return (
    <StyledSearchSection>
      <FormProvider {...methods}>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          gap="24px"
        >
          <StyledSearchRows>
            <Select
              label="Users"
              width="200px"
              name="userId"
              options={getOptionsArray(allUsers, 'id')}
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.REPORTS} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
