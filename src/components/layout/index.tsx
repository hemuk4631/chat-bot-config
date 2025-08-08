
import Footer from '@/components/footer';

export default function Layout({ children }) {
  return (
    <>
      <div>
        <main className='mt-6'>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
