import { createContext } from 'react';

import { ToastStoreState } from '../types';

export const ToastContext = createContext<ToastStoreState | null>(null);
