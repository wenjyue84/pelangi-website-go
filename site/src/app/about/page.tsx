import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20"> {/* Add padding for fixed header */}
        <About />
      </div>
      <Footer />
    </main>
  );
}
