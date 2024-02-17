import Header from './Header';
import Footer from './Footer';
import { Toaster } from '@/components/ui/toaster';

const RootLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
      <Footer />
    </>
  );
};

export default RootLayout;
