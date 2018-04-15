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

    mapping(uint => uint) public projectIdIndex;
    Project[] public projects;

    function getProjectsLength() public view returns (uint) {
        return projects.length;
    }

    function saveProject(uint _parentId, string _name, string _desc) public returns (uint) {
        require(bytes(_name).length > 2);
        uint timestamp = now;
        uint id = uint(keccak256(timestamp));
        uint length = projects.push(Project({
            timestamp : timestamp,
            projectId : id,
            parentId : _parentId,
            name : _name,
            desc : _desc,
            owner : msg.sender
            }));
        projectIdIndex[id] = length - 1;
        return id;
    }
}