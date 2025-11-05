import { Link } from "react-router";
import { useRobots } from "./hooks/use-robots";

function RobotsList() {
  const { robots, isLoading } = useRobots();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (robots.length === 0) {
    return <div>No robots found.</div>;
  }

  return (
    <div>
      <h1>Robots List</h1>
      <ul>
        {robots.map((robot) => (
          <Link key={robot.serial_number} to={`/robots/${robot.id}`}>
            <li>
              {robot.name} (Serial: {robot.serial_number})
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export { RobotsList };
