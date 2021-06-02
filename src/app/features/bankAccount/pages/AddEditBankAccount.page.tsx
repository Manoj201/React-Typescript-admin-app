import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {PageHeader} from 'app/shared/components';
import AddBankAccountContainer from 'app/features/bankAccount/containers/addBankAccount/AddBankAccount.container';
import EditBankAccountContainer from 'app/features/bankAccount/containers/editAccount/EditBankAccount.container';
import Routes from 'app/configs/route';
import {selectSelectedBankAccountId} from 'app/features/bankAccount/store/BankAccount.selectors';

const AddEditBankAccountPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const selectedBankAccountId = useSelector(selectSelectedBankAccountId);

  const isEditRoute = React.useMemo(() => {
    return location.pathname === Routes.BANK_ACCOUNT_EDIT;
  }, [location.pathname]);

  React.useEffect(() => {
    if (isEditRoute && !selectedBankAccountId) {
      history.goBack();
    }
  }, [isEditRoute, selectedBankAccountId, history]);

  return (
    <div>
      <PageHeader
        data={[
          {
            label: 'Bank Accounts',
            link: Routes.BANK_ACCOUNT,
          },
          {
            label: isEditRoute ? 'Edit Account' : 'Add Account',
            link: null,
          },
        ]}
      />
      {isEditRoute && selectedBankAccountId ? (
        <EditBankAccountContainer selectedBankAccountId={selectedBankAccountId.toString()} />
      ) : (
        <AddBankAccountContainer />
      )}
    </div>
  );
};

export default AddEditBankAccountPage;
