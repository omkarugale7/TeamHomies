const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
const Cron = require('node-cron');
const connectDB = require('./db');
const User = require('./model/user');
// const DailyUser = require("./../model/dailyusers");
const DailyUser = require('./model/dailyusers');
const Assignment = require('./model/assignment');
const Notice = require('./model/notice');
const Subject = require('./model/subject');
const mime = require('mime');
const fetch = require('node-fetch');
require('dotenv').config();
const userList = require('./notify/user');

connectDB();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});
client.on('ready', () => {
    console.log('Client is ready!');
});

const dataOfSubmitted = [];
var phoneListOfNotSubmitted = [];
var phoneList = {};//this has contacts and prn of everyone from user schema
var subjectList = {};
var studentSemList = {};
var studentNameList = {};
getSubjectsData = async () => {
    await Subject.find().then(subjects => {
        subjects.forEach(subject => {
            const name = subject.code;
            const sem = subject.semester;
            subjectList[name] = sem;
        });
    });
    console.log(`subjectList`);
    console.log(subjectList);
}
getSubjectsData();


getUsersData = async () => {
    await User.find()
        .then(users => {
            users.forEach(user => {
                const phone = user.phone;
                const prn = user.prn;
                const name = user.name;
                const ver = user.verified;
                const sems = user.semester;
                studentNameList[phone] = name;
                phoneList[prn] = phone;
                studentSemList[prn] = sems;
                // var chatId = '91' + phone + '@c.us';
                // if (!ver) console.log(chatId);
            })
            console.log(`phoneList`);
            console.log(phoneList);
            console.log(`studentSemList`);
            console.log(studentSemList);
            console.log(`studentNameList`);
            console.log(studentNameList);
        });
}
getUsersData();
// strictly run this code to add new users in some months
// const addstudentslist = async () => {
//     for (let i in studentNameList) {
//         console.log('runnnnn............');
//         DailyUser.create({
//             'name': studentNameList[i],
//             'phone': i
//         }).then(user => {
//             console.log(user.name + " " + user.phone);
//         })
//     }
// }
// const myTimeout = setTimeout(addstudentslist, 5000);
// myTimeout;



getAssignmentsData = async () => {
    await Assignment.find().then(assignments => {
        assignments.forEach(assignment => {
            const date = new Date();
            if (assignment.assignment_due_time - (date.getTime()) < 86400000) {
                dataOfSubmitted.push(assignment.students_submitted);
                var DuedAssignment = assignment.assignment_subject;
                console.log(DuedAssignment);
                var subjectSem = subjectList[DuedAssignment];
                console.log(`subjectSem`);
                console.log(subjectSem);
                console.log(`DuedAssignment`);
                console.log(DuedAssignment);
                var assignmentName = assignment.assignment_title;
                console.log(`assignmentName`);
                console.log(assignmentName);
                var assignmentSubjectName = assignment.assignment_subject_name;
                console.log(assignment.assignment_subject_name);
                console.log('assignment.assignment_subject_name');
                var studentsSubmittedPrn = [];
                var newDataofSubmitted = dataOfSubmitted[0];
                for (const i of newDataofSubmitted) {
                    studentsSubmittedPrn.push(i.username);
                }
                console.log(`studentsSubmittedPrn`);
                console.log(studentsSubmittedPrn);
                for (const prnn in studentSemList) {
                    if (studentSemList[prnn] == subjectSem && !studentsSubmittedPrn.includes(prnn)) {
                        phoneListOfNotSubmitted.push(phoneList[prnn]);
                    }
                }
                console.log(`phoneListOfSubmitted`);
                console.log(phoneListOfNotSubmitted);
                console.log('dataOfSubmitted');
                console.log(dataOfSubmitted);
                var chatIds = [];
                for (let index = 0; index < phoneListOfNotSubmitted.length; index++) {

                    const chatId = '91' + phoneListOfNotSubmitted[index] + '@c.us';
                    chatIds.push(chatId);
                    // console.log(chatId, 'Hello, this is a reminder for you to submit your assignment.');
                    // client.sendMessage(chatId, 'Hello, this is a reminder for you to submit your assignment.');
                }
                console.log(chatIds);
                client.getChats().then((chats) => {
                    console.log(`chats`);
                    for (let index = 0; index < chatIds.length; index++) {
                        console.log(chatIds[index], `Hello, this is a reminder for you to submit your assignment named ${assignmentName} from subject ${assignmentSubjectName}`);
                        client.sendMessage(chatIds[index], `Hello, this is a reminder for you to submit your assignment named ${assignmentName} from subject ${assignmentSubjectName}`);
                    }

                });
                console.log(phoneListOfNotSubmitted);
                studentsSubmittedPrn = [];
                phoneListOfNotSubmitted = [];
            }
        });
    })
}
// const myTimeout = setTimeout(getAssignmentsData, 50000);
// myTimeout;

// getAssignmentsData();

sendMessage = () => {
    // const message = `Hi,\n\nPlease submit your assignment before 11:00 AM.\n\nThank you.`;

};



// // // sendMessage();
function atTwelveMidnight() {
    Cron.schedule('40 12  * * *', () => {
        getAssignmentsData();
        // sendMessage();
        console.log('yeh raat ko jayega');

    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}

atTwelveMidnight();
function atSaxInMorning() {
    Cron.schedule('1 6  * * *', () => {
        getAssignmentsData();
        // sendMessage();
        console.log('yeh subah ko jayega');

    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}

atSaxInMorning();
function atNight() {
    Cron.schedule('1 11  * * *', () => {
        getAssignmentsData();
        // sendMessage();
        console.log('yeh raat ko 1 hr pehle jayega');

    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}

atNight();

var dailyuserZ = {};
getStudentListForQuotes = async () => {
    await DailyUser.find().then(users => {
        users.forEach(user => {
            const phone = user.phone;
            const name = user.name;
            dailyuserZ[phone] = name;
        });
        console.log('dailyuserZ');
        console.log(dailyuserZ);
    });
}
const myTiimeout = setTimeout(getStudentListForQuotes, 50000);
myTiimeout;
getStudentListForQuotes();

getNoticedata = async () => {
    await Notice.find().then(notices => {
        notices.forEach(notice => {
            console.log(notice);
            const date = new Date();
            if (notice.time - (date.getTime()) < 86400000) {
                var noticeTitle = notice.title;
                var noticeDescription = notice.desc;
                var noticeTime = notice.time;
                var noticeDate = notice.date;
                console.log(noticeTitle);
                console.log(noticeDescription);
                console.log(noticeTime);
                console.log(noticeDate);
                client.getChats().then((chats) => {
                    console.log(`chats`);
                    for (const number in studentNameList) {
                        var chatId = '91' + number + '@c.us';
                        client.sendMessage(chatId, `You have a new notice as follows- \n Notice Title - ${noticeTitle}\n Description ${noticeDescription}\n Date - ${noticeDate}`);
                        // MessageMedia.fromFilePath(C: \Users\OMKAR\OneDrive\Pictures\personal).then(media => {
                        //     // const mimetype = 'jpeg';
                        //     client.sendMessage(chatId, media);
                        // });
                        // const { MessageMedia } = require('whatsapp-web.js');

                        // const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png');
                        // chat.sendMessage(media);
                    }

                });

            }
        });
    });
};


// getNoticedata();
// const myTimeout = setTimeout(getNoticedata, 5000);
// myTimeout;
function atNigh() {
    Cron.schedule('7 0  * * *', () => {
        // getAssignmentsData();
        getNoticedata();
        // sendMessage();
        console.log('yeh raat ko 1 hr pehle jayega');

    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });
}

atNigh();




// client.on('ready', () => {
//     console.log('Client is ready!');
//     client.getChats().then((chats) => {
//         for (let index = 0; index < phoneList.length; index++) {

//             const chatId = '91' + phoneList[index] + '@c.us';
//             console.log(chatId);
//             client.sendMessage(chatId, 'Hello, this is a reminder for you to submit your assignment.');
//         }
//     })
// });










client.on('message', async message => {
    clientinfo = await message.getContact();
    if (message.body.toLowerCase() === 'hi') {
        console.log(clientinfo);
        var Number = clientinfo.number;
        Number = Number.substring(2, Number.length);
        console.log(Number);
        console.log(studentSemList[Number]);
        message.reply(`Hello, ${studentNameList[Number]} how are you? \ndo you need any help.`);
    }
    else if (message.body.toLowerCase() === 'help') {

        message.reply(`Hello, ${studentNameList[Number]}\n you can enter the following commands- \n 1. "motivational quotes" for quotes. \n 2. "send me a coding problem" to get a random coding problem. \n 3. "send me a coding problem difficulty - 'a/b/c/d/e'" to get a problem of your own difficulty choice. \n 4. "attendance" to get your attendance. \n 5. "marks" to get your marks. \n 6. "profile" to get your profile. \n 7. "logout" to logout.`);
    }
    else if (message.body.toLowerCase() === 'pending assignments') {
        const myTimeout = setTimeout(getAssignmentsData, 5000);
        myTimeout;
        if (phoneListOfNotSubmitted.includes(Number))
            message.reply(`Yes You have  pending assignments.`);
    }
    else if (message.body.toLowerCase() === 'what is your name?' || message.body.toLowerCase() === 'what is your name' || message.body.toLowerCase() === 'your name?' || message.body.toLowerCase() === 'your name') {
        message.reply(`My name is KweeBot. I am a bot created by Kwee. I am here to help you with your assignments.`);
    }
    else if (message.body.toLowerCase() === 'send me some motivational quotes' || message.body.toLowerCase() === 'give me some motivational quotes' || message.body.toLowerCase() === 'motivational quotes' || message.body.toLowerCase() === 'send me some inspirational quotes' || message.body.toLowerCase() === 'give me some inspirational quotes' || message.body.toLowerCase() === 'inspirational quotes' || message.body.toLowerCase() === 'quotes' || message.body.toLowerCase() === 'give me some quotes' || message.body.toLowerCase() === 'send me some quotes') {
        function getQuote() {
            return fetch("https://zenquotes.io/api/random")
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    return data[0]["q"] + " -" + data[0]["a"]
                })
        }

        getQuote().then(quote => message.reply(quote));
    }
    else if (message.body.toLowerCase() === 'Unsubscribe from daily quotes') {
        message.reply(`You have been unsubscribed from daily quotes.`);
        delete dailyuserZ[Number];
    }
    else if (message.body.toLowerCase() === 'subscribe to daily quotes') {
        message.reply(`You have been subscribed to daily quotes.`);
        dailyuserZ[Number] = studentNameList[Number];
    }
    else if (message.body.toLowerCase() === 'send me a coding problem') {
        message.reply(`what difficulty you want? \n A. Easy \n B. Easy-Medium \n C. Medium \n D. Medium-Hard \n E. Hard\n(send same query with difficulty)`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - a') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: -  https://codeforces.com/problemset/problem/${num}/A `);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - b') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/B`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - c') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/C`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - d') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/D`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - e') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/E`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - easy') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/A`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - easy-medium') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/B`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - medium') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/C`);
    }

    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - medium-hard') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/D`);
    }
    else if (message.body.toLowerCase() === 'send me a coding problem difficulty - hard') {
        var num = Math.random() * 900;
        num = Math.floor(num);
        message.reply(` Here is your question: - https://codeforces.com/problemset/problem/${num}/E`);
    }
    else if (message.reply.toLowerCase() === 'logout') {
        message.reply(`You have been logged out.\n have a good day!`);

    }
});

client.initialize();