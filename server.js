import express from 'express';
import * as fs from 'fs/promises';

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
});

const FILE_PATH = './data.json';

const readData = async() => {
    try {
        const users = await fs.readFile(FILE_PATH);
        return JSON.parse(users);
    } catch(err){
        console.log(err)
        return [];
    }
}

const writeData = async (data) => {
    try {
        await fs.writeFile(FILE_PATH, JSON.stringify(data)) 
    } catch (err) {
        console.log(err)
    }
}

// READ
app.get('/api/users', async (req, res) => {
    const users = await readData();
    res.send(users);
});

// CREATE
app.post('/api/users', async(req, res) => {
    const users = await readData();
    const newUser = { id: Math.floor(Math.random() * 1000000), ...req.body };
    users.push(newUser);
    await writeData(users);
    res.json(newUser);
})

// UPDATE
app.put('/api/users/:id', async(req, res) => {
    const users = await readData();
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if(userIndex === -1){
        res.status(404).send("User not found!")
    }else {
        const updatedUser = { id: parseInt(req.params.id), ...req.body}
        users[userIndex] = updatedUser;
        await writeData(users);
        res.json(updatedUser);
    }
})

// DELETE
app.delete('/api/users/:id', async (req, res) => {
    const users = await readData();
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if(userIndex === -1){
        res.status(404).send("User not found!")
    }else{
        users.splice(userIndex, 1);
        await writeData(users);
        res.sendStatus(200).send("User deleted successfully!");
    }
})


app.listen(3001, () => console.log('Server started on port 3001'));