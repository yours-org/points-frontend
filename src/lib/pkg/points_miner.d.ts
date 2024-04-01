/* tslint:disable */
/* eslint-disable */
/**
* @param {string} txid
* @param {bigint} difficulty
* @param {number} work_size
* @returns {Solution}
*/
export function mine(txid: string, difficulty: bigint, work_size: number): Solution;
/**
*/
export class Solution {
  free(): void;
/**
*/
  readonly hash: string;
/**
*/
  readonly nonce: string;
}
