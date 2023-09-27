import { ethers } from "hardhat";

describe("TrackChain Contract Tests", () => {
  
  it("Should deploy the contract", async () => {
    
    const trackChain = await ethers.deployContract("TrackChain");

    console.log('TrackChain deployed to:', trackChain.target);  

  })
})