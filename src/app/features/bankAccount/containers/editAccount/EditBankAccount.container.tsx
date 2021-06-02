import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import AccountForm from 'app/features/bankAccount/containers/accountForm/AccountForm.container';
import {SnackBar, LoaderWrapper} from 'app/shared/components';

import {actions as bankAccountActions} from 'app/features/bankAccount/store/BankAccount.slice';
import {
  selectBankAccountByIdError,
  selectBankAccountByIdLoading,
  selectBankAccountById,
  selectPostBankAccountLoading,
} from 'app/features/bankAccount/store/BankAccount.selectors';
import {usePrevious} from 'app/util/customHooks';

interface EditBankAccountProps {
  selectedBankAccountId: string;
}

const EditBankAccount: React.FC<EditBankAccountProps> = ({selectedBankAccountId}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const bankAccountById = useSelector(selectBankAccountById);
  const bankAccountByIdLoading = useSelector(selectBankAccountByIdLoading);
  const bankAccountByIdError = useSelector(selectBankAccountByIdError);
  const updateBankAccountLoading = useSelector(selectPostBankAccountLoading);
  const prevUpdateBankAccountLoading = usePrevious(updateBankAccountLoading);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

  React.useEffect(() => {
    dispatch(bankAccountActions.getBankAccountById(selectedBankAccountId));
  }, [dispatch, selectedBankAccountId]);

  React.useEffect(() => {
    if (prevUpdateBankAccountLoading && !updateBankAccountLoading) {
      setOpenSuccessSnackbar(true);
    }
  }, [prevUpdateBankAccountLoading, updateBankAccountLoading, dispatch, selectedBankAccountId]);

  const handleFormSubmit = (values: any) => {
    const updatedAccount = {...bankAccountById, ...values, id: selectedBankAccountId};
    dispatch(bankAccountActions.addBankAccount(updatedAccount));
  };

  return (
    <>
      <LoaderWrapper loading={bankAccountByIdLoading} error={bankAccountByIdError}>
        {bankAccountById && (
          <AccountForm
            onSubmitForm={handleFormSubmit}
            saving={updateBankAccountLoading || openSuccessSnackbar}
            bankAccount={bankAccountById}
            isEdit
          />
        )}
      </LoaderWrapper>
      <SnackBar
        message="Account Edit Successfully "
        type="success"
        open={openSuccessSnackbar}
        onClose={() => history.goBack()}
        autoHideDuration={2000}
      />
    </>
  );
};

export default EditBankAccount;
