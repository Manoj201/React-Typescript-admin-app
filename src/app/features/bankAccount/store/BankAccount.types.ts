import {BankAccountRegistrationResponse, PaginatedBankAccountResponse} from 'app/api/services/accountApi/api';

export interface BankAccountStore {
  postBankAccount: BankAccountRegistrationResponse | null;
  postBankAccountLoading: boolean;
  postBankAccountError: any;
  selectedAccountId: number | null;
  bankAccountById: BankAccountRegistrationResponse | null;
  bankAccountByIdLoading: boolean;
  bankAccountByIdError: any;
  paginatedBankAccounts: PaginatedBankAccountResponse | null;
  paginatedBankAccountsLoading: boolean;
  paginatedBankAccountsError: any;
  deleteBankAccountLoading: boolean;
  deleteBankAccountError: any;
}

export interface PagiantionRequest {
  page: number;
  pageSize: number;
}

export type BankAccountState = Required<BankAccountStore>;
