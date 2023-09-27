//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9 <0.9.0;

contract TrackChain {
    struct Item {
        uint256 id;
        string title;
        string description;
        uint createdAt;
        uint updatedAt;
    }

    mapping(address => Item[]) public items;

    event ItemCreated(uint256 id, string description, uint256 createdAt);

    // Create function that adds an item to owner
    function create(string calldata title, string calldata description) public {
        uint256 id = items[msg.sender].length;
        uint256 createdAt = block.timestamp;

        items[msg.sender].push(
            Item(id, title, description, createdAt, createdAt)
        );

        emit ItemCreated(id, description, createdAt);
    }

    // Create function that allows owner to update an item

    // Create function that allows owner to delete an item

    // Create getter function for onwer to get an item

    // Create function that enables owner to transfer an item to another address
}
