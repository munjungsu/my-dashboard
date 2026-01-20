import React, {Suspense} from 'react';
import LoginForm from '../ui/login-form';
const page = () => {
    return (
       <Suspense>
        <LoginForm />
       </Suspense>
    );
};

export default page;