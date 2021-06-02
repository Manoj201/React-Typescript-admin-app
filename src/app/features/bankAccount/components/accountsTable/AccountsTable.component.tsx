import React from 'react';
import MaterialTable from 'material-table';

interface AccountsTableProps {
  loading: boolean;
  onClickEditRow: (id: number) => void;
  onClickDeleteRow: (id: number) => void;
  data: Array<any>;
  page: number;
  totalCount: number;
  onChangePage: (page: number) => void;
  onChangeRowsPerPage: (pageSize: number) => void;
}

const AccountsTable: React.FC<AccountsTableProps> = ({
  data,
  page,
  totalCount,
  loading,
  onClickEditRow,
  onClickDeleteRow,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  const tableRef: any = React.useRef();

  React.useEffect(() => {
    tableRef?.current?.onQueryChange();
  }, [data]);

  return (
    <MaterialTable
      tableRef={tableRef}
      isLoading={loading}
      columns={[
        {
          title: 'Account Name',
          field: 'accountName',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
        {
          title: 'Account Number',
          field: 'accountNumber',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
        {
          title: 'Bank',
          field: 'bankName',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
        {
          title: 'Country',
          field: 'country',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
        {
          title: 'Currency',
          field: 'currency',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
        {
          title: 'Current Balance',
          field: 'currentBalance',
          type: 'numeric',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
        {
          title: 'Status',
          field: 'status',
          headerStyle: {textAlign: 'center', paddingLeft: 50},
          align: 'center',
          cellStyle: {borderRight: '1px solid #c9c9c9'},
        },
      ]}
      data={query =>
        new Promise((resolve, reject) => {
          resolve({
            data,
            page,
            totalCount,
          });
        })
      }
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Account',
          onClick: (event, rowData: any) => onClickEditRow(rowData.id),
          iconProps: {
            fontSize: 'small',
          },
        },
        {
          icon: 'delete',
          tooltip: 'Delete Account',
          onClick: (event, rowData: any) => onClickDeleteRow(rowData.id),
          iconProps: {
            fontSize: 'small',
          },
        },
      ]}
      options={{
        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 50],
        toolbar: false,
        actionsColumnIndex: 8,
        actionsCellStyle: {
          backgroundColor: '#ebebeb',
        },
        headerStyle: {
          textAlign: 'left',
          position: 'sticky',
          top: 0,
          backgroundColor: '#5c6bbd',
          fontWeight: 'bold',
          color: '#fff',
          borderRight: '1px solid #c9c9c9',
        },
        maxBodyHeight: 800,
        emptyRowsWhenPaging: false,
      }}
    />
  );
};

export default AccountsTable;
