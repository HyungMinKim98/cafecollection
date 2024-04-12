//src>useAuth.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUser,clearUser } from './redux/userSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          firebaseUid: user.uid,
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          region: 'Default Region'  // Assuming you want to set a default
        }));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [dispatch, auth]);

  return;
};

export default useAuth;