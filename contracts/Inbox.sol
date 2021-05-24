// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


/**
  @title Inbox
  @dev handles the IPFS storage functionality
 */
contract Inbox {

  mapping(string => string) ipfsInbox;

  // events
  event IpfsSent(string _hashValue, string _address);
  event IpfsResponse(string response);

  // empty contructor that creates the instance of a contract
  constructor() { }

  // Modifier for the input hash
  modifier notFull (string memory _string) {
    bytes memory stringTest = bytes(_string);
    require(stringTest.length==0);
    _;
  }

/**
  @dev sends the ipfs inbox data to blockchain
 */
  function sendIpfs(string memory _address, string memory _hashValue) public notFull(ipfsInbox[_address]) {
    ipfsInbox[_address] = _hashValue;
    emit IpfsSent(_hashValue, _address);
  }

/**
  @dev returns the ipfs inbox hash off-chain
 */
  function getHash(string memory _address) public returns(string memory) {
    string memory _hashValue = ipfsInbox[_address];
    emit IpfsResponse(_hashValue);
    return _hashValue;
  }

}