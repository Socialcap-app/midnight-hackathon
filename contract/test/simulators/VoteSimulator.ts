// SPDX-License-Identifier: Apache-2.0

import {
  type CircuitContext,
  QueryContext,
  sampleContractAddress,
  constructorContext,
  WitnessContext,
} from "@midnight-ntwrk/compact-runtime";

import {
  Contract,
  type ContractAddress,
  type Either,
  type Ledger,
  ledger,
  type Witnesses,
  type ZswapCoinPublicKey,
} from "../../out/Vote/contract/index.cjs";


export type VotePrivateState = {
  findAuthPath: (publicKey: ZswapCoinPublicKey) => Uint8Array;
  secretKey: (context: WitnessContext<Ledger, VotePrivateState>) => [VotePrivateState, Uint8Array];
  randomNonce: (context: WitnessContext<Ledger, VotePrivateState>) => [VotePrivateState, Uint8Array];
};
export const witnesses: Witnesses<VotePrivateState> = {
  findAuthPath: (publicKey: ZswapCoinPublicKey) => Uint8Array.from([1, 2, 3]),
  secretKey: (context: WitnessContext<Ledger, VotePrivateState>) => [context.privateState, Uint8Array.from([1, 2, 3])],
  randomNonce: (context: WitnessContext<Ledger, VotePrivateState>) => [context.privateState, Uint8Array.from([1, 2, 3])],
};

export class VoteSimulator {
  readonly contract: Contract<VotePrivateState>;
  circuitContext: CircuitContext<VotePrivateState>;

  constructor(initialOwner: Either<ZswapCoinPublicKey, ContractAddress>) {
    this.contract = new Contract<VotePrivateState>(witnesses);
    const {
      currentPrivateState,
      currentContractState,
      currentZswapLocalState
    } = this.contract.initialState(
      constructorContext<VotePrivateState>({
        findAuthPath: (publicKey: ZswapCoinPublicKey) => Uint8Array.from([1, 2, 3]),
        secretKey: (context: WitnessContext<Ledger, VotePrivateState>) => [context.privateState, Uint8Array.from([1, 2, 3])],
        randomNonce: (context: WitnessContext<Ledger, VotePrivateState>) => [context.privateState, Uint8Array.from([1, 2, 3])]
      }, "0".repeat(64)),
      initialOwner,
    );
    this.circuitContext = {
      currentPrivateState,
      currentZswapLocalState,
      originalState: currentContractState,
      transactionContext: new QueryContext(
        currentContractState.data,
        sampleContractAddress()
      )
    };
  }

  public getLedger(): Ledger {
    return ledger(this.circuitContext.transactionContext.state);
  }

  public increment(): Ledger {
    this.circuitContext = this.contract.impureCircuits.increment(
      this.circuitContext
    ).context;
    return ledger(this.circuitContext.transactionContext.state);
  }

  public reset(): Ledger {
    this.circuitContext = this.contract.impureCircuits.reset(
      this.circuitContext
    ).context;
    return ledger(this.circuitContext.transactionContext.state);
  }
}
