import React from 'react';
import PropTypes from 'prop-types';
import InputSAPCode from './InputSAPCode';
import InputPAN from './InputPAN';

const LoginID = ({ isEmployee, onChange, loginId }) => (
  isEmployee ? (
    <InputSAPCode
      onChange={onChange}
      loginId={loginId}
    />
  ) : (<InputPAN onChange={onChange} loginId={loginId} />)
);

LoginID.propTypes = {
  isEmployee: PropTypes.bool.isRequired,
};

export default LoginID;
