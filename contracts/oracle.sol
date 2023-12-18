// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataConsumerV3 {
    AggregatorV3Interface internal BTC_USDDataFeed;
    AggregatorV3Interface internal ETH_USDDataFeed;
    AggregatorV3Interface internal LINK_USDDataFeed;
    AggregatorV3Interface internal BTC_ETHDataFeed;

    int public storedConversion;

    enum currencyPairs {BTC_USD, ETH_USD, LINK_USD, BTC_ETH}

    // Network: Sepolia
    //Aggregator: BTC/USD
    // Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43


    constructor() {
        BTC_USDDataFeed = AggregatorV3Interface(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43); // BTC/USD
        ETH_USDDataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306); // ETH/USD
        LINK_USDDataFeed = AggregatorV3Interface(0xc59E3633BAAC79493d908e63626716e204A45EdF); // LINK/USD
        BTC_ETHDataFeed = AggregatorV3Interface(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22); // BTC/ETH
    }

    function getStoredConversion() external view returns (int) {
        return storedConversion;
    }

    function getChainLinkDataFeedLatestAnswer(currencyPairs _pair) external returns (int) {
        
            if(_pair == currencyPairs.BTC_USD) {
                (
                    /*uint roundID */,
                    int answer,
                    /*uint startedAy*/,
                    /*uint timeStamp */,
                    /* uint80 answeredInRound */ ) = BTC_USDDataFeed.latestRoundData();

                    storedConversion = answer;
                    return answer;
            }
            else if (_pair == currencyPairs.ETH_USD) {
                (
                    /*uint roundID */,
                    int answer,
                    /*uint startedAy*/,
                    /*uint timeStamp */,
                    /* uint80 answeredInRound */ ) = ETH_USDDataFeed.latestRoundData();

                    storedConversion = answer;
                    return answer;
            }
            else if (_pair == currencyPairs.LINK_USD) {
                (
                    /*uint roundID */,
                    int answer,
                    /*uint startedAy*/,
                    /*uint timeStamp */,
                    /* uint80 answeredInRound */ ) = LINK_USDDataFeed.latestRoundData();

                    storedConversion = answer;
                    return answer;
            }
            else if (_pair == currencyPairs.BTC_ETH) {
                (
                    /*uint roundID */,
                    int answer,
                    /*uint startedAy*/,
                    /*uint timeStamp */,
                    /* uint80 answeredInRound */ ) = BTC_ETHDataFeed.latestRoundData();

                    storedConversion = answer;
                    return answer;
            }
    }
}