 #!/bin/bash                                                                               
   read -p "Enter MongoDB username: " username                                               
   read -p "Enter MongoDB password: " password                                               
   read -p "Enter MongoDB database: " database                                               
                                                                                             
   mongo <<EOF                                                                               
   use $database                                                                             
   db.createUser({                                                                           
     user: '$username',                                                                      
     pwd: '$password',                                                                       
     roles: [{ role: 'dbOwner', db: '$database'}],                                           
   })                                                                                        
   EOF                                                                                       
                                                                                             
   echo "Credentials:"                                                                       
   echo "Username: $username"                                                                
   echo "Password: $password"                                                                
   echo "Database: $database"                                                                
   echo "Port: 27017 (default MongoDB port)"   