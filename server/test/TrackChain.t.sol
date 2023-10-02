// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {TrackChain} from "../src/TrackChain.sol";
import "forge-std/console.sol";

contract TrackChainTest is Test {
    TrackChain public trackChain;

    function setUp() public {
        trackChain = new TrackChain();
        trackChain.createUser("Andrew");
    }

    function test_checkOwner() public {
        assertEq(trackChain.owner(), address(this));
    }

    function test_uniqueID() public {
        trackChain.createItem("Box of Cigars", "Cigars");
        trackChain.createItem("Box of Matches", "A box of matches");

        TrackChain.Item[] memory items = trackChain.getItems(address(this));
        assertEq(items.length, 2);
        assertNotEq(items[0].id, items[1].id);

        trackChain.createUser("Bob");
        TrackChain.User memory bob = trackChain.getUser(address(this));
        vm.startPrank(address(247));
        trackChain.createUser("Steve");
        TrackChain.User memory steve = trackChain.getUser(address(247));
        vm.stopPrank();
        assertNotEq(bob.id, steve.id);
    }

    function test_createUser() public {
        trackChain.createUser("Bob");
        TrackChain.User memory user = trackChain.getUser(address(this));
        assertEq(user.name, "Bob");
    }

    function test_updateUser() public {
        TrackChain.User memory user = trackChain.getUser(address(this));
        assertEq(user.name, "Andrew");
        trackChain.updateUser("Andy");
        user = trackChain.getUser(address(this));
        assertEq(user.name, "Andy");
    }

    function test_deleteUser() public {
        trackChain.deleteUser();
        TrackChain.User memory user = trackChain.getUser(address(this));
        assertEq(user.id, 0);
        assertEq(user.name, "");
    }

    function test_createItemNoUser() public {
        TrackChain.Item[] memory items = trackChain.getItems(
            address(0xdeadbeef)
        );
        assertEq(items.length, 0);
    }

    function test_createItem() public {
        trackChain.createItem("title", "description");
        TrackChain.Item[] memory items = trackChain.getItems(address(this));
        assertEq(items.length, 1);
        assertEq(items[0].title, "title");
        assertEq(items[0].description, "description");
    }

    function test_getItems() public {
        TrackChain.Item[] memory items = trackChain.getItems(address(this));
        assertEq(items.length, 0);
        trackChain.createItem("Box of Crackers", "A box of crackers");
        items = trackChain.getItems(address(this));
        assertEq(items.length, 1);
    }

    function test_updateItem() public {
        trackChain.createItem("Box of Matches", "A box of matches");
        TrackChain.Item[] memory items = trackChain.getItems(address(this));
        assertEq(items.length, 1);
        assertEq(items[0].title, "Box of Matches");
        assertEq(items[0].description, "A box of matches");
        trackChain.updateItem(
            items[0].id,
            "Box of Torches",
            "A box of torches"
        );
        items = trackChain.getItems(address(this));
        assertEq(items.length, 1);
        assertEq(items[0].title, "Box of Torches");
        assertEq(items[0].description, "A box of torches");
    }

    function test_transferItem() public {
        // Create item
        trackChain.createItem("Box of Matches", "A box of matches");
        TrackChain.Item[] memory items = trackChain.getItems(address(this));
        TrackChain.User memory user1 = trackChain.getUser(address(this));
        assertEq(user1.itemCount, 1);
        assertEq(items[0].title, "Box of Matches");

        // Create user 2
        vm.prank(address(0xdeadbeef));
        trackChain.createUser("Bob");

        // Transfer item
        trackChain.transferItem(items[0].id, address(0xdeadbeef));

        // Change user
        // Check item transfered to user 2
        TrackChain.User memory bob = trackChain.getUser(address(0xdeadbeef));
        TrackChain.Item[] memory items2 = trackChain.getItems(
            address(0xdeadbeef)
        );

        assertEq(bob.itemCount, 1);
        assertEq(items2[0].title, "Box of Matches");

        // // // Check items removed from user 1
        items = trackChain.getItems(address(this));
        user1 = trackChain.getUser(address(this));

        assertEq(user1.itemCount, 0);
        assertEq(items.length, 0);
    }

    function test_transferItemToSelf() public {
        trackChain.createItem("Box of Matches", "A box of matches");
        TrackChain.Item[] memory items = trackChain.getItems(address(this));
        TrackChain.Item memory item = items[0];
        vm.expectRevert("Cannot transfer item to self");
        trackChain.transferItem(item.id, address(this));
    }

    function test_transferNonExistentItem() public {
        vm.prank(address(0xdeadbeef));
        trackChain.createUser("Bob");
        vm.expectRevert("Item does not exist");
        trackChain.transferItem(0, address(0xdeadbeef));
    }
}
