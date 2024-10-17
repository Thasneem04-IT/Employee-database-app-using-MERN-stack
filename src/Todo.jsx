// import { useEffect, useState } from "react";

// function Todo() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [editId, setEditId] = useState(-1);

//   //Edit
//   const [editTitle, setEditTitle] = useState("");
//   const [editDescription, setEditDescription] = useState("");


//   const apiUrl = "http://localhost:8000";

//   const handleSubmit = () => {
//     setError("");
//     if (title.trim() !== '' && description.trim() !== '') {
//       // Reset error state
      

//       // Fetch API to post the todo item
//       fetch(apiUrl + "/todos", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, description }),
//       })
//         .then((res) => {
//           if (res.ok) {
//             setTodos([...todos, { title, description }]);
//             setMessage("Item added successfully");
//             setTimeout(()=>{
//               setMessage("");
//             },3000)
//             setTitle("");  // Clear the input fields after submit
//             setDescription("");
//           } else {
//             setError("Unable to create Todo item");
//           }
//         })
//         .catch((err) => {
//           setError("Network error: Unable to create Todo item");
//         });
//     } else {
//       setError("Please fill out both fields"); // Error if fields are empty
//     }
//   };

//   useEffect(()=>{
//     getitems()
//   },[])

//   const getitems=()=>{
//     fetch(apiUrl+"/todos")
//     .then((res)=> res.json())
//     .then((res)=>{
//       setTodos(res)
//     })
//   }
//   const handleEdit =(item)=>{
//     setEditId(item._id);
//      setEditTitle(item.title); 
//      setEditDescription(item.description)
//   }

//   const handleUpdate = ()=>{
//     setError("");
//     if (editTitle.trim() !== '' && editDescription.trim() !== '') {
//       // Reset error state
      

//       // Fetch API to post the todo item
//       fetch(apiUrl + "/todos/"+editId, {
//         method: "PUT",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title:editTitle, description:editDescription }),
//       })
//         .then((res) => {
//           if (res.ok) {
//             const updatedTodos = todos.map((item)=>{
//               if (item._id == editId){
//                 item.title = editTitle;
//                 item.description = editDescription;
//               }
//               return item;
//             })
//             setTodos(updatedTodos);
//             setMessage("Item updated successfully");
//             setTimeout(()=>{
//               setMessage("");
//             },3000)
// setEditId(-1)

//             setTitle("");  // Clear the input fields after submit
//             setDescription("");
//           } else {
//             setError("Unable to create Todo item");
//           }
//         })
//         .catch((err) => {
//           setError("Network error: Unable to create Todo item");
//         });
//     } else {
//       setError("Please fill out both fields"); // Error if fields are empty
//     }


//   }

//   const handleEditCancel = ()=>{
//     setEditId(-1)
//   }
  
//   const handleDelete = (id)=>{
//     if(window.confirm('Are you sure want to delete?')){
//       fetch(apiUrl+"/todos/"+id,{
//         method:"DELETE"
//       })
//       .then(()=>{
//         const updatedTodos = todos.filter((item)=> item._id !==id)
//         setTodos(updatedTodos)
//       })
//     }

//   }


//   return (
//     <>
//       <div className="row p-3 bg-secondary text-white">
//         <h1>Project with MERN stack</h1>
//       </div>
//       <div className="row">
//         <h3>Add Users</h3>
//         {message && <p className="text-success">{message}</p>}
//         <div className="form-group d-flex gap-2">
//           <input
//             placeholder="Name"
//             onChange={(e) => setTitle(e.target.value)}
//             value={title}
//             className="form-control"
//             type="text"
//           />
//           <input
//             placeholder="Email"
//             onChange={(e) => setDescription(e.target.value)}
//             value={description}
//             className="form-control"
//             type="text"
//           />
//           <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
//         </div>
//         {error && <p className="text-danger">{error}</p>}
//       </div>
//       <div className="row mt-3">
//         <h3>List</h3>

//         <ul className="list-group">
//           {
//             todos.map((item)=> <li className="list-group-item bg-ilight d-flex justify-content-between align-items-center my-2">
//             <div className="d-flex flex-column">
//               {
//                 editId== -1 || editId !== item._id? <>
//                 <span className="fw-bold">{item.title}</span>
//                 <span>{item.description}</span>
//                 </> : <>
//                 <div className="form-group d-flex gap-2">
//                       <input
//                   placeholder="Name"
//                   onChange={(e) => setEditTitle(e.target.value)}
//                   value={editTitle}
//                   className="form-control"
//                   type="text"
//                 />
//                 <input
//                   placeholder="Email"
//                   onChange={(e) => setEditDescription(e.target.value)}
//                   value={editDescription}
//                   className="form-control"
//                   type="text"
//                 />

//                 </div>
//                 </>
//               }
            
//             </div>
//             <div className="d-flex gap-2">
//             {editId == -1 || editId !== item._id ?<button className="btn btn-secondary " onClick={()=>handleEdit(item)}> Edit</button>:<button onClick={handleUpdate}>Update</button>}
//             {editId == -1?<button className="btn btn-secondary" onClick={()=>handleDelete(item._id)}>Delete</button>:
//             <button className="btn btn-secondary" onClick={handleEditCancel}>Cancel</button>}
//             </div>
//           </li>
//             )
//           }
          
          
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Todo;








import { useEffect, useState, useRef } from "react";
import * as XLSX from "xlsx"; // Importing XLSX for Excel handling

function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);

  // Edit
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Selected todos for bulk delete
  const [selectedTodos, setSelectedTodos] = useState([]);

  // Excel file upload
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null); // Reference for file input

  const apiUrl = "http://localhost:8000";

  const handleSubmit = () => {
    setError("");
    if (title.trim() !== "" && description.trim() !== "") {
      fetch(apiUrl + "/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      })
        .then((res) => {
          if (res.ok) {
            setTodos([...todos, { title, description }]);
            setMessage("Item added successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setTitle("");
            setDescription("");
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch((err) => {
          setError("Network error: Unable to create Todo item");
        });
    } else {
      setError("Please fill out both fields");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    fetch(apiUrl + "/todos")
      .then((res) => res.json())
      .then((res) => {
        setTodos(res);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() !== "" && editDescription.trim() !== "") {
      fetch(apiUrl + "/todos/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedTodos = todos.map((item) => {
              if (item._id === editId) {
                item.title = editTitle;
                item.description = editDescription;
              }
              return item;
            });
            setTodos(updatedTodos);
            setMessage("Item updated successfully");
            setTimeout(() => {
              setMessage("");
            }, 3000);
            setEditId(-1);
            setEditTitle("");
            setEditDescription("");
          } else {
            setError("Unable to update Todo item");
          }
        })
        .catch((err) => {
          setError("Network error: Unable to update Todo item");
        });
    } else {
      setError("Please fill out both fields");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fetch(apiUrl + "/todos/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedTodos = todos.filter((item) => item._id !== id);
        setTodos(updatedTodos);
      });
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm("Are you sure you want to delete the selected todos?")) {
      selectedTodos.forEach((id) => {
        fetch(apiUrl + "/todos/" + id, {
          method: "DELETE",
        }).then(() => {
          const updatedTodos = todos.filter((item) => !selectedTodos.includes(item._id));
          setTodos(updatedTodos);
          setSelectedTodos([]);
        });
      });
    }
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  // Handle checkbox selection
  const handleSelectTodo = (id) => {
    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((todoId) => todoId !== id));
    } else {
      setSelectedTodos([...selectedTodos, id]);
    }
  };

  // Handle Excel file upload
  const handleExcelUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name); // Set the uploaded file name
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming data is in the first sheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(worksheet);

        setExcelData(parsedData); // Set parsed Excel data to state
        console.log(parsedData); // Check the parsed data
      };

      reader.readAsArrayBuffer(file); // Read file
    }
  };

  // Add items from Excel data to MongoDB and refresh frontend
  const handleUploadItems = async () => {
    try {
      for (let item of excelData) {
        const newItem = {
          title: item.title || "", // Title from Excel data
          description: item.description || "", // Description from Excel data
        };
        const response = await fetch(apiUrl + "/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (response.ok) {
          const addedItem = await response.json();
          setTodos((prevTodos) => [...prevTodos, addedItem]); // Update todos with added item
        } else {
          console.error("Error adding item:", response.statusText);
        }
      }
      setExcelData([]); // Clear after upload
      setFileName(""); // Clear the file name
      fileInputRef.current.value = ""; // Clear file input
      getItems(); // Refresh the items list after upload
    } catch (error) {
      console.error("Error uploading items:", error);
    }
  };

  const handleRemoveFile = () => {
    setFileName("");
    setExcelData([]);
    fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="row p-3 bg-secondary text-white">
        <h1>Project with MERN stack</h1>
      </div>
      <div className="row">
        <h3>Add Users</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2">
          <input
            placeholder="Name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Email"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            type="text"
          />
          <button className="btn btn-dark" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger">{error}</p>}
      </div>

      <div className="app-container">
        {/* File input for Excel upload */}
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef} // Use the ref for file input
          onChange={handleExcelUpload}
          disabled={fileName !== ""} // Disable if a file is already uploaded
        />

        {/* Display file name and option to remove it */}
        {fileName && (
          <div>
            <p>Selected File: {fileName}</p>
            <button onClick={handleRemoveFile}>Remove File</button>
          </div>
        )}

        {/* Button to upload the parsed Excel data */}
        <button onClick={handleUploadItems} disabled={excelData.length === 0}>
          Upload Items from Excel
        </button>
      </div>

      <div className="form-select-sm">
        <h3>List</h3>
        <button className="btn btn-dark" onClick={handleBulkDelete}>
          Delete Selected
        </button>
        <ul className="list-group">
          {todos.map((item) => (
            <li
              key={item._id}
              className="list-group-item bg-ilight d-flex justify-content-between align-items-center my-2"
            >
              <input
                type="checkbox"
                checked={selectedTodos.includes(item._id)}
                onChange={() => handleSelectTodo(item._id)}
              />
              <span className="fw-bold">{item.title}</span>
              <span>{item.description}</span>
              <div>
                <button className="btn btn-secondary" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Modal (if using modal for edit, otherwise you can add inline edit functionality) */}
      {editId !== -1 && (
        <div>
          <h3>Edit Todo</h3>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleEditCancel}>Cancel</button>
        </div>
      )}
    </>
  );
}

export default Todo;
