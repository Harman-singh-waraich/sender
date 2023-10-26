import Image from "next/image";
import HomePage from "../_components/HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 md:p-12 lg:p-24 lg:py-16">
      <HomePage />
    </main>
  );
}
