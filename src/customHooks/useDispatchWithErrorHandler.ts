// hooks/useDispatchWithErrorHandler.ts
import { useAppDispatch } from '@features/app/hooks';
import useErrorHandler from '@customHooks/useErrorHandler';

const useDispatchWithErrorHandler = () => {
  const dispatch = useAppDispatch();
  const handleError = useErrorHandler();

  const dispatchAction = async (action: any) => {
    try {
      const result = await dispatch(action).unwrap();

      return result;
    } catch (e: any) {
      handleError(e.message);
      throw e;
    }
  };

  return dispatchAction;
};

export default useDispatchWithErrorHandler;
