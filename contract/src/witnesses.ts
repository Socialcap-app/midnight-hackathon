import { WitnessContext } from "@midnight-ntwrk/compact-runtime";
import { Ledger, ZswapCoinPublicKey } from "../dist/managed/ProposalVoting/contract/index.cjs";

export type ProposalVotingPrivateState = {
  secretKey: Uint8Array;
  pin: Uint8Array;
};

export const witnesses = {
  localSecretKey: ({
    privateState,
  }: WitnessContext<Ledger, ProposalVotingPrivateState>): [ProposalVotingPrivateState, Uint8Array] => [
    privateState,
    privateState.secretKey,
  ],

  localPin: ({
    privateState,
  }: WitnessContext<Ledger, ProposalVotingPrivateState>): [ProposalVotingPrivateState, Uint8Array] => [
    privateState,
    privateState.pin,
  ],
};