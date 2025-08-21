import { Link } from "react-router-dom";

export default function ChallengeCard({ challenge }) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-bold">{challenge.title}</h2>
      <p className="text-gray-600">{challenge.description.slice(0, 100)}...</p>
      <Link
        to={`/challenges/${challenge.id}`}
        className="text-blue-600 mt-2 block"
      >
        Solve →
      </Link>
    </div>
  );
}
