import { memo, useState } from 'react';

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
import { useAppDispatch } from '@features/app/hooks';
import SearchBtn from '@containers/common/SearchSection/SearchBtn';
import useMount from '@customHooks/useMount';
import { getAllUsers } from '@features/users/actions';
import { ISelectOptions } from '@utils/types';

import { FiltersSchema, IFiltersForm } from './helpers';

const SearchSection = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { search } = useLocation();
  const params = queryString.parse(search);
  const { userId = '' } = params;

  const [users, setUsers] = useState<ISelectOptions[]>([]);
  const methods = useForm<IFiltersForm>({
    resolver: yupResolver(FiltersSchema),
    defaultValues: {
      userId: userId as string,
    },
  });

  useMount(() => {
    dispatch(getAllUsers()).unwrap().then((data) => {
      const usersList = getOptionsArray(data);

      setUsers(usersList);
    }).catch(() => {});
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: IFiltersForm) => {
    const queryParams = constructQueryString({
      userId: data.userId,
    });

    console.log(`${PAGE_ROUTES.REPORTS}?${queryParams}`);
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
              name="category"
              options={users}
            />
          </StyledSearchRows>
          <SearchBtn path={PAGE_ROUTES.USERS} />
        </Stack>
      </FormProvider>
    </StyledSearchSection>
  );
};

export default memo(SearchSection);
