---
sidebar_position: 10
---
#Estimate fees
By default, all non free Starknet commands (declare, deploy, invoke) works without an limitation of cost. Nevertheless, you might want to inform the DAPP user of the cost of the incoming transaction, and request its validation before proceeding.  
Starknet.js proposes several functions to estimate the fees :  
## estimateDeclareFee

## estimateDeployFee

## estimateAccountDeployFee

## estimateInvokeFee

## Fee limitation
In all non-free functions, you can add an optional parameter limiting the fee consumption.  
If the fee has been previously estimated, you can use this value for this parameter (with an additional margin of approximately 20%).