const { useState, useEffect } = React;

const nbaTeams = [
  { name: "Los Angeles Lakers", division: "Pacific" },
  { name: "Chicago Bulls", division: "Central" },
  { name: "Miami Heat", division: "Southeast" },
  { name: "Dallas Mavericks", division: "Southwest" },
];

const teamAPI = {
  list() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(nbaTeams);
      }, 1000);
    });
  },
};

function App() {
  return <TeamList />;
}
function TeamList() {
  const [busy, setBusy] = React.useState(false);
  const [teams, setTeams] = React.useState([]);

  async function loadTeams() {
    setBusy(true);
    let data = await teamAPI.list();
    setTeams(data);
    setBusy(false);
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div>
      <header>
        <link rel="stylesheet" href="styles.css" />
        <h1>Teams</h1>
      </header>
      <div className="list">
        {busy && <div>Loading...</div>}

        {teams.map((team) => (
          <div className="card" key={team.name}>
            <strong>{team.name}</strong>
            <div>{team.division}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);