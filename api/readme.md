****************************************************************************
we aaded json file of postman download it and import it in your postman if you have any query regarding how to pass payload

****************************************************************************

****************************************************************************
  ****provide header which contains token ****
  headers:{
        authorization:token
    }

all opration except sign up and login required token in header section.
****************************************************************************
---------------------------------------------------------------------------------------

after cloning please type following command

npm i
---------------------------------------------------------------------------------------
after that you should run the following command for starting server

npm start

---------------------------------------------------------------------------------------
for Signup you have following url
 
 
 url=http://localhost:8800/user/sign-up

---------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------
 for login you have following url

  url= http://localhost:8800/user/login
---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for "profile" update you have following url
refer to update profile page

http://localhost:8800/user/edit/userId


---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for updating password
FIELDS:oldPassword password confirmPassword

{
     "userId":"626cc7c1a96f2615ea63ab8d",
     "previousPassword":"11111111111@",
     "newPassword":"67767677676878@"
}

URL : http://localhost:8800/user/edit-profile/changepassword/:userId

---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for adding new post

URL : http://localhost:8800/posts/create

for payload refer to postman file

---------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------
for getting all posts


URL:http://localhost:8800/posts/?page=1&limit=2

---------------------------------------------------------------------------------------




---------------------------------------------------------------------------------------
for adding comment on pertcular post
here post id is required for adding comment

FIELDS:comment
payload:{
    "comment":"thank u all",
   "userId":"626cc7c1a96f2615ea63ab8d"
}

URL : http://localhost:8800/posts/:postId/comment

---------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------

for adding like on pertcular post
payload:{
    "userId":"626bf3b950caa006cbeb38c2"
}
URL : http://localhost:8800/posts/:postId/like

---------------------------------------------------------------------------------------