import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

import AccountsTable from 'app/features/bankAccount/components/accountsTable/AccountsTable.component';
import {AlertDialog, SnackBar} from 'app/shared/components';
import {actions as bankAccountActions} from 'app/features/bankAccount/store/BankAccount.slice';
import {
  selectGetPaginateAccounts,
  selectGetPaginateAccountsLoading,
  selectDeleteBankAccountLoading,
  selectGetPaginateAccountsError,
  selectDeleteBankAccountError,
} from 'app/features/bankAccount/store/BankAccount.selectors';
import ROUTES from 'app/configs/route';
import {usePrevious} from 'app/util/customHooks';

const useStyles = makeStyles((theme: any) => ({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
}));

const BankAccounts: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const paginateAccounts = useSelector(selectGetPaginateAccounts);
  const paginateAccountsLoading = useSelector(selectGetPaginateAccountsLoading);
  const paginateAccountsError = useSelector(selectGetPaginateAccountsError);

  const deleteAccountLoading = useSelector(selectDeleteBankAccountLoading);
  const deleteAccountError = useSelector(selectDeleteBankAccountError);
  const prevDeleteAccountLoading = usePrevious(deleteAccountLoading);

  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [accountId, setAccountId] = React.useState(0);
  const [serviceError, setServiceError] = React.useState(false);

  React.useEffect(() => {
    dispatch(
      bankAccountActions.getPaginatedBankAccounts({
        page: currentPage,
        pageSize: currentPageSize,
      }),
    );
  }, [currentPage, currentPageSize, dispatch]);

  React.useEffect(() => {
    if (prevDeleteAccountLoading && !deleteAccountLoading) {
      dispatch(
        bankAccountActions.getPaginatedBankAccounts({
          page: currentPage,
          pageSize: currentPageSize,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteAccountLoading, dispatch, prevDeleteAccountLoading]);

  React.useEffect(() => {
    if (paginateAccountsError || deleteAccountError) {
      setServiceError(true);
    } else {
      setServiceError(false);
    }
  }, [deleteAccountError, paginateAccountsError]);

  const tableData = React.useMemo(() => {
    return paginateAccounts && paginateAccounts.accounts
      ? paginateAccounts.accounts.map((item: any) => ({...item}))
      : [];
  }, [paginateAccounts]);

  const handleAccountEdit = (id: number) => {
    dispatch(bankAccountActions.setSelectedBankAccountId(id));
    history.push(ROUTES.BANK_ACCOUNT_EDIT);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (pageSize: number) => {
    setCurrentPageSize(pageSize);
  };

  const handleAccountDelete = (id: number) => {
    setOpenDeleteDialog(true);
    setAccountId(id);
  };

  const handleDeleteAccount = () => {
    dispatch(bankAccountActions.deleteBankAccount(accountId.toString()));
    setOpenDeleteDialog(false);
    setAccountId(0);
  };

  return (
    <>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(ROUTES.BANK_ACCOUNT_ADD)}
          style={{textTransform: 'none'}}>
          Add Account
        </Button>
      </div>
      <AccountsTable
        data={tableData}
        page={paginateAccounts?.pageNo || 0}
        totalCount={paginateAccounts?.totalNoOfItems || 0}
        loading={paginateAccountsLoading}
        onClickEditRow={handleAccountEdit}
        onClickDeleteRow={handleAccountDelete}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangePageSize}
      />
      <AlertDialog
        open={openDeleteDialog}
        onCloseDialog={() => {
          setOpenDeleteDialog(false);
          setAccountId(0);
        }}
        header="Are you want to delete this account?"
        description="This is not soft account delete you can not revert back"
        loading={false}
        onPressYes={handleDeleteAccount}
        onPressNo={() => {
          setOpenDeleteDialog(false);
          setAccountId(0);
        }}
      />
      <SnackBar
        message="Service Error !!"
        type="error"
        open={serviceError}
        onClose={() => setServiceError(false)}
        autoHideDuration={2000}
      />
    </>
  );
};

export default BankAccounts;
