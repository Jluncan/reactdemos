const { useForm } = window.ReactHookForm;

function App() {
  const { register, handleSubmit } = useForm();

  const signIn = (data) => {
    console.log(data);
  };

  console.log({ ...register("username") });

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <input type="text" {...register("username")} placeholder="Username" />
      <input type="password" {...register("password")} placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
