import {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rePasswordVisibility, setRePasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [rightIconRe, setRightIconRe] = useState('eye');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleRePasswordVisibility = () => {
    if (rightIconRe === 'eye') {
      setRightIconRe('eye-off');
      setRePasswordVisibility(!rePasswordVisibility);
    } else if (rightIconRe === 'eye-off') {
      setRightIconRe('eye');
      setRePasswordVisibility(!rePasswordVisibility);
    }
  };

  return {
    passwordVisibility,
    rePasswordVisibility,
    rightIcon,
    rightIconRe,
    handlePasswordVisibility,
    handleRePasswordVisibility,
  };
};
