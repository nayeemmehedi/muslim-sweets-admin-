import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <div className="background-main w-screen" >
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <LoginView />
    </div>
  );
}
