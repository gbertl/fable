import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { foto } from '../assets';
import { BreadCrumb, Button, Container, Input, Label } from '../components';

const SignIn = () => {
  const { loginWithPopup } = useAuth0();
  const [email, setEmail] = useState('');

  return (
    <section className="relative">
      <Container>
        <BreadCrumb
          links={[
            { title: 'Profile', url: '#' },
            { title: 'Sign in', url: '#' },
          ]}
        />

        <form
          className="md:w-[30%] mt-10 md:mt-[8%]"
          onSubmit={(e) => {
            e.preventDefault();

            loginWithPopup({
              login_hint: email,
            });
          }}
        >
          <h2 className="text-xl mb-8">Sign in or create an account</h2>

          <div className="flex gap-4">
            <Label className="text-base font-normal">Email</Label>
          </div>

          <Input
            type="email"
            placeholder="Enter email"
            className="mb-4"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <Button className="mb-5 cursor-pointer">Submit</Button>
        </form>
      </Container>

      <img
        src={foto}
        alt=""
        className="absolute top-0 right-0 w-[55%] h-[calc(100vh-75px-12px)] object-cover hidden md:block"
      />
    </section>
  );
};

export default SignIn;
