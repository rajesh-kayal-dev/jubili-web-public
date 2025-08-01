'use client';


import CustomButton from '../components/ui/CustomButton';
import { useAsyncAction } from '../hooks/useAsyncAction';
import Navbar from '../components/layout/Navbar';

export default function Home() {
  const { trigger, loading } = useAsyncAction(async () => {
    console.log("Fake API call triggered.");
  }, 1500);

  return (
    <>
      <main style={{ padding: "2rem", height: "200vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <CustomButton
          onClick={trigger}
          loading={loading}
          label="Click Me"
        />
      </main>
      <Navbar />
    </>
  );
}
