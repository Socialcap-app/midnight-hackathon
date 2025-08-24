import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { Ledger, ZswapCoinPublicKey } from "../dist/managed/ProposalVoting/contract/index.cjs";

export type ProposalVotingPrivateState = {
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
  }: WitnessContext<Ledger, ProposalVotingPrivateState>): [ProposalVotingPrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],

  randomNonce: ({
    privateState,
  }: WitnessContext<Ledger, ProposalVotingPrivateState>): [ProposalVotingPrivateState, Uint8Array] => [
    privateState,
    privateState.randomNonce,
  ],
};