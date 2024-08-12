const { useForm } = ReactHookForm;
const { useState } = React;

function ContactUsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function send(formData) {
    console.log("Form submitted:", formData);
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(send)}>
      <div className="mb-3">
        <label htmlFor="department" className="form-label">
          Department
        </label>

        <select
          id="department"
          className={`form-select ${errors.department ? "is-invalid" : ""}`}
          {...register("department", { required: "Department is required" })}
        >
          <option value="">Select...</option>
          <option value="hr">Human Resources</option>
          <option value="pr">Public Relations</option>
          <option value="support">Support</option>
        </select>
        {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>

        <textarea
          id="message"
          className={`form-control ${errors.message ? "is-invalid" : ""}`}
          {...register("Message", { required: "must include message" })}
        />
      </div>
      {errors.department && <div className="invalid-feedback">{errors.department.message}</div>};
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="agreedToTerms"
          className={`form-check-input ${errors.agreedToTerms ? "is-invalid" : ""}`}
          {...register("agreedToTerms", { required: "must agree to terms" })}
        />
        <label htmlFor="agreedToTerms" className="form-check-label">
          I agree to the terms and conditions.
        </label>
        {errors.agreedToTerms && <div className="invalid-feedback">{errors.agreedToTerms.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Send
      </button>
    </form>
  );
}

function App() {
  return (
    <div className="container">
      <ContactUsForm />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);