# IT5007Project-RuntimeTerror

**instructions**
If you use docker ,please expose the port 3000(for the frontend) and 3333(for the database).
install nvm to use the latest node and npm.
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 14.7.0
nvm use 14

```
**pull the code**
```
git init
git pull https://github.com/Ginfine/IT5007Project-RuntimeTerror.git maincode
```
**run the code**
Please keep running the three things below.(backend,database,frontend)
```
cd api
npm install
mkdir public
npm start

cd database
nvm install 18
nvm use 18
npm install -g@sanity/cli
sanity install
sanity init
(login by google and choose runtimeterror)

sanity start --host=0.0.0.0

cd frontend
npm install
npm run
```
 
