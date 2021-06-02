import {RootState} from 'app/store/store';

export const selectGetPaginateAccounts = (state: RootState) => state.bankAccount.paginatedBankAccounts;
export const selectGetPaginateAccountsLoading = (state: RootState) => state.bankAccount.paginatedBankAccountsLoading;
export const selectGetPaginateAccountsError = (state: RootState) => state.bankAccount.paginatedBankAccountsError;

export const selectPostBankAccountLoading = (state: RootState) => state.bankAccount.postBankAccountLoading;

export const selectSelectedBankAccountId = (state: RootState) => state.bankAccount.selectedAccountId;

export const selectBankAccountById = (state: RootState) => state.bankAccount.bankAccountById;
export const selectBankAccountByIdLoading = (state: RootState) => state.bankAccount.bankAccountByIdLoading;
export const selectBankAccountByIdError = (state: RootState) => state.bankAccount.bankAccountByIdError;

export const selectDeleteBankAccountLoading = (state: RootState) => state.bankAccount.deleteBankAccountLoading;
export const selectDeleteBankAccountError = (state: RootState) => state.bankAccount.deleteBankAccountError;
