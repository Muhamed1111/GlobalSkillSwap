// import React, { useState } from "react";

// const CreateJob = () => {
//   const [job, setJob] = useState({
//     jobTitle: "",
//     companyName: "",
//     location: "",
//     employmentType: "",
//     salaryRange: "",
//     jobDescription: "",
//     requirements: "",
//     manager_id: "",
//   });

//   const handleChange = (e) => {
//     setJob({ ...job, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("http://localhost:8080/api/jobs", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(job),
//     });
//     if (res.ok) {
//       alert("Job successfully added!");
//       setJob({
//         jobTitle: "",
//         companyName: "",
//         location: "",
//         employmentType: "",
//         salaryRange: "",
//         jobDescription: "",
//         requirements: "",
//         manager_id: "",
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Job Offer</h2>
//       {Object.keys(job).map((key) => (
//         <input
//           key={key}
//           name={key}
//           placeholder={key}
//           value={job[key]}
//           onChange={handleChange}
//           required={key !== "salaryRange" && key !== "manager_id"}
//         />
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default CreateJob;



import React from 'react'

const CreateJob = () => {
  return (
    <div></div>
  )
}

export default CreateJob