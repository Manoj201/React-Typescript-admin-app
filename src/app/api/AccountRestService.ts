import {
  BankAccountRegistrationRequest,
  ResultBankAccountRegistrationResponse,
  Resultboolean,
  ResultPaginatedBankAccountResponse,
} from 'app/api/services/accountApi/api';
import {BankAccountApiService} from 'app/api';
import {AxiosResponse} from 'axios';

import {generateHeaders} from 'app/util/generateHeader';

const AccountService = {
  getAccountList: (page: number, pageSize: number): Promise<AxiosResponse<ResultPaginatedBankAccountResponse>> => {
    const headers = generateHeaders();
    return BankAccountApiService.getPaginatedAccountsUsingGET(
      headers.version,
      headers.xCorrelationId,
      headers.authType,
      headers.authorization,
      headers.channelId,
      headers.actionId,
      headers.latitude,
      headers.longitude,
      headers.longitude,
      page,
      pageSize,
    );
  },
  postAccount: (
    payload: BankAccountRegistrationRequest,
  ): Promise<AxiosResponse<ResultBankAccountRegistrationResponse>> => {
    const headers = generateHeaders();
    return BankAccountApiService.registerAccountUsingPOST(
      headers.version,
      headers.xCorrelationId,
      headers.authType,
      headers.authorization,
      headers.channelId,
      payload,
      headers.actionId,
      headers.latitude,
      headers.locale,
      headers.longitude,
    );
  },
  getAccountById: (accountId: string): Promise<AxiosResponse<ResultBankAccountRegistrationResponse>> => {
    const headers = generateHeaders();
    return BankAccountApiService.getAccountUsingGET(
      headers.version,
      headers.xCorrelationId,
      accountId,
      headers.authType,
      headers.authorization,
      headers.channelId,
      headers.actionId,
      headers.latitude,
      headers.locale,
      headers.longitude,
    );
  },
  updateBankAccount: (
    payload: BankAccountRegistrationRequest,
  ): Promise<AxiosResponse<ResultBankAccountRegistrationResponse>> => {
    const headers = generateHeaders();
    return BankAccountApiService.updateAccoutUsingPUT(
      headers.version,
      headers.xCorrelationId,
      headers.authType,
      headers.authorization,
      headers.channelId,
      payload,
      headers.actionId,
      headers.latitude,
      headers.locale,
      headers.longitude,
    );
  },
  deleteBankAccount: (accountId: string): Promise<AxiosResponse<Resultboolean>> => {
    const headers = generateHeaders();
    return BankAccountApiService.deleteBankAccountUsingDELETE(
      headers.version,
      headers.xCorrelationId,
      accountId,
      headers.authType,
      headers.authorization,
      headers.channelId,
      headers.actionId,
      headers.latitude,
      headers.locale,
      headers.longitude,
    );
  },
};

export default AccountService;
