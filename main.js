// const { router } = require("json-server");
//main.js
const { useForm } = ReactHookForm;
const { useState, useEffect } = React;

const BASE_URL = "http://localhost:9000";

function translateStatusToErrorMessage(status) {
  switch (status) {
    case 401:
      return "Please sign in again.";
    case 403:
      return "You do not have permission to view the data requested.";
    default:
      return "There was an error saving or retrieving data.";
  }
}

async function checkStatus(response) {
  if (response.ok) return response;

  const httpError = {
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    body: await response.text(),
  };
  console.log(`http error status: ${JSON.stringify(httpError, null, 1)}`);

  let errorMessage = translateStatusToErrorMessage(httpError.status);
  throw new Error(errorMessage);
}

function parseJSON(response) {
  return response.json();
}

function delay(ms) {
  return function (x) {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

const url = `${BASE_URL}/teams`;
const teamAPI = {
  list() {
    return fetch(url).then(checkStatus).then(parseJSON);
  },
  find(id) {
    return fetch(`${url}/${id}`).then(checkStatus).then(parseJSON);
  },
  insert(team) {
    return fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(team),
    })
      .then(checkStatus)
      .then(parseJSON);
  },
};

function TeamList() {
  const [busy, setBusy] = useState(false);
  const [teams, setTeams] = useState([]);
  async function loadTeams() {
    try {
      setBusy(true);
      let data = await teamAPI.list();
      setTeams(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(function () {
    loadTeams();
  }, []);

  return (
    <div className="list mt-2">
      {busy && <p>Loading...</p>}
      {teams?.map((team) => (
        <div className="card p-4" key={team.name}>
          <strong>{team.name}</strong>
          <div>{team.division}</div>
          <Link className="" to={`/teams/edit/${team.id}`}>
            Edit Team
          </Link>
        </div>
      ))}
    </div>
  );
}

// function App() {
//   return (
//     <div className="container">
//       <TeamList />
//     </div>
//   );

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);
const {
  BrowserRouter: Router,
  Route,
  Routes,
  Link,
  NavLink,
  Navigate,
  useParams,
  useLocation,
  useNavigation,
  useNavigate,
} = window.ReactRouterDOM;

// function App() {
//   return (
//     <div className="container">
//       <TeamList />
//     </div>
//   );

// components UI

function HomePage() {
  return <h1>Home</h1>;
}
function TeamsPage() {
  return (
    <div>
      <h2>Teams</h2>
      <Link className=" btn btn-secondary" to="/TeamCreatePage">
        Create Team
      </Link>
      {/* <Link className="btn btn-primary" to="/TeamEditPage">
        {" "}
        Edit Team
      </Link> */}
      <TeamList />
    </div>
  );
}
function PlayersPage() {
  return <h2>Players</h2>;
}
function TeamCreatePage() {
  return (
    <div>
      <header>
        <h2>Create a team</h2>
        <TeamForm />
      </header>
    </div>
  );
}

function TeamEditPage() {
  const { id: idFromUrl } = useParams();
  const id = Number(idFromUrl);
  return (
    <div>
      <header>
        <h2>Edit Team</h2>
        <hr />
      </header>

      <form className="w-25">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name
          </label>
          <input id="title" type="text" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="Team Name" className="form-label">
            Confrence
          </label>
          <input id="Team Name" type="text" className="form-control" />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
}

function TeamForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  async function Save(team) {
    try {
      setBusy(true);
      let newTeam = await teamAPI.insert(team);
    } catch (error) {
      setError(error.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {busy && <p>saving...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="w-25 " onSubmit={handleSubmit(Save)}>
        <div className="mb-3">
          <label htmlFor="Team name" className="form-label">
            Team Name
          </label>
          <input
            id="name"
            type="text"
            className={`form-control ${errors.name && "is-invalid"}`}
            {...register("team", { required: "Team Name is required" })}
          />
        </div>
        <p className="invalid-feedback">{errors.team?.message}</p>
        <div className="mb-3">
          <label htmlFor="Confrence" className="form-label">
            Confrence
          </label>
          <input id="Confrence" type="text" className="form-control" />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className=" btn btn-primary">
            Save
          </button>
          <button className="btn btn-secondary "> Cancel</button>
        </div>
      </form>
    </>
  );
}

/* {teams.map((team) => (
        <div key={team.id} className="team-card mb-3 p-3 border">
          <h2>{team.name}</h2>
          <Link to={`/TeamEditPage${team.id}`}>Edit Team</Link>
        </div>
      ))}
  ); */

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="my-4 mb-5">
          <ul className="nav ">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/teams/create" className="btn btn-primary">
                Team Create
              </NavLink>
            </li> */}

            <li className="nav-item">
              <NavLink className="nav-link" to="/players">
                Players Page
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="teams" element={<TeamsPage />} />
            <Route path="players" element={<PlayersPage />} />
            <Route path="TeamCreatePage" element={<TeamCreatePage />} />
            <Route path="teams/edit/:id" element={<TeamEditPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
