# DASS ASSIGNMENT 1
Commands are as follows:
### TO RUN  

```bash
 sudo docker-compose build
 sudo docker-compose up
 ```

### TO STOP

```bash
sudo docker-compose down
```

## Assumptions

### LOGIN AND REGISTRATION

- Email and password fields are used for authentication since email is unique.
- After registration is done, user is redirected to login page.

### MY SUBGREDDIITS PAGE

- {Email, name} of a subgreddiit is used as a primary key to identify a subgreddiit i.e. two different users can have subgreddit name but a user should not have two subgreddits with same name.

### Sub GREDDIIT PAGE

- The blocked users(email of user) are shown in different colour, below users.

### Sub GREDDIITS PAGE

- For blocked and left users(email of user), join button is shown and is disabled.
