import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState, AppDispatch } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { default as useGetCartTotal } from './useGetCartTotal';
export { default as useCreateProduct } from './useCreateProduct';
export { default as useUpdateProduct } from './useUpdateProduct';
export { default as useCreateHeroProduct } from './useCreateHeroProduct';
export { default as useUpdateHeroProduct } from './useUpdateHeroProduct';
export { default as useCheckAdminRole } from './useCheckAdminRole';
export { default as useCreateBuyer } from './useCreateBuyer';
