# Phase 5 Capstone, Demo poolcare technician app
Overview: This demo is a companion app for a pool technician that allows them to add clients, pools, update visits, view current pools, clients, and previous visits. The purpose of this project is to demo the ideas in real time.

## Features!

### Sign In Page:
User must sign in first using my 2 moc accounts,
### username: MikeMike
### password: letsgetThisWIN

### username: Lwest
### password: c0dingsGR8T

# QUICK NOTE 1:
To refresh the database for the website after deleting/adding anything, go into the terminal while in /server and type in: python seed.py
# Quick NOTE 2:
On start up you will be presented with localhost:3000, to access the actual starting page type in /signin at the end of localhost in the search bar (should look like this localhost:3000/signin).

### DashBoard:
On sign in you will be loaded into the dash board, from here a user can navigate the website using the nav bar that is at the top of the page. 
RECOMMENDED to click and read the App Help page first before moving forward!

### Help Page:
A general set of bullet points outlineing the website and how it functions. 

### Nav Bar:
The website features a navigation bar with quick links to the DashBoard, Clients page, Daily Routes, App Help page, Pool Visit page.

### Clients Page:
View the pre-assigned clients for the given tech, you can also add clients through a form here.

### Daily Route Page:
View the pre-assigned route for the given tech, you can also add pools through a form here.

### Pool Visits Page:
View the past pool visits and either update or delete them entirely with the form included. 

# Getting Started

### Prerequisites

- Ensure you have SQL installed on your system.

- Installation

- Clone the repository: git clone git@github.com:BootsRngr94/phase-5-capstone.git

- Navigate to the project directory: cd phase-5-capstone

## Set up the database:

- in a new terminal

- $pipenv install && pipenv shell 

- $cd server

- $python app.py

## Run the application: 
- in a new terminal 

- $cd client

- $npm install

- $npm start

## Seed database: 
- in a new terminal

- $pipenv shell

- $python server/seed.py


## Special Thanks:
Thank you Tyler and Eleanor, my Flat Iron instuctors, for the crazy amount of patience and time they gave to help get me to this point in my software engineer journey!