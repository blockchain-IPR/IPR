pragma solidity ^0.4.17;

contract IPR {
    struct Project {
        uint projectId;
        string name;
        string desc;
        address owner;
        uint timestamp;
        uint parentId;
    }

    mapping(uint => Project) public projects;

    function saveProject(uint _parentId, string _name, string _desc) public returns (uint) {
        require(bytes(_name).length > 2);
        uint timestamp = now;
        uint id = uint(keccak256(timestamp));
        projects[id] = Project({
            timestamp : timestamp,
            projectId : id,
            parentId : _parentId,
            name : _name,
            desc : _desc,
            owner : msg.sender
            });
        return id;
    }
}