pragma solidity ^0.4.17;

contract Project {
    uint projectId;
    string public name;
    string public desc;
    address owner;
    uint timestamp;
    uint parentId;

    function Project(uint _parentId, string _name, string _desc) public {
        require(bytes(_name).length > 2);
        timestamp = now;
        projectId = uint(keccak256(timestamp));
        parentId = _parentId;
        name = _name;
        desc = _desc;
        owner = msg.sender;
    }
}