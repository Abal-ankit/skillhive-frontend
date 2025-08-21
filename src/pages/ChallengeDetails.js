import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api";
import CodeEditor from "../components/CodeEditor";
import ResultPanel from "../components/ResultPanel";

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("(a,b)=>a+b");
  const [results, setResults] = useState(null);

  useEffect(() => {
    api.get(`/challenges/${id}`).then((res) => setChallenge(res.data));
  }, [id]);

  const runCode = async () => {
    const res = await api.post("/code/run", {
      code,
      testCases: challenge.testCases,
    });
    setResults(res.data.results);
  };

  if (!challenge) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">{challenge.title}</h1>
        <p className="text-gray-700 mt-2">{challenge.description}</p>

        <div className="mt-6">
          <CodeEditor code={code} setCode={setCode} />
          <button
            onClick={runCode}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Run Code
          </button>
          <ResultPanel results={results} />
        </div>
      </div>
    </>
  );
}
