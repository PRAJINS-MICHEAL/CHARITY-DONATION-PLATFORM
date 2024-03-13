const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const { MongoClient } = require('mongodb');
const app = express();


// MongoDB connection setup

//const uri = "mongodb://usetCharity:@cluster0.olsogrc.mongodb.net/";
const uri = "mongodb://usetCharity:hoA5NlBLoXPzrWot@ac-atz4dwh-shard-00-00.olsogrc.mongodb.net:27017,ac-atz4dwh-shard-00-01.olsogrc.mongodb.net:27017,ac-atz4dwh-shard-00-02.olsogrc.mongodb.net:27017/?ssl=true&replicaSet=atlas-jigjsg-shard-0&authSource=admin&retryWrites=true&w=majority"
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));


function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next(); 
  } else {
    return res.redirect('/signin'); 
  }
}

// Define your 'users' collection
const User = client.db('USET-charity').collection('users');

app.use(express.static(__dirname + '/public'));


// Sign-in route
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email, password });

    if (user) {
      
      req.session.user = { name: user.name, email: user.email };
      res.redirect('/profile-index.html'); 
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/profile-index.html', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/private/profile-index.html');
});

app.get('/contact.html', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/private/contact.html');
});

app.get('/dashboard.html', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/private/dashboard.html');
});

app.get('/payment.html', isAuthenticated, (req, res) => {
  res.sendFile(__dirname + '/private/payment.html');
});




app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Name or email already exists' });
    }

    
    else if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    else{
    
    await User.insertOne({ name:name, email:email, password:password });

    /////////////////////////////////////////////////////////////////////////////////
     
    const db = client.db('USET-charity');
    async function createCollection(collectionName) {
        try {
         await db.createCollection(collectionName);
         console.log(`Collection "${collectionName}" created`);
        } catch (error) {
         console.error('Error creating collection:', error);
        }
    }
createCollection(name); 


res.redirect('/signin.html');
//res.status(200).json({ message: 'Sign-up successful' });

  }} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getUserInfo', isAuthenticated, (req, res) => {
  const userInfo = req.session.user;
  if (userInfo) {
      res.json(userInfo); 
  } else {
      res.status(404).json({ message: 'User info not found' });
  }
});



async function getTransactionCount(userId) {
  const userCollection = client.db('USET-charity').collection(userId);

  
  const transactionCount = await userCollection.countDocuments();

  return transactionCount;
}

async function calculateTotalAmount(userId) {
  const userCollection = client.db('USET-charity').collection(userId);

  
  const aggregationPipeline = [
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$amount' }
      }
    }
  ];

  const result = await userCollection.aggregate(aggregationPipeline).toArray();

  if (result.length > 0) {
    return result[0].totalAmount;
  } else {
    return 0; 
  }
}




app.get('/getUserTransactionCount', isAuthenticated, async (req, res) => {
  const userId = req.session.user.name; 

  try {
    
    const transactionCount = await getTransactionCount(userId);

    
    const totalAmount = await calculateTotalAmount(userId);

    res.json({ transactionCount, totalAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
////////////////////////////////////////////////payment//////////////////////////////////////////////////////////////////////////////

app.post('/create-order', (req, res) => {
  const amount = parseInt(req.body.amount);
  const userName = req.session.user.name; 

  if (!userName) {
    return res.status(400).send('User not found');
  }

  
  const payment = {
    amount: amount,
    time: new Date(), 
  };

  
  const userCollection = client.db('USET-charity').collection(userName);
  const result = userCollection.insertOne(payment)
  res.redirect('/dashboard.html')
    
 
});



////////////////////////////////////////////////logout////////////////////////////////////////////////////////////////////////////////
app.get('/logout', (req, res) => {
  
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    
    res.redirect('/signin.html');
  });
});


app.get('/transaction-history', isAuthenticated, async (req, res) => {
  try {
    const userName = req.session.user.name; 

    
    const userCollection = client.db('USET-charity').collection(userName);
    const transactions = await userCollection.find({}).toArray();

    
    res.sendFile(__dirname + '/private/transaction-history.html');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
