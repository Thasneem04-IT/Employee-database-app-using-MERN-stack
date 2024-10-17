// //Express
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors')

// const app = express();
// app.use(express.json())
// app.use(cors())

// //Sample DB
// //let todos = []; 

// //connect mongoDB
// mongoose.connect('mongodb://localhost:27017/mern-app')
// .then(() => {
//    console.log('Db connected')
// })
// .catch((err)=>{
//   console.log(err)
// })

// //createing schema
// const todoSchema = new mongoose.Schema({
//   title:{
//     required: true,
//     type : String
//   },
//   description: String
// })
// //create model
// const todoModel = mongoose.model('Todo', todoSchema);

// //Create a new todo item
// app.post('/todos', async(req,res)=>{
//   const {title,description} = req.body;
//   const newTodo = {
//     id: todos.length+1,
//     title,
//     description
//   };
//   todos.push(newTodo);
//   console.log(todos);
//   try{
//     const newTodo = new todoModel({title,description});
//   await newTodo.save();
//   res.status(201).json(newTodo);
//   }catch(error){
//     console.log(error)
//     res.status(500).json({message: error.message});
//   }
//   })



// //Get all items
// app.get('/todos', async(req,res)=>{
//   try{
//     const todos = await todoModel.find();
//     res.json(todos);
//   }catch(error){
//     console.log(error)
//   res.status(500).json({message: error.message});
// }
  
// })

// //Update item
// app.put('/todos/:id', async(req,res)=>{
//   try{
//   const {title,description} = req.body;
//   const id = req.params.id;
//   const updatedTodo = await todoModel.findByIdAndUpdate(
//     id,
//     {title, description},
//     {new: true}
//   )
//   if (!updatedTodo){
//     return res.status(404).json({message:"Todo not found"})
//   }
//   res.json(updatedTodo)
// }catch(error){
//   console.log(error)
//   res.status(500).json({message: error.message});

// }
// })

// //Delete item
// app.delete('/todos/:id', async(req,res)=>{
//   try{
//   const id = req.params.id;
//   await todoModel.findByIdAndDelete(id);
//   res.status(204).end();
//   }catch(error){
//     console.log(error)
//   res.status(500).json({message: error.message});

//   }
// })

// //Start the server
// const port = 8000;
// app.listen(port, ()=>{
//   console.log("Server is listening to port "+port);
// })





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const xlsx = require('xlsx');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Create 'uploads' folder if it doesn't exist
// const uploadDir = './uploads';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mern-app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log('Error connecting to MongoDB:', err.message);
//   });

// // Define Mongoose Schema and Model
// const todoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//   },
// });
// const Todo = mongoose.model('Todo', todoSchema);

// // Multer storage for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Store files in 'uploads' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique timestamp-based filename
//   },
// });
// const upload = multer({ storage: storage });

// // API to upload and process Excel file
// app.post('/upload', upload.single("todos"), async (req, res) => {
//   try {
//     // File path
//     const filePath = req.file.path;
//     // Read Excel file
//     const workbook = xlsx.readFile(filePath);
//     const sheetName = workbook.SheetNames[0]; // Get the first sheet
//     const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert sheet to JSON

//     // Save each row to the database
//     for (let row of sheetData) {
//       const { title, description } = row;
//       if (title && description) {
//         await Todo.create({ title, description });
//       }
//     }

//     // Delete the file after processing (optional)
//     fs.unlinkSync(filePath);

//     res.status(200).json({ message: 'File uploaded and data saved successfully' });
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).json({ message: 'Error uploading file' });
//   }
// });

// // Create a new todo item (manual)
// app.post('/todos', async (req, res) => {
//   const { title, description } = req.body;

//   try {
//     const newTodo = new Todo({ title, description });
//     await newTodo.save();
//     res.status(201).json(newTodo);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Unable to create Todo item' });
//   }
// });

// // Get all todo items
// app.get('/todos', async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.json(todos);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Unable to fetch Todos' });
//   }
// });

// // Update a todo item
// app.put('/todos/:id', async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const id = req.params.id;
//     const updatedTodo = await Todo.findByIdAndUpdate(
//       id,
//       { title, description },
//       { new: true } // Return the updated document
//     );

//     if (!updatedTodo) {
//       return res.status(404).json({ message: 'Todo not found' });
//     }
//     res.json(updatedTodo);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Unable to update Todo' });
//   }
// });

// // Delete a todo item
// app.delete('/todos/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Todo.findByIdAndDelete(id);
//     res.status(204).end(); // Send a 'No Content' status after deletion
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Unable to delete Todo' });
//   }
// });

// // Start the server
// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-app')
  .then(() => {
    console.log('Db connected');
  })
  .catch((err) => {
    console.log(err);
  });

//create schema
const todoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: String
});

//create model
const todoModel = mongoose.model('Todo', todoSchema);

//Create a new todo item
app.post('/todos', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Get all items
app.get('/todos', async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Update item
app.put('/todos/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Delete item
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

//Start the server
const port = 8000;
app.listen(port, () => {
  console.log("Server is listening to port " + port);
});
``

