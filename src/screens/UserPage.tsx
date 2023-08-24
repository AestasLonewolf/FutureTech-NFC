import { useEffect, useState } from "react";
import Button from "../components/Button";

interface User {
  id: string;
  username: string;
  email: string;
  dob: string;
}

interface Visit {
  location: string;
  date: string;
}

export default function UserPage({
  userId,
  onLogout,
}: {
  userId: string;
  onLogout: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [visits, setVisits] = useState<Visit[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/${userId}`).then((res) =>
      res.json().then((data) => {
        console.log("Fetched data from API:", data);

        setUser(data.user);
        setVisits(data.visits);
      })
    );
  }, [userId]);
  return (
    <div className="mx-auto my-10">
      <div className="text-center font-bold text-3xl flex flex-col my-10 w-2/3 mx-auto">
        Welcome <span>{user?.username}!</span>
      </div>

      <div>
        <div className="text-center font-medium text-lg my-5">
          You've visited {visits.length} times this week!
        </div>
        <div className="">
          {visits.map((visit) => (
            <div
              key={visit.date}
              className="border-b border-secondary/75 flex flex-col"
            >
              <div className="mx-3 my-1">
                <div className="font-bold">{visit.location}</div>
                <div className="font-medium text-secondary/75">
                  {new Date(visit.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(visit.date).toLocaleTimeString("en-us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hourCycle: "h24",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-2/3 mx-auto my-10">
          <Button text="Logout" onClick={onLogout} />
        </div>
        <div className="absolute bottom-0 left-3 text-secondary/50">
          User ID: <span>{userId}</span>
        </div>
      </div>
    </div>
  );
}
