import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  TrackchainContract,
  TrackchainContractMethodNames,
  TrackchainContractEventsContext,
  TrackchainContractEvents
>;
export type TrackchainContractEvents = undefined;
export interface TrackchainContractEventsContext {}
export type TrackchainContractMethodNames =
  | 'new'
  | 'createItem'
  | 'createUser'
  | 'deleteUser'
  | 'getItems'
  | 'getUser'
  | 'owner'
  | 'transferItem'
  | 'updateItem'
  | 'updateUser'
  | 'userCount'
  | 'users';
export interface ItemResponse {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface ItemsResponse {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserResponse {
  id: string;
  name: string;
  itemCount: string;
  items: ItemsResponse[];
}
export interface UsersResponse {
  id: string;
  name: string;
  itemCount: string;
}
export interface TrackchainContract {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param title Type: string, Indexed: false
   * @param description Type: string, Indexed: false
   */
  createItem(title: string, description: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: string, Indexed: false
   */
  createUser(name: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  deleteUser(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  getItems(_owner: string): MethodConstantReturnContext<ItemResponse[]>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param _owner Type: address, Indexed: false
   */
  getUser(_owner: string): MethodConstantReturnContext<UserResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: uint256, Indexed: false
   * @param toAddress Type: address, Indexed: false
   */
  transferItem(id: string, toAddress: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: uint256, Indexed: false
   * @param title Type: string, Indexed: false
   * @param description Type: string, Indexed: false
   */
  updateItem(
    id: string,
    title: string,
    description: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: string, Indexed: false
   */
  updateUser(name: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  userCount(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  users(parameter0: string): MethodConstantReturnContext<UsersResponse>;
}
