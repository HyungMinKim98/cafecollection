import { useQuery } from 'react-query';

const fetchCafes = async () => {
  const res = await fetch('http://localhost:5001/api/cafes');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

function CafeList() {
  const { data, error, isLoading } = useQuery('cafes', fetchCafes);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h1>Cafes</h1>
      <ul className="list-group">
        {data.map((cafe: any) => (
          <li className="list-group-item" key={cafe._id}>{cafe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CafeList;
