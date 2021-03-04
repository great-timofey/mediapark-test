import React, { FC, useEffect } from 'react';
import { BreedsView } from 'components';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { requestBreeds } from 'store/breeds';

export const BreedsScreen: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { breeds, common } = useAppSelector((state) => state);

  useEffect(() => {
    if (!breeds.list.length) {
      dispatch(requestBreeds());
    }
  }, [breeds, dispatch]);

  return <BreedsView loading={common.loading} breeds={breeds.list} />;
};
