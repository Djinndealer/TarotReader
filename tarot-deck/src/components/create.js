import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   question:""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newQuestion = { ...form };
 
   await fetch("https://tarotapi.dev/api/v1/cards/random?n=9")
   .then(function (response) {
     return response.json();
   })
   .then(function (response) {
     // handle ten random cards
     console.log(response)
   })
   .catch(function (error) {
     // handle what went wrong
     console.error(error)
   });
  };
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Ask a question</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="question">Repeat out loud and submit</label>
         <input
           type="text"
           className="form-control"
           id="question"
           value={form.question}
           onChange={(e) => updateForm({ question: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Get Your Answer"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}