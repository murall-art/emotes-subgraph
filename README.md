# emotes-subgraph
Subgraph code for indexing emote events.

## Installation

Install the graph cli globally:
```
npm install -g @graphprotocol/graph-cli      
```
Then install the dependencies:

```
yarn install
```

## Tweaking
Check the `src/constants_polygon.ts`/`src/constants_ethereum.ts` files for examples of checking for events on specific NFT
contract addresses. It is used in `src/emotable-repository.ts` to filter events by contract address:

```
import { isValidEmoteAddress } from './constants_ethereum' // or constants_polygon

export function handleEmoted (event: EmotedEvent): void {
  if (!isValidEmoteAddress(event.params.collection)) {
    return
  }
  // ...
}
```

Remove the `if` statement to index all events.

## Deploying

Before deploying, check the subgraph.yaml file to make sure the desired network is correct (i.e. use
`mainnet` for mainnet, `rinkeby` for rinkeby, etc.). You can alter the `startBlock` value depending
on the deployment block (check your relevant blockchain scanner for the deployment transaction of
the contract to derive the starting block number).

Then in order to deploy on the graphs hosted service run:

```
graph deploy --access-token **YOUR ACCESS TOKEN HERE** --debug --node https://api.thegraph.com/deploy/ --ipfs https://api.thegraph.com/ipfs/ path/to/your/subgraph

```

## Querying

MurAll specific emote subgraphs can be queried at
https://api.thegraph.com/subgraphs/name/murall-art/murall-emotes-polygon and
https://api.thegraph.com/subgraphs/name/murall-art/murall-emotes-ethereum respectively.

## Example Queries

Query for all emotes on a specific NFT contract (replace `${address}` with the contract address and
`${tokenId}` with the token id):

```
query {
    tokenContracts(where:{address:"${address}"}) {
        tokens(where:{tokenId:${tokenId}}){
            emojiCounts(where:{count_gt:0}) {
                emoji
                count
            }
        }
    }
}
```