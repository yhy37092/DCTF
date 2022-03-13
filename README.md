# Decentralized CTF platform
DCTF is a decentralized application based on ethereum. The purpose of this dApp is to provide a decentralized platform where approved ethereum account can hold a CTF contest.
# Usage
### 1. Install dependency
```
# in dir DCTF
npm install

# in dir app
npm install

# if you haven't installed Ganache yet
npm install ganache --global

# if you haven't installed Truffle yet
npm install truffle --global
```
### 2. Start ganache-cli
```
# in dir DCTF
npm run ganache-cli
```
### 3. Deploy smart contract
```
# in dir DCTF
npm run migrate
```
### 4. Start local server
```
# in dir app
npm run start
```
