// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import "forge-std/console.sol";

import "../src/TrackChain.sol";

contract TrackChainScript is Script {
    function setUp() public {}

    function run() public {
        uint privateKey = vm.envUint("DEV_PRIVATE_KEY");
        address account = vm.addr(privateKey);
        console.log("account", account);
        vm.startBroadcast(privateKey);
        //deploy token
        TrackChain trackChain = new TrackChain();

        vm.stopBroadcast();
    }
}
