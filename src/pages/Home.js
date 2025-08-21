import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome to CodeRunner 🚀</h1>
        <p className="mt-3 text-gray-600">
          Solve coding challenges directly in your browser!
        </p>
      </div>
    </>
  );
}
