import React from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    // const res = async () => {
    //   const response = await axios.get("http://localhost:8000/api/v1/teams/", {
    //     headers: {
    //       Authorization:
    //         "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzMDUzNTA1LCJqdGkiOiJmMWEyMWU4ZDAwODQ0YmQ4OWQxYjJiYTVmZGZiZDJlMSIsInVzZXJfaWQiOjJ9.nRkgM1JLg5jpxmpgEy3VNZgNQeOU694ULFoaRyUu7b0",
    //     },
    //   });
    //   setTeams(response.data);
    //   console.log(response.data);
    //   console.log(teams);
    // };
    // res();
    axios
      .get("http://localhost:8000/api/v1/teams/", {
        headers: {
          Authorization:
            "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzMDUzNTA1LCJqdGkiOiJmMWEyMWU4ZDAwODQ0YmQ4OWQxYjJiYTVmZGZiZDJlMSIsInVzZXJfaWQiOjJ9.nRkgM1JLg5jpxmpgEy3VNZgNQeOU694ULFoaRyUu7b0",
        },
      })
      .then((res) => setTeams(res.data))
      .catch((e) => console.log("error"));
  }, []);
  console.log(teams);

  return <div className="App">a</div>;
}

export default App;
