import { useEffect, useState } from "react";
import { appClient } from "@/lib/app";
import type { RobotDetail } from "@/lib/app";
import { Link } from "react-router";

function useRobots() {
  const [robots, setRobots] = useState<RobotDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRobots() {
      const res = await appClient.getRobots();
      setRobots(res);
    }
    setIsLoading(false);

    fetchRobots();
  }, []);

  return { robots, isLoading };
}

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
