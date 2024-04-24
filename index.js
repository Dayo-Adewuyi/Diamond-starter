#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateDirectoryStructure() {
    console.log("Creating diamond starter files");
    const directory = process.cwd();
    console.log("Current directory:", directory);

    const directoryStructure = {
        contracts: {
            facets: {
                'DiamondCutFacet.sol': fs.readFileSync(path.join(__dirname, 'contracts/facets/DiamondCutFacet.sol'), 'utf8'),
                'DiamondLoupeFacet.sol': fs.readFileSync(path.join(__dirname, 'contracts/facets/DiamondLoupeFacet.sol'), 'utf8'),
                'OwnershipFacet.sol': fs.readFileSync(path.join(__dirname, 'contracts/facets/OwnershipFacet.sol'), 'utf8')
            },
            interfaces: {
                'IDiamondCut.sol': fs.readFileSync(path.join(__dirname, 'contracts/interfaces/IDiamondCut.sol'), 'utf8'),
                'IDiamondLoupe.sol': fs.readFileSync(path.join(__dirname, 'contracts/interfaces/IDiamondLoupe.sol'), 'utf8'),
                'IERC165.sol': fs.readFileSync(path.join(__dirname, 'contracts/interfaces/IERC165.sol'), 'utf8'),
                'IERC173.sol': fs.readFileSync(path.join(__dirname, 'contracts/interfaces/IERC173.sol'), 'utf8')
            },
            libraries: {
                'LibAppStorage.sol': fs.readFileSync(path.join(__dirname, 'contracts/libraries/LibAppStorage.sol'), 'utf8'),
                'LibDiamond.sol': fs.readFileSync(path.join(__dirname, 'contracts/libraries/LibDiamond.sol'), 'utf8')
            },
            upgradeInitializers: {
                'DiamondInit.sol': fs.readFileSync(path.join(__dirname, 'contracts/upgradeInitializers/DiamondInit.sol'), 'utf8')
            },
            'Diamond.sol': fs.readFileSync(path.join(__dirname, 'contracts/Diamond.sol'), 'utf8')
        },
        scripts: {
            'diamond.js': fs.readFileSync(path.join(__dirname, 'scripts/libraries/diamond.js'), 'utf8'),
            'deploy.js': fs.readFileSync(path.join(__dirname, 'scripts/deploy.js'), 'utf8')
        },
        test: {
            'cacheBugTest.js': fs.readFileSync(path.join(__dirname, 'test/cacheBugTest.js'), 'utf8'),
            'diamondTest.js': fs.readFileSync(path.join(__dirname, 'test/diamondTest.js'), 'utf8')
        },
        'hardhat.config.js': fs.readFileSync(path.join(__dirname, 'hardhat.config.js'), 'utf8')
    };

    // Create each folder
    createFolder(directory, directoryStructure);

    try {
        console.log("Installing dependencies...");
        execSync(
            "npm install hardhat@2.22.3 @openzeppelin/contracts@5.0.1 " +
            "@nomicfoundation/hardhat-verify@2.0.6 @nomiclabs/hardhat-ethers@2.2.3 " +
            "@nomiclabs/hardhat-waffle@2.0.6 chai@5.1.0 dotenv@16.4.0 " +
            "ethereum-waffle@2.2.0 ethers@5.7.2 --save-dev",
            { stdio: 'inherit', cwd: directory }
        );
        console.log("Dependencies installed successfully.");
    } catch (error) {
        console.error("Error occurred while installing dependencies:", error);
    }

    function createFolder(currentPath, structure) {
        Object.entries(structure).forEach(([folderName, content]) => {
            const folderPath = path.join(currentPath, folderName);
            if (typeof content === 'object') {
                // Create folder and recursively handle its contents
                fs.mkdirSync(folderPath, { recursive: true });
                console.log(`Created folder: ${folderPath}`);
                createFolder(folderPath, content);
            } else if (typeof content === 'string') {
                // Treat as file content and write to file
                fs.writeFileSync(path.join(currentPath, folderName), content);
                console.log(`Generated file: ${folderName}`);
            }
        });
    }
    
    
}

generateDirectoryStructure();
