# Staking V1 Subgraph

This subgraph indexes events from the Layer 2 staking system and provides a queryable GraphQL API.

## Overview

This subgraph tracks events from the following smart contracts:

- **SeigManager**: Manages and distributes seigniorage
- **DepositManager**: Manages deposits and withdrawals
- **DAOCommittee**: Manages DAO committee and candidates
- **Layer2Manager**: Manages Layer 2 candidate registration

## Playground

You can explore and query this subgraph using The Graph Explorer Playground:

🔗 [GraphQL Playground](https://thegraph.com/explorer/subgraphs/CJLiXNdHXJ22BzWignD62gohDRVTYXJQVgU4qKJEtNVS?view=Query&chain=arbitrum-one)

## Key Features

The subgraph tracks the following data:

- Candidate information and staking status
- User staking and unstaking history
- Staking, unstaking, and restaking events
- Withdrawal request and processing history
- Seigniorage distribution history
- DAO committee member change history

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- The Graph CLI (`@graphprotocol/graph-cli`)

## Installation

Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

## Development

### Code Generation

Generate type definitions:

```bash
npm run codegen
```

### Build

Build the subgraph:

```bash
npm run build
```

### Test

Run tests:

```bash
npm run test
```

## Deployment

### Deploy to The Graph Studio

Deploy to Sepolia testnet:

```bash
npm run deploy-sepolia
```

### Deploy to The Graph Hosted Service

Deploy to Goerli testnet:

```bash
npm run deploy-goerli
```

Deploy to mainnet:

```bash
npm run deploy
```

### Deploy to Local Node

To deploy to a local Graph node:

1. Create the subgraph:

```bash
npm run create-local
```

2. Deploy the subgraph:

```bash
npm run deploy-local
```

Remove the subgraph:

```bash
npm run remove-local
```

## Data Model

Key entities:

### Factory

Stores system-wide statistics.

- `totalStaked`: Total staked amount
- `totalPendingWithdrawal`: Total pending withdrawal amount
- `numOfCandidate`: Number of candidates

### Candidate

Stores Layer 2 candidate information.

- `candidate`: Candidate address
- `candidateContract`: Candidate contract address
- `name`: Candidate name
- `stakedAmount`: Total staked amount
- `pendingWithdrawalAmount`: Pending withdrawal amount
- `commissionRate`: Commission rate
- `seigs`: Total seigniorage received

### User

Stores user information.

- `totalStaked`: Total staked amount
- `pendingWithdrawalAmount`: Pending withdrawal amount
- `candidate`: Staked candidate
- `totalEarnedSeig`: Total seigniorage earned

### Transaction

Stores all transaction information.

- `blockNumber`: Block number
- `timestamp`: Timestamp
- `gasUsed`: Gas used
- `gasPrice`: Gas price

### Event Entities

- `Staked`: Staking events
- `Unstaked`: Unstaking events
- `Restaked`: Restaking events
- `Withdrawal`: Withdrawal events
- `AddedSeigAtLayer`: Layer-specific seigniorage addition events
- `SeigGiven2`: Seigniorage distribution events

## GraphQL Query Examples

### Query All Candidates

```graphql
{
  candidates {
    id
    name
    stakedAmount
    pendingWithdrawalAmount
    commissionRate
    seigs
  }
}
```

### Query Staking History for a Specific User

```graphql
{
  user(id: "0x...") {
    totalStaked
    pendingWithdrawalAmount
    totalEarnedSeig
    candidate {
      name
      stakedAmount
    }
    staked {
      amount
      timestamp
      transaction {
        id
      }
    }
  }
}
```

### Query Recent Staking Events

```graphql
{
  stakeds(
    orderBy: timestamp
    orderDirection: desc
    first: 10
  ) {
    id
    amount
    timestamp
    user {
      id
    }
    candidate {
      name
    }
    transaction {
      id
    }
  }
}
```

### Query Factory Statistics

```graphql
{
  factory(id: "1") {
    totalStaked
    totalPendingWithdrawal
    numOfCandidate
  }
}
```

### Query Staking User List for a Specific Candidate

```graphql
{
  candidate(id: "0x...") {
    name
    stakedAmount
    stakedUserList {
      user {
        id
      }
      stakedAmount
      pendingWithdrawalAmount
    }
  }
}
```

### Query Transactions

```graphql
{
  transactions(
    orderBy: timestamp
    orderDirection: desc
    first: 10
  ) {
    id
    blockNumber
    timestamp
    stakeds {
      id
      ...
    }
    withdrawals {
      id
      ...
    }
  }
}
```

### Query Staking Events (Stakeds)

```graphql
{
  stakeds(
    orderBy: timestamp
    orderDirection: desc
    first: 10
  ) {
    id
    amount
    timestamp
    user {
      id
    }
    candidate {
      name
    }
    transaction {
      id
    }
  }
}
```

### Query Withdrawal Events

```graphql
{
  withdrawals(
    orderBy: timestamp
    orderDirection: desc
    first: 10
  ) {
    id
    amount
    timestamp
    eventName
    user {
      id
    }
    candidate {
      name
    }
    transaction {
      id
    }
  }
}
```

## Project Structure

```
staking-v1-subgraph/
├── abis/                    # Smart contract ABI files
├── constants/               # Constant definitions
├── generated/               # Generated type definitions
├── src/
│   ├── lib/
│   │   └── eventApi/
│   │       └── handlers/    # Event handlers
│   └── mappings/            # Mapping files
│       ├── dao-committee.ts
│       ├── deposit-manager.ts
│       ├── layer-2-manager.ts
│       └── seig-manager.ts
├── schema.graphql           # GraphQL schema definition
├── subgraph.yaml            # Subgraph manifest
└── package.json
```

## Monitored Contracts

### SeigManager
- Address: `0x0b55a0f463b6defb81c6063973763951712d0e5f`
- Start Block: 18416550
- Key Events: `CoinageCreated`, `AddedSeigAtLayer`, `SeigGiven2`, `CommissionRateSet`

### DepositManager
- Address: `0x0b58ca72b12f01fc05f8f252e226f3e2089bd00e`
- Start Block: 18416550
- Key Events: `Deposited`, `WithdrawalRequested`, `WithdrawalProcessed`, `WithdrawalAndDeposited`

### DAOCommittee
- Address: `0xDD9f0cCc044B0781289Ee318e5971b0139602C26`
- Start Block: 12008820
- Key Events: `CandidateContractCreated`, `ChangedMember`

### Layer2Manager
- Address: `0xD6Bf6B2b7553c8064Ba763AD6989829060FdFC1D`
- Start Block: 22165890
- Key Events: `RegisteredCandidateAddOn`

## Troubleshooting

### Build Errors

Generate code before building:

```bash
npm run codegen
npm run build
```

### Sync Issues

If the subgraph is not synced to the latest block, please wait after deployment. The Graph network may take some time to index up to the latest block.

## License

UNLICENSED

## Contributing

Contributions via issues or pull requests are welcome.
