// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/console.sol";
import "@chainlink/contracts/src/v0.8/VRFV2WrapperConsumerBase.sol";

contract TrackChain {
    // Need to create a struct to represent an item
    struct Item {
        uint256 id;
        string title;
        string description;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct User {
        uint256 id;
        string name;
        uint256 itemCount;
        Item[] items;
    }

    receive() external payable {}

    fallback() external payable {}

    uint256 public userCount = 0;
    mapping(address => User) public users;
    address public immutable owner;
    uint256 public constant CREATION_FEE = 0.005 ether;
    uint256 public treasury = 0;

    event ItemCreated(uint256 id, string title, string description);
    event ItemUpdated(uint256 id, string title, string description);
    event ItemDeleted(uint256 id);
    event ItemTransfered(uint256 id, address toAddress);

    constructor() {
        console.log("TrackChain contract deployed");
        owner = msg.sender;
    }

    modifier requiresEther() {
        require(
            msg.value >= CREATION_FEE || msg.sender == owner,
            "Insufficient ether sent!"
        );
        _;
    }

    // ***************** Helper functions ********************* //
    function generateUniqueId(uint256 salt) internal view returns (uint256) {
        uint256 id = uint256(
            keccak256(abi.encodePacked(msg.sender, salt, block.timestamp))
        );

        return id;
    }

    // User CRUD
    function getUser(address _owner) public view returns (User memory) {
        return users[_owner];
    }

    function createUser(string calldata name) public {
        users[msg.sender].id = generateUniqueId(userCount);
        users[msg.sender].name = name;
        users[msg.sender].itemCount = 0;

        // Increment the user count
        userCount++;
    }

    function createItem(
        string calldata title,
        string calldata description
    ) public payable requiresEther {
        treasury += msg.value;
        // Create new item and push onto array
        uint256 id = generateUniqueId(users[msg.sender].itemCount);
        users[msg.sender].items.push(
            Item({
                id: id,
                title: title,
                description: description,
                createdAt: block.timestamp,
                updatedAt: block.timestamp
            })
        );
        // Update item count
        users[msg.sender].itemCount++;

        emit ItemCreated(id, title, description);
    }

    function updateUser(string calldata name) public {
        users[msg.sender].name = name;
    }

    function deleteUser() public {
        delete users[msg.sender];
    }

    // CRUD for Items
    function getItem(
        address _owner,
        uint256 id
    ) internal view returns (Item memory) {
        // Need to search through users items array and find the item
        for (uint256 i = 0; i < users[owner].itemCount; i++) {
            if (users[_owner].items[i].id == id) {
                return users[owner].items[i];
            }
        }

        revert("Item does not exist");
    }

    function getItems(address _owner) public view returns (Item[] memory) {
        return users[_owner].items;
    }

    function updateItem(
        uint256 id,
        string calldata title,
        string calldata description
    ) public {
        for (uint256 i = 0; i < users[msg.sender].itemCount; i++) {
            if (users[msg.sender].items[i].id == id) {
                users[msg.sender].items[i].title = title;
                users[msg.sender].items[i].description = description;
            }
        }

        emit ItemUpdated(id, title, description);
    }

    function deleteItem(uint256 id) public {
        for (uint256 i = 0; i < users[msg.sender].itemCount; i++) {
            if (users[msg.sender].items[i].id == id) {
                users[msg.sender].items[i] = users[msg.sender].items[
                    users[msg.sender].itemCount - 1
                ];
                users[msg.sender].items.pop();
            }
        }

        users[msg.sender].itemCount--;

        emit ItemDeleted(id);
    }

    function transferItem(uint256 id, address toAddress) public {
        require(msg.sender != toAddress, "Cannot transfer item to self");
        // require(users[toAddress].id != 0, "User does not exist");

        Item memory item = getItem(msg.sender, id);
        users[toAddress].items.push(item);
        deleteItem(id);
        users[toAddress].itemCount++;

        emit ItemTransfered(id, toAddress);
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw");
        payable(msg.sender).transfer(treasury);
        treasury = 0;
    }
}
