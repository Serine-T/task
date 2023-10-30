import { setErrorMessage } from '@features/errors/slice';
import { useDispatch } from 'react-redux';

const useErrorHandler = () => {
  const dispatch = useDispatch();

  return (message: string) => {
    dispatch(setErrorMessage(message));
  };
};

export default useErrorHandler;
