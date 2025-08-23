import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { Ledger, ZswapCoinPublicKey } from "../out/Vote/contract/index.cjs";

export type VotePrivateState = {
  findAuthPath: (publicKey: ZswapCoinPublicKey) => Uint8Array;
  secretKey: Uint8Array;
  randomNonce: Uint8Array;
};

export const witnesses = {
  findAuthPath: (publicKey: ZswapCoinPublicKey): Uint8Array => {
    return Uint8Array.from([1, 2, 3]);
  },

  secretKey: ({
    privateState,
  }: WitnessContext<Ledger, VotePrivateState>): [VotePrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],

  randomNonce: ({
    privateState,
  }: WitnessContext<Ledger, VotePrivateState>): [VotePrivateState, Uint8Array] => [
    privateState,
    privateState.randomNonce,
  ],
};