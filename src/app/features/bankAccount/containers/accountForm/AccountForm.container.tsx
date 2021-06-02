import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {TextInput, Dropdown} from 'app/shared/components';

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  item: {
    marginLeft: 20,
    marginRight: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  buttonWrapper: {
    padding: 18,
    paddingTop: 30,
  },
  button: {
    marginRight: 15,
    textTransform: 'none',
  },
}));

export interface AccountFormProps {
  onSubmitForm: (values: any) => void;
  saving: boolean;
  isEdit?: boolean;
  bankAccount?: any;
}

const validationSchema = yup.object({
  accountName: yup.string().required('Required *'),
  accountNumber: yup.string().required('Required *'),
  bankName: yup.string().required('Required *'),
  country: yup.string().required('Required *'),
  currency: yup.string().required('Required *'),
  currentBalance: yup.number().required('Required *'),
});

const AccountForm: React.FC<AccountFormProps> = ({onSubmitForm, saving, isEdit, bankAccount}) => {
  const classes = useStyles();

  const defaultInitialValues = {
    accountName: '',
    accountNumber: '',
    bankName: '',
    country: '',
    currency: '',
    status: true,
    currentBalance: '',
    userId: 1,
  };

  const [initialValues, setInitialValues] = React.useState({...defaultInitialValues});

  React.useEffect(() => {
    if (isEdit) {
      setInitialValues(bankAccount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      resetForm();
      onSubmitForm(values);
      setInitialValues(values);
    },
  });

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <Grid container alignItems="center" spacing={4} direction="column">
          <Grid item container justify="flex-start" spacing={4}>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <TextInput formik={formik} name="accountName" label="Account Name" />
            </Grid>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <TextInput formik={formik} name="accountNumber" label="Account Number" />
            </Grid>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <Dropdown
                formik={formik}
                name="bankName"
                label="Bank Name"
                data={[
                  {label: 'DBS Bank', value: 'dbs'},
                  {label: 'Citi Bank', value: 'city'},
                ]}
              />
            </Grid>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <Dropdown
                formik={formik}
                name="country"
                label="Country"
                data={[
                  {label: 'Singapore', value: 'SG'},
                  {label: 'United States Of America', value: 'USA'},
                  {label: 'Sri Lanka', value: 'SL'},
                ]}
              />
            </Grid>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <Dropdown
                formik={formik}
                name="currency"
                label="Currency"
                data={[
                  {label: 'SGD', value: 'SGD'},
                  {label: 'USD', value: 'USD'},
                  {label: 'LKR', value: 'LKR'},
                ]}
              />
            </Grid>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <TextInput formik={formik} name="currentBalance" label="Current Balance" isCurrencyValue />
            </Grid>
            <Grid item lg={2} md={3} sm={12} xs={12} className={classes.item}>
              <Dropdown
                formik={formik}
                name="status"
                label="Account Status"
                data={[
                  {label: 'Active', value: 'true'},
                  {label: 'Inactive', value: 'false'},
                ]}
              />
            </Grid>
          </Grid>
          <Grid item className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              type="submit"
              disabled={saving}>
              {saving ? <CircularProgress color="secondary" style={{color: '#ffff'}} size={22} /> : 'Save'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              className={classes.button}
              onClick={formik.handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AccountForm;
