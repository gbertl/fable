import { useState } from 'react';
import { foto } from '../assets';
import { BreadCrumb, Button, Container, Input, Label } from '../components';

enum FormTabs {
  Email,
  Phone,
}

const SignIn = () => {
  const [formTab, setFormTab] = useState(FormTabs.Email);

  return (
    <section className="relative">
      <Container>
        <BreadCrumb
          links={[
            { title: 'Profile', url: '#' },
            { title: 'Sign in', url: '#' },
          ]}
        />

        <div className="w-[30%] mt-[8%]">
          <h2 className="text-xl mb-8">Sign in account</h2>

          <div className="flex gap-4">
            <Label
              className={`text-base font-normal ${
                formTab === FormTabs.Email
                  ? 'text-dark cursor-auto'
                  : 'text-gray cursor-pointer'
              }`}
              onClick={() => setFormTab(FormTabs.Email)}
            >
              Email
            </Label>
            <Label
              className={`text-base font-normal ${
                formTab === FormTabs.Phone
                  ? 'text-dark cursor-auto'
                  : 'text-gray cursor-pointer'
              }`}
              onClick={() => setFormTab(FormTabs.Phone)}
            >
              Phone
            </Label>
          </div>

          {formTab === FormTabs.Email && (
            <Input type="email" placeholder="Enter email" className="mb-4" />
          )}

          {formTab === FormTabs.Phone && (
            <Input
              type="number"
              placeholder="Enter phone number"
              className="mb-4"
            />
          )}

          <Button className="mb-5">Get code</Button>
        </div>
      </Container>

      <img
        src={foto}
        alt=""
        className="absolute top-0 right-0 w-[55%] h-[calc(100vh-75px-12px)] object-cover"
      />
    </section>
  );
};

export default SignIn;
