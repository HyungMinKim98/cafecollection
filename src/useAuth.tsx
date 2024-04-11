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
            const { uid, displayName, email, photoURL } = user;
            dispatch(setUser({
              firebaseUid: uid,
              name: displayName || 'Default Name',
              email: email || 'No email provided',
              photoUrl: photoURL,
              region: 'Default Region'  // Provide a default region if not available
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
