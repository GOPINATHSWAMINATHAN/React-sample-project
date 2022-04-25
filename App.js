import React from "react";
import { useState, useEffect } from "react";
import Students from "./students/Students";
import SearchName from "./students/NameSearch";
import SearchTag from "./students/SearchTag";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";


const App = () => {
  const [studentData, setStudentData] = useState([]);
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // API CALL

  async function fetchURL(url) {
    const response = await fetch(url);
    const data = await response.json();
    const students = data.students;
    students.forEach((student) => {
      student.tags = [];
    });
    setStudentData(students);
  }

  //USE EFFECT
  useEffect(() => {
    fetchURL(`https://api.hatchways.io/assessment/students`);
  }, []);

  // Searching Name

  const nameFilter = (filterString) => {
    if (filterString && filterString.toLowerCase) {
      filterString = filterString.toLowerCase();
    }
    let filtered = [];
    studentData.forEach((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();

      if (!filterString || fullName.includes(filterString)) {
        filtered.push(student);
      }
    });
    return filtered;
  };
  // TO FIND AN AVERAGE GRADE

  function getAverage(array) {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += parseInt(array[i]);
    }
    let totalAverage = total / array.length;
    return totalAverage;
  }

  // Tag Search

  const searchTags = (tagInput) => {
    if (tagInput && tagInput.toLowerCase) {
      tagInput = tagInput.toLowerCase();
    }

    let searchTagsArray = [];
    studentData.forEach((student) => {
      let tagExists = false;
      student.tags.forEach((t) => {
        if (t.toLowerCase().includes(tagInput)) {
          tagExists = true;
        }
      });

      if (!tagInput || tagExists) {
        searchTagsArray.push(student);
      }
    });
    return searchTagsArray;
  };
  // Add tag to student

  const createTag = (student, newTag) => {
    student.tags.push(newTag);

    const indexOfStudent = studentData.findIndex((s) => s.id === student.id);
    let dataWithChanges = [
      ...studentData.slice(0, indexOfStudent),
      student,
      ...studentData.slice(indexOfStudent + 1),
    ];
    setStudentData(dataWithChanges);
  };

  const filteredByNameStudents = nameFilter(studentNameFilter);
  const filteredByTagStudents = searchTags(tagFilter);
  const combinedFilteredStudents = [];

  //Combining the search

  filteredByNameStudents.forEach((student) => {
    if (filteredByTagStudents.includes(student)) {
      combinedFilteredStudents.push(student);
    }
  });

//return UI
  return (
    <div className="container">
      <Card style={{borderRadius: '10px', overflow: 'hidden',elevation:'5px'}} >
        <CardContent>
          <div className="searchName" fontFamily="Raleway" fontSize="100px">
            <SearchName
              handleNameSearch={setStudentNameFilter}
              placeholder="Search by name"
            />
          </div>

          <div className="searchTag" fontFamily="Raleway">
            <SearchTag
              handleSearchTag={setTagFilter}
              placeholder="Search by tag"
            />
          </div>
          <div style={{overflow:"auto", height:"500px"}}>
            {" "}
            <Students
              students={combinedFilteredStudents}
              handleAverage={getAverage}
              createTagForStudent={createTag}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
