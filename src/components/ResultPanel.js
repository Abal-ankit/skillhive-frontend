export default function ResultPanel({ results }) {
  if (!results) return null;

  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg">Results</h3>
      {results.map((r, i) => (
        <div
          key={i}
          className={`p-2 mt-2 border ${
            r.passed ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p>
            <b>Input:</b> {JSON.stringify(r.input)}
          </p>
          <p>
            <b>Expected:</b> {JSON.stringify(r.expected)}
          </p>
          <p>
            <b>Output:</b> {JSON.stringify(r.output)}
          </p>
          <p>
            <b>Status:</b> {r.passed ? "✅ Passed" : "❌ Failed"}
          </p>
        </div>
      ))}
    </div>
  );
}
