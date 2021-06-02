import React from 'react';

import BankAccounts from 'app/features/bankAccount/containers/bankAccounts/BankAccounts.container';
import {PageHeader} from 'app/shared/components';

const BankAccountPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        data={[
          {
            label: 'Bank Accounts',
            link: null,
          },
        ]}
      />
      <BankAccounts />
    </div>
  );
};

export default BankAccountPage;
