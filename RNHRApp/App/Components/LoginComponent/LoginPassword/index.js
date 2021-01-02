import React from 'react';
import PropTypes from 'prop-types';
import InputDomainPassword from './InputDomainPassword';
import InputPhonePassword from './InputPhonePassword';

const LoginPassword = ({ isEmployee, onChange, onClickHandler }) => (
  isEmployee
    ? (<InputDomainPassword onChange={onChange} onClickHandler={onClickHandler} />)
    : <InputPhonePassword onChange={onChange} onClickHandler={onClickHandler} />
);

LoginPassword.propTypes = {
  isEmployee: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default LoginPassword;
