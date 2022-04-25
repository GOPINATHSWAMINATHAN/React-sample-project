import React from "react";
import { useState } from "react";

const GetStudent = ({
  id,
  img,
  firstName,
  lastName,
  email,
  company,
  skill,
  average,
  grades,
  student,
  createTagForStudent,
  tag,
}) => {
  const [showGrades, setShowGrades] = useState(false);
  const [newTagName, setNewTagName] = useState("");

  const fullName = `${firstName} ${lastName}`;

  // ADD TAG TO THE STUDENTS

  function saveTag() {
    createTagForStudent(student, newTagName);
  }

  return (
    <div className="getStudent" style={{padding:"0px"}}>
      <img src={img} className="img" alt="avatar" width="50" height="50" />
      <div className="name"></div>
      <h2> {fullName}</h2>
      <button
        className="button"
        onClick={() => {
          setShowGrades(!showGrades);
        }}
        style={{background:"white"}}
      >
        {showGrades ? "-" : "+"}
      </button>
      <div>
        <div className="info"> Email: {email} </div>
        <div className="info"> Company: {company} </div>
        <div className="info"> Skill: {skill} </div>
        <div className="info"> Average: {average}%</div>
      </div>
      <div>
        {showGrades &&
          grades.map((grade, index) => {
            return (
              <div className="testItem" key={grade + " " + index}>
                <div>
                  {" "}
                  Test {index + 1} : {grade}%{" "}
                </div>
              </div>
            );
          })}
      </div>
      <div className="tagContainer">
        {" "}
        {
          // SHOWS THE TAG FOR INDIVIDUAL STUDENT
          student.tags.map((tag, index) => {
            return (
              <div className="tags" key={student.id + " " + tag}>
                {tag}
              </div>
            );
          })
        }
      </div>
      <div>
        <input // TO GENERATE TAG BUTTON UPON CLICKING ENTER
          onChange={(event) => {
            setNewTagName(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              saveTag();
              event.target.value = "";
            }
          }}
          type="text"
          placeholder="Add a tag"
          className="tagAdder"
        />
      </div>

      <hr></hr>
    </div>
  );
};

export default GetStudent;
