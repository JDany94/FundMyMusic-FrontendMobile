import {useState} from 'react';

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rePasswordVisibility, setRePasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye-off');
  const [rightIconRe, setRightIconRe] = useState('eye-off');

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleRePasswordVisibility = () => {
    if (rightIconRe === 'eye-off') {
      setRightIconRe('eye');
      setRePasswordVisibility(!rePasswordVisibility);
    } else if (rightIconRe === 'eye') {
      setRightIconRe('eye-off');
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
