//src>useAuth.tsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setUser,clearUser } from './redux/userSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({
          firebaseUid: user.uid,
          name: user.displayName || 'Anonymous', // 변경된 부분
          email: user.email || 'No Email', // 변경된 부분
          photoUrl: user.photoURL || undefined, // 변경된 부분
          region: 'Default Region' // Assuming you want to set a default
        }));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuth;