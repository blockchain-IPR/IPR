pragma solidity ^0.4.17;

contract IPR {
    struct Project {
        string name;
        string desc;
        uint32 timestamp;
    }

    Project[16] public projects;
    address[16] public users;
    // 分支
    function branch(uint projectId) public returns (uint) {
        require(projectId >= 0 && projectId <= 15);
        users[projectId] = msg.sender;
        return projectId;
    }
    // 返回用户
    function getUsers() public view returns (address[16]) {
        return users;
    }
    // 返回项目列表
    function getProjects() public view returns () {
        return projects;
    }
}