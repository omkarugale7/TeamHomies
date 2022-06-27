# **Gurukul**

**Project Description**:</br>
 It is an one stop solution for students of WCE, Sangli which solves multiple problems like uploading assignments, dowloading 
 notes and documents, marking the attendance, etc. It also has a forum where students can interact with other students in case
 they have some doubt about the college.
 For the students, we have created an android application for students and a website for admins where they can assign assignments,
 upload notes, documents, etc.

 We have also created a whatsapp bot for reminding the students about the assignments submission. It can also provide some coding
 problems if student asks for it.

 For the attendance, we have used the location of students so that only those student who are present inside class can give attendance using
 the pin set by teacher. If teacher is taking online session, he can choose not to add location in the session.

 
 ![Snapshots](https://firebasestorage.googleapis.com/v0/b/gurukul-5a194.appspot.com/o/WhatsApp%20Image%202022-06-25%20at%207.30.03%20PM.jpeg?alt=media&token=8127e5cf-1133-4599-8399-8bf64c127bc3)![Screenshot from 2022-06-27 12-48-39](https://user-images.githubusercontent.com/84059221/175884087-f008613c-3ff1-4a6a-bcd1-390b20ddae2a.png)![Screenshot from 2022-06-27 12-48-59](https://user-images.githubusercontent.com/84059221/175884165-1b18a9ce-269d-4f0c-a2b3-a159e7465b4a.png)![Screenshot from 2022-06-27 13-01-55](https://user-images.githubusercontent.com/84059221/175884781-da257d31-475c-4437-903c-8a36389bbe4f.png)![Screenshot from 20![Screenshot from 2022-06-27 13-02-13](https://user-images.githubusercontent.com/84059221/175885029-0d373757-e44b-4021-9d1a-1800fe833b0f.png)
22-06-27 13-02-02](https://user-images.githubusercontent.com/84059221/175884818-07700b9d-0ea6-423d-b8eb-5f66e16884cf.png)![Uploading Screenshot from 2022-06-27 13-02-13.png…]()






Functionality and concepts used:
 * **Libraries**: Glide for displaying images, volley for making network requests
 * **Layouts**: Constraint Layout, Linear Layout, Relative Layout, CardView
 * **Recycler View**: To display subject list, assignments, notes, documents list Recycler View is used
 * **SharedPreference**: To store authentication token, username of students in local storage
 * **Firebase Storage** : For uploading the assignments, notes, documents
 * **Fragments** : There is a bottom navigation and user can navigate between different fragments like profile, home and Forum. 
       For navigating in different fragments, we have used navigation component

How to use our project : 
* **App Link** : https://drive.google.com/drive/folders/1Ujk4Znb_sX9-pqH7dZeF2OAXMjfSV3yU </br>
* **WEBSITE**: 1.Clone this repository 2.Open Gurukul-web directory in your terminal 3.run "npm i" command 4.run "npm start" command to start the admin portal 5.superadmin credentials: username:'wcegurukul',password : 'wcegurukul' 6.You can create a admin account from super admin.</br>
* **WHATSAPP BOT** : We will be hosting our Bot online making it available to use to everybody. Till then to use whatsapp bot run the index.js file in WhatsappWebBot folder. to run downlaod node packages. and use node index,js command to run the file. after few seconds a qr code will appear on the terminal, scan it and you're good to go. your mobile no. is now the not. any can send the commands and get replies for that untill the terminal is running. commands that can be used are- 'hi' , 'send me a motivational quote','what is your name',;send me a coding problem',send me a coding problem difficulty - medium' , etc. also the bot sends assignment reminder to those who have pending assignments before 24hrs , 18hrs, 1hr with name and subject of the assignment spceified. we are also working on a feature where message will have a link included which will directly take user into app to submit the assignment. also the bot is hosted on heroku but the qr code is scanned by us so it can be changed whenever wanted.
