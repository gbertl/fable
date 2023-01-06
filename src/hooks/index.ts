import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState, AppDispatch } from '../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useCreateProduct, useUpdateProduct } from './products';
export { useCreateHeroProduct, useUpdateHeroProduct } from './heroProducts';
export { useCreateBuyer, useGetBuyer, useUpdateBuyer } from './buyers';
export { default as useGetCartTotal } from './useGetCartTotal';
export { default as useCheckAdminRole } from './useCheckAdminRole';
export { default as useCreateOrder } from './useCreateOrder';
export { default as useHideScrollbar } from './useHideScrollbar';
