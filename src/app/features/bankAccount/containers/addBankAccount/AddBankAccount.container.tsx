import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import AccountForm from 'app/features/bankAccount/containers/accountForm/AccountForm.container';
import {SnackBar} from 'app/shared/components';

import {actions as bankAccountActions} from 'app/features/bankAccount/store/BankAccount.slice';
import {selectPostBankAccountLoading} from 'app/features/bankAccount/store/BankAccount.selectors';
import {usePrevious} from 'app/util/customHooks';

interface AddBankAccountProps {}

const AddBankAccount: React.FC<AddBankAccountProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const postBankAccountLoading = useSelector(selectPostBankAccountLoading);
  const prevPostBankAccountLoading = usePrevious(postBankAccountLoading);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);

  React.useEffect(() => {
    if (prevPostBankAccountLoading && !postBankAccountLoading) {
      setOpenSuccessSnackbar(true);
    }
  }, [postBankAccountLoading, prevPostBankAccountLoading]);

  const handleFormSubmit = (values: any) => {
    dispatch(bankAccountActions.addBankAccount(values));
  };

  return (
    <>
      <AccountForm onSubmitForm={handleFormSubmit} saving={postBankAccountLoading || openSuccessSnackbar} />
      <SnackBar
        message="Account Saved Successfully "
        type="success"
        open={openSuccessSnackbar}
        onClose={() => history.goBack()}
        autoHideDuration={2000}
      />
    </>
  );
};

export default AddBankAccount;
