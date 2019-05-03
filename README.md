# Port-fol.io
A modern development portfolio for Ethereum-based projects.

## Background
Ethereum is an exciting new blockchain technology that has the ability to disrupt major global industries. However, Ethereum, and its programming language, Solidity, are still in their nascent stages. 
As a result, the best way to learn how to write and interact with smart contracts is through hands-on experience. This project, "portfolio", was created to learn, document, and gain experience with projects in the Ethereum ecosystem.
Portfolio also is intended to showcase my personal learning experience to employers in an interactive way.

The portfolio project serves as a landing page to various independent submodules, each of which allow for the compilation, deployment, and interaction with smart contracts that seek to solve a specific problem.

## Implementation
The portfolio project is a NodeJS application that uses NextJS as a routing solution. The application uses ReactJS as a front-end framework using Semantic UI styling to provide a clean, appealing user interface.
Projects showcased in the app interact with active, deployed smart contracts that live on the Rinkeby test network. All information displayed in the application is gathered through function calls to these smart contracts.

A live version of the project can be found at https://port-fol.io.

This site is hosted by a small AWS Lightsail instance running Debian 16.04 with a Bitnami NodeJS stack.

## Installation
Use the following steps to install the application locally:
1. Clone this repository into a local directory
2. Run the following in the root directory
```bash
npm install 
```

## Submodules
This projects uses several submodules -- use the following steps to install these modules:
1. Navigate to the ethereum directory
2. Clone the following repositories here:
    ```
    Klmattis/vitae
    Klmattis/campaign
    Klmattis/enact
    Klmattis/comply (WORK IN PROGRESS)
    Klmattis/panacea (WORK IN PROGRESS)
    Klmattis/provenance (WORK IN PROGRESS)
    ```
3. You should now have a structure similar to the following:
    ```
    portfolio/
      |
      +---ethereum/
             |
             +---vitae/
             |
             +---campaign/
             |
             +---enact/
             |
             +---comply/
             |
             +---panacea/
             |
             +---provenance/
   ```
   NOTE: The above only shows the structure for the git repositories          

## Running
1. Navigate to the root directory
2. Run the following to start the local server
```bash
npm run dev
```
3. Open your browser and navigate to localhost:3000

