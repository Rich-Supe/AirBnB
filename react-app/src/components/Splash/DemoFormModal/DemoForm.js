import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import styles from './DemoFormModal.module.css'

const DemoForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = 'demo@aa.io'
  const password = 'password'

  const onLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
    history.push(`/home`)
  }

  return (
    <div className={styles.demoFormContainer} onClick={onLogin}>
      <h1> Sign in as a Demo user?</h1>
      <button onClick={onLogin}>Yes!</button>
    </div>
  )
}

export default DemoForm;