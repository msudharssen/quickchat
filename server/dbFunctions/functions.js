const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: 'chatEz',
}).promise();

async function register(user, email, pass){
    let hashed = await bcrypt.hash(pass, saltRounds);
    let result = await pool.query("Select * FROM users WHERE username = (?)", [user]);
    if (result && result[0] && result[0].length === 0 && hashed!=='') {
    let insertQuerry = await pool.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?);", [user, email, hashed]);
    console.log(insertQuerry);
    console.log("Registration Completed")
    return 1
    }
    else{
        console.log("Username Already Exists");
        return 2
    }
}

async function login(username, passW){
    let userInformation = '';
    let isMatch = false;
    await pool.query(`Select * FROM users WHERE username = '${username}';`).then(res =>{
        userInformation = res[0];
    }).catch(err =>{
        console.log(err);
    });

    if(userInformation.length > 0){
        isMatch = await bcrypt.compare(passW, userInformation[0].password);
    }
    return isMatch;
}


async function storeMessage(senderId, receiverId, messageContent, number) {
  let idSenderResult = await pool.query(`select id from users where username = ?;`,[senderId])
  let idRecieverResult = await pool.query(`select id from users where username = ?;`,[receiverId])
//   console.log(idSenderResult)
//   console.log(idRecieverResult)
  let idSender = idSenderResult[0][0]?.id
  let idReciever = idRecieverResult[0][0]?.id
  if(idSender!=0 && idReciever!=0 && number==2){
//   console.log(`ID OF SENDER IS: ${idSender}`)
//   console.log(`ID OF RECIEVER IS: ${idReciever}`)
 let result = await pool.query(`INSERT INTO messages (sender_id, receiver_id, message, status) VALUES (?, ?, ?, 'sent')`, 
[idSender, idReciever, messageContent]);
//   console.log(result)
//   console.log(`Message sent from ${senderId} to ${receiverId} has been Stored :)`)
  return result
  }
  else if(idSender!=0 && idReciever!=0 && number==1){
    // console.log(`ID OF SENDER IS: ${idSender}`)
    // console.log(`ID OF RECIEVER IS: ${idReciever}`)
    let result = await pool.query(`INSERT INTO messages (sender_id, receiver_id, message, status) VALUES (?, ?, ?, 'read')`, 
    [idSender, idReciever, messageContent]);
    // console.log(result)
    // console.log(`Message sent from ${senderId} to ${receiverId} has been Stored :)`)
    return result
    }
  else{
    // console.log("Error: Sender or Reciever Not Found")
  }
}

async function retrieveMessage(userId, recieverId) {
    let first = await pool.query(`SELECT id FROM users
    WHERE username = ?;`,[userId])
    let second = await pool.query(`SELECT id FROM users
    WHERE username = ?;`,[recieverId])

    console.log("First query result:", first);
    console.log("Second query result:", second);

    let usId = first[0][0].id
    let recId = second[0][0].id

    console.log(usId, recId)
  

    let allMessages = await pool.query(`SELECT * FROM messages
    WHERE (sender_id = ? AND receiver_id = ? OR receiver_id = ? AND sender_id = ?) 
    AND (status = 'sent' OR status = 'read')
    ORDER BY created_at ASC;`,[usId, recId, usId, recId])

    if (!usId || !recId) {
        console.log("One or both user IDs not found.");
        return { user: usId || -1, receiver: recId || -2, messages: [] };
    }

    console.log("All Messages are: ", await allMessages)

    toRet = {user: usId, receiver: recId, messages: allMessages}

   
    return await toRet;
}

async function retrieveFriendsList(userId) {
    console.log("initially", userId)

    let myId = await pool.query(`SELECT id FROM users
    WHERE username = ?;`,
    [userId])
    let users = await myId[0][0].id
    console.log('SUDHARSSEN', users)
    let idList = await pool.query(`SELECT sender_id, receiver_id FROM friends
    WHERE sender_id = ? AND status = 'sent' group by sender_id, receiver_id;`,[users])

    let copy = await idList
    console.log("COPY", copy)
    let result = []
    for (let i = 0; i < copy[0].length; i++) {
        let userNameResult = await pool.query(`SELECT username FROM users WHERE id = ?;`, [idList[0][i]?.receiver_id]);
        console.log(userNameResult[0][0]?.username)
        result.push(userNameResult[0][0]?.username);
    }

    console.log(result)
    return result

   
   
}

async function findUser(send_id, rec_id) {
    console.log("RECIEVER ID FROM FIND USER FUNCTION", rec_id)
    let myId = await pool.query(`SELECT id FROM users
    WHERE username = ?;`,
    [send_id])
    console.log("id is:", await myId[0][0].id)
    let idOfFriend = await pool.query(`SELECT id FROM users
    WHERE username = ?;`,
    [rec_id])

    if(!idOfFriend && !idOfFriend[0][0].id){
        return 100
    }

    let previousRequest = await pool.query("Select * FROM friends WHERE sender_id = (?) and receiver_id = (?)", [myId[0][0]?.id, idOfFriend[0][0]?.id]);
    if (previousRequest && previousRequest[0].length != 0) {
        return 400
    }
    console.log("id is:", await idOfFriend[0][0].id)
    let list = await pool.query(`INSERT INTO friends (sender_id, receiver_id, status) VALUES (?, ?, 'sent');`,
    [myId[0][0].id, `${idOfFriend[0][0].id}`])

    let list2 = await pool.query(`INSERT INTO friends (sender_id, receiver_id, status) VALUES (?, ?, 'sent');`,
    [`${idOfFriend[0][0].id}`, myId[0][0].id])

    console.log("Username is: ", await list)
    console.log("Friend is: ", await list2)
   
    return 200;
}




module.exports = {register, login, storeMessage,findUser, retrieveMessage, retrieveFriendsList};
