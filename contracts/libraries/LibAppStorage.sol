
//SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

struct AppStorage {
// shared state variables go here   
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }
}