// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function useMockedUser() {
  const { user } = useAuthContext();

  return { user };
}
