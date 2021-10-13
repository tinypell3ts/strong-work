// contracts/StrongWork.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StrongWork is Ownable {
    // address linked to Slack id
    mapping(string => address) private _addresses;
    // number of tokens sent to address
    mapping(address => uint) public rewards;
    
    
    IERC20 private _token;
    
    constructor (IERC20 token) public {
        _token = token;
    }
    
    uint public _rewardAmount;
    
    function update(string memory userSlackId) public {
        _addresses[userSlackId] = msg.sender;
    }
    
    function setRewardAmount(uint amount) public onlyOwner {
        _rewardAmount = amount;
    }
    
    function reward(string memory userSlackId) external payable {
        address userAddress = _addresses[userSlackId];
        require(userAddress != address(0x0), 'address does not exist');
        _token.transfer(userAddress, _rewardAmount);
        rewards[userAddress] = _rewardAmount;
    }
    
    function getAddresss(string memory userSlackId) public view returns (address){
        require(_addresses[userSlackId] != address(0x0), "address does not exist");
        return _addresses[userSlackId];
    }

}