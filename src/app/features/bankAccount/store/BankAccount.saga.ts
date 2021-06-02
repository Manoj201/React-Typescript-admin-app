import {call, put, takeLatest} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {
  BankAccountRegistrationResponse,
  PaginatedBankAccountResponse,
  Resultboolean,
} from 'app/api/services/accountApi/api';
import {actions as bankAccountActions} from 'app/features/bankAccount/store/BankAccount.slice';

import AccountService from 'app/api/AccountRestService';

function* watchGetPaginateBankAccounts(action: ReturnType<typeof bankAccountActions.getPaginatedBankAccounts>) {
  try {
    const response: AxiosResponse<PaginatedBankAccountResponse> = yield call(
      AccountService.getAccountList,
      action.payload.page,
      action.payload.pageSize,
    );
    yield put(bankAccountActions.getPaginatedBankAccountsSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(
      bankAccountActions.getPaginatedBankAccountsFailure({
        error: 'Error',
        message: 'Get Accounts failed',
      }),
    );
  }
}

function* watchAddBankAccount(action: ReturnType<typeof bankAccountActions.addBankAccount>) {
  try {
    const response: AxiosResponse<BankAccountRegistrationResponse> = yield call(
      action.payload.id ? AccountService.updateBankAccount : AccountService.postAccount,
      action.payload,
    );
    yield put(bankAccountActions.addBankAccountSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(
      bankAccountActions.addBankAccountFailure({
        error: 'Error',
        message: 'Account Creation failed',
      }),
    );
  }
}

function* watchGetBankAccountById(action: ReturnType<typeof bankAccountActions.getBankAccountById>) {
  try {
    const response: AxiosResponse<BankAccountRegistrationResponse> = yield call(
      AccountService.getAccountById,
      action.payload,
    );
    yield put(bankAccountActions.getBankAccountByIdSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(
      bankAccountActions.getBankAccountByIdFailure({
        error: 'Error',
        message: 'Account Get By Id failed',
      }),
    );
  }
}

function* watchDeleteBankAccount(action: ReturnType<typeof bankAccountActions.deleteBankAccount>) {
  try {
    const response: AxiosResponse<Resultboolean> = yield call(AccountService.deleteBankAccount, action.payload);
    yield put(bankAccountActions.deleteBankAccountSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(
      bankAccountActions.deleteBankAccountFailure({
        error: 'Error',
        message: 'Account delete failed',
      }),
    );
  }
}

const bankAccountSaga = [
  takeLatest(bankAccountActions.getPaginatedBankAccounts, watchGetPaginateBankAccounts),
  takeLatest(bankAccountActions.addBankAccount, watchAddBankAccount),
  takeLatest(bankAccountActions.getBankAccountById, watchGetBankAccountById),
  takeLatest(bankAccountActions.deleteBankAccount, watchDeleteBankAccount),
];

export default bankAccountSaga;
