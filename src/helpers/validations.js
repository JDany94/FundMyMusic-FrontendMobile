import {useState} from 'react';

export const validations = () => {
  const [alert, setAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [approved, setApproved] = useState(false);

  const validate = user => {
    setApproved(false);
    setMsgAlert('');

    if (user.from === 'SingIn') {
      const {email, password} = user;

      if ([email, password].includes('')) {
        setMsgAlert('Todos los campos son obligatorios');
        setAlert(true);
        return;
      }
      if (!validEmail(email)) {
        setMsgAlert('Email no válido');
        setAlert(true);
        return;
      }
      setApproved(true);
    }

    if (user.from === 'SingUp') {
      const {email, name, surname, phone, password, rePassword} = user;

      if ([email, name, surname, phone, password, rePassword].includes('')) {
        setMsgAlert('Todos los campos son obligatorios');
        setAlert(true);
        return;
      }
      if (!validEmail(email)) {
        setMsgAlert('Email no válido');
        setAlert(true);
        return;
      }
      if (!validName(name)) {
        setMsgAlert('Nombre no válido');
        setAlert(true);
        return;
      }
      if (!validName(surname)) {
        setMsgAlert('Apellido no válido');
        setAlert(true);
        return;
      }
      if (phone.length < 9) {
        setMsgAlert('El teléfono debe tener mas de 9 dígitos');
        setAlert(true);
        return;
      }
      if (!validNumber(phone)) {
        setMsgAlert('Teléfono no válido');
        setAlert(true);
        return;
      }
      if (password.length < 6) {
        setMsgAlert('La contraseña debe tener al menos 6 caracteres');
        setAlert(true);
        return;
      }
      if (password !== rePassword) {
        setMsgAlert('Las contraseñas no coinciden');
        setAlert(true);
        return;
      }
      setApproved(true);
    }

    if (user.from === 'EditProfile') {
      const {name, surname, phone} = user;

      if ([name, surname, phone].includes('')) {
        setMsgAlert('Todos los campos son obligatorios');
        setAlert(true);
        return;
      }
      if (!validName(name)) {
        setMsgAlert('Nombre no válido');
        setAlert(true);
        return;
      }
      if (!validName(surname)) {
        setMsgAlert('Apellido no válido');
        setAlert(true);
        return;
      }
      if (phone.length < 9) {
        setMsgAlert('El teléfono debe tener mas de 9 dígitos');
        setAlert(true);
        return;
      }
      if (!validNumber(phone)) {
        setMsgAlert('Teléfono no válido');
        setAlert(true);
        return;
      }
      setApproved(true);
    }

    if (user.from === 'AddBalance') {
      const {balance} = user;

      if ([balance].includes('')) {
        setMsgAlert('Saldo no válido');
        setAlert(true);
        return;
      }
      if (parseInt(balance) <= 0) {
        setMsgAlert('El saldo no puede ser negativo');
        setAlert(true);
        return;
      }
      if (parseInt(balance) > 5000) {
        setMsgAlert('No se puede recargar mas de 5000€ por recarga');
        setAlert(true);
        return;
      }
      if (!validNumber(balance)) {
        setMsgAlert('Saldo no válido');
        setAlert(true);
        return;
      }
      setApproved(true);
    }
  };

  const RegExpNumbers = /[^0-9]/g;
  const RegExpText =
    /[^a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]/g;

  const validEmail = val => {
    return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/u.test(val);
  };
  const validNumber = val => {
    return /^([0-9])*$/u.test(val);
  };
  const validName = val => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      val,
    );
  };

  return {
    alert,
    setAlert,
    msgAlert,
    setMsgAlert,
    approved,
    validate,
    RegExpText,
    RegExpNumbers,
  };
};
