import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutPropsInterface) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
