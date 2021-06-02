import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {BankAccountState, PagiantionRequest} from 'app/features/bankAccount/store/BankAccount.types';
import {
  BankAccountRegistrationRequest,
  BankAccountRegistrationResponse,
  PaginatedBankAccountResponse,
  Resultboolean,
} from 'app/api/services/accountApi/api';

const initialState: BankAccountState = {
  postBankAccount: null,
  postBankAccountLoading: false,
  postBankAccountError: null,
  selectedAccountId: null,
  bankAccountById: null,
  bankAccountByIdLoading: false,
  bankAccountByIdError: null,
  paginatedBankAccounts: null,
  paginatedBankAccountsLoading: false,
  paginatedBankAccountsError: null,
  deleteBankAccountLoading: false,
  deleteBankAccountError: null,
};

const handleGetPaginatedBankAccounts = (state: BankAccountState) => {
  state.paginatedBankAccountsLoading = true;
  state.paginatedBankAccountsError = null;
};

const handleGetPaginatedBankAccountsSuccess = (
  state: BankAccountState,
  action: PayloadAction<PaginatedBankAccountResponse>,
) => {
  state.paginatedBankAccounts = action.payload;
  state.paginatedBankAccountsLoading = false;
  state.paginatedBankAccountsError = null;
};

const handleGetPaginatedBankAccountsFailure = (state: BankAccountState, action: PayloadAction<any>) => {
  state.paginatedBankAccounts = null;
  state.paginatedBankAccountsLoading = false;
  state.paginatedBankAccountsError = action.payload;
};

const handleAddBankAccount = (state: BankAccountState) => {
  state.postBankAccountLoading = true;
  state.postBankAccountError = null;
};

const handleAddBankAccountSuccess = (
  state: BankAccountState,
  action: PayloadAction<BankAccountRegistrationResponse>,
) => {
  state.postBankAccount = action.payload;
  state.postBankAccountLoading = false;
  state.postBankAccountError = null;
};

const handleAddBankAccountFailure = (state: BankAccountState, action: PayloadAction<any>) => {
  state.postBankAccount = null;
  state.postBankAccountLoading = false;
  state.postBankAccountError = action.payload;
};

const handleSetSelectedBankAccountId = (state: BankAccountState, action: PayloadAction<any>) => {
  state.selectedAccountId = action.payload;
};

const handleGetBankAccountById = (state: BankAccountState) => {
  state.bankAccountByIdLoading = true;
  state.bankAccountByIdError = null;
};

const handleGetBankAccountByIdSuccess = (
  state: BankAccountState,
  action: PayloadAction<BankAccountRegistrationResponse>,
) => {
  state.bankAccountById = action.payload;
  state.bankAccountByIdLoading = false;
  state.bankAccountByIdError = null;
};

const handleGetBankAccountByIdFailure = (state: BankAccountState, action: PayloadAction<any>) => {
  state.bankAccountById = null;
  state.bankAccountByIdLoading = false;
  state.bankAccountByIdError = action.payload;
};

const handleDeleteBankAccount = (state: BankAccountState) => {
  state.deleteBankAccountLoading = true;
  state.deleteBankAccountError = null;
};

const handleDeleteBankAccountSuccess = (state: BankAccountState, action: PayloadAction<Resultboolean>) => {
  state.deleteBankAccountLoading = false;
  state.deleteBankAccountError = null;
};

const handleDeleteBankAccountFailure = (state: BankAccountState, action: PayloadAction<any>) => {
  state.deleteBankAccountLoading = false;
  state.deleteBankAccountError = action.payload;
};

const bankAccountSlice = createSlice({
  name: '@@bankAccount',
  initialState,
  reducers: {
    getPaginatedBankAccounts(state, action: PayloadAction<PagiantionRequest>) {
      return handleGetPaginatedBankAccounts(state);
    },
    getPaginatedBankAccountsSuccess(state, action: PayloadAction<PaginatedBankAccountResponse>) {
      return handleGetPaginatedBankAccountsSuccess(state, action);
    },
    getPaginatedBankAccountsFailure(state, action: PayloadAction<any>) {
      return handleGetPaginatedBankAccountsFailure(state, action);
    },
    addBankAccount(state, action: PayloadAction<BankAccountRegistrationRequest>) {
      return handleAddBankAccount(state);
    },
    addBankAccountSuccess: (state, action: PayloadAction<BankAccountRegistrationResponse>) => {
      return handleAddBankAccountSuccess(state, action);
    },
    addBankAccountFailure: (state, action: PayloadAction<any>) => {
      return handleAddBankAccountFailure(state, action);
    },
    setSelectedBankAccountId: (state, action: PayloadAction<number>) => {
      return handleSetSelectedBankAccountId(state, action);
    },
    getBankAccountById(state, action: PayloadAction<string>) {
      return handleGetBankAccountById(state);
    },
    getBankAccountByIdSuccess(state, action: PayloadAction<BankAccountRegistrationResponse>) {
      return handleGetBankAccountByIdSuccess(state, action);
    },
    getBankAccountByIdFailure(state, action: PayloadAction<any>) {
      return handleGetBankAccountByIdFailure(state, action);
    },
    deleteBankAccount(state, action: PayloadAction<string>) {
      return handleDeleteBankAccount(state);
    },
    deleteBankAccountSuccess(state, action: PayloadAction<Resultboolean>) {
      return handleDeleteBankAccountSuccess(state, action);
    },
    deleteBankAccountFailure(state, action: PayloadAction<any>) {
      return handleDeleteBankAccountFailure(state, action);
    },
  },
});

export const {name, actions, reducer} = bankAccountSlice;
