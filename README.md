# Getting Started with Lecturers example

## **Prerequisites**

If you're running on Windows, start with installing WSL2 (Ubuntu).

More information on how to install WSL: https://docs.microsoft.com/en-us/windows/wsl/install.

`Mysql`

Server must be running and configured with settings you can find in `.env`.

You can execute the DDL in **Backend/sql/create_insert.sql** to get some initial data.

`Node.js`

Install **NVM** (Node Version Manager) by executing following commands:

```
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

If you're on Mac, use Homebrew instead of curl to install NVM:

```
> brew update
> brew install nvm
> mkdir ~/.nvm
```

Edit the ~/.bash_profile OR ~/.zshrc (depending on which shell you use) and add the following line at the bottom:

```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG>[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Reload your shell environment by executing:

```
> source ~/.bash_profile OR source ~/.zshrc
```

Now install **Node.js** using **NVM**.
NVM allows us to install multiple versions of Node.js and easily switch between them.

```
> nvm install 16
> nvm use 16
```

`VSCode`

Throughout the lessons we'll use VSCode for the excerises. Make sure you have the following extensions downloaded and enabled:

-   Prettier - Code formatter
-   Auto Rename Tag
-   GitLens - Git supercharged

Open the settings of VSCode, search for **Format on save** and make sure it's checked. This assures that every time you save a file, it's being formatted according to the code style rules described in **.prettier.rc**.

`Dotenv`

Dotenv is a module to externalize configuration, for instance database connection details.
To get this demo up and running, you'll need to create a **.env** file in you root directory. The contents should look like this :

```
APP_PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_SCHEME=lecturers
```

Replace the values with your local configuration.

## **Starting the demo application**

Run the following commands in a terminal (project root folder) to install all required node packages en get the server up and running:

```
> npm install

> npm start
```

This will start an express server on [http://localhost:3000](http://localhost:3000).
You can test if everything works by requesting http://localhost:3000/status or http://localhost:3000/status/lecturers from a browser or a tool like Postman.

You can access the API documentation and test it via Swagger running on http://localhost:3000/api-docs.

## **Troubleshooting**

### **Network problems in WSL**

If you're having problems in WSL when executing command that require a network connection, like **curl** or **ping**, try the following:

Edit the file **/etc/wsl.conf** and add the lines:

```
[network]
generateResolvConf = false
```

Remove symlink **/etc/resolv.conf**

```
> sudo rm -rf /etc/resolv.conf**
```

Create a new file **/etc/resolv.conf** and add the line:

```
nameserver 8.8.8.8
```

Lock the resolv.conf so it doesn't get overwritten by executing:

```
> sudo chattr +i resolv.conf
```

Restart WSL.

### **Setting WSL as default integrated terminal in VSCode**

In VSCode press **ctr/cmd-shift-p** and type **"Open Settings (JSON)"**.

In the Object **terminal.integrated.profiles.windows** add this entry:

```
"Ubuntu (WSL)": {
    "path": "C:\\WINDOWS\\System32\\wsl.exe",
    "args": ["-d", "Ubuntu"]
}
```

Find the setting **terminal.integrated.defaultProfile.windows** and change it to:

```
"terminal.integrated.defaultProfile.windows": "Ubuntu (WSL)"
```
