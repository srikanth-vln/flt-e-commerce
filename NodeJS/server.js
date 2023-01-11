const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const sql = require('mssql')
const { pipeline } = require('stream')

const app = express()
const port = process.env.PORT || 5000

const config = {
    user: "master",
    password: "master",
    server: "HDC3-LX-BDJYRR3\\SQLEXPRESS01",
    database: "internalDB",
    port: 1433,
    options: {
        encrypt: false,
        useUTC: true,
    }
};

const pool = new sql.ConnectionPool(config)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())


app.get('/', async (req, res) => {
    console.log("DB Connected")
    res.send("API Layer is running")
})
app.get('/validate/:user/:pass', async( req,res)=>{

    try {
        await pool.connect();
        let result = await pool.request()
                                .input("UserName", req.params.user)
                                .input("Password",req.params.pass)
                                .query("EXEC validateUser @UserName, @Password"); 
        console.log(result)
        res.status(200).json(result.recordset.length==1 ? true : false);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})
app.get('/getAllProducts', async (req, res) => {
    try {
        await pool.connect();
        let result = await pool.request().input("ID", 0).query("EXEC getProducts @ID");
        console.log(result)
        res.status(200).json(result.recordset);
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

app.get('/getProduct/:id', async (req, res) => {
    try {
        let productID = req.params.id
        await pool.connect();
        let result = await pool.request().input("ID", productID).query("EXEC getProducts @ID");
        res.json(result.recordset);
    }
    catch (error) {
        res.status(500).json(error);
    }
})

app.post('/saveCartItems/:user', async(req,res)=> {
    try {
        await pool.connect();
        await pool.request()
                    .input("Input", sql.TYPES.NVarChar, JSON.stringify(req.body))
                    .input("UserName",req.params.user)
                    .query("EXEC updateProductsOfUser @Input, @UserName")
        res.status(200).send(true)
    }
    catch(error) {
        console.log(error)
        res.status(500).send(false)
    }

})

app.get('/getCartItems/:user', async(req,res)=> {
    try {
        await pool.connect();
        let result = await pool.request()
                            .input('UserName', req.params.user)
                            .query('EXEC getCartItems @UserName')
        res.send(result.recordset)
    }
    catch(error) {
        res.status(500).json(error)
    }
})

app.listen(port, () => {
    console.log('This app is listening at ' + port)
})