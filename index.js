const { ApolloServer } = require("apollo-server");
const fetch = require("node-fetch");
const _ = require("lodash");

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    rates(currency: String!): [ExchangeRate]
    cards(pageSize: Int, name: String, pageNumber: Int): [CardInfo]
  }

	type ExchangeRate {
		currency: String
		rate: String
		name: String
  }
  
  type CardInfo {
		name: String
    type: String
    setName: String
    text: String
    imageUrl: String
	}
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    cards: async (_root, { pageSize, name, pageNumber }) => {
      let url = 'https://api.elderscrollslegends.io/v1/cards';
      try {
        if(pageSize && name && pageNumber) {
          url += `?pageSize=${pageSize}&name=${name}&page=${pageNumber}`;
        } else if(pageSize && name) {
          url += `?pageSize=${pageSize}&name=${name}`;
        } else if(name) {
          url += `?name=${name}`;
        }
        const results = await fetch(url);
        const cardsData = await results.json();
        
        return _.map(cardsData.cards, (card) => ({
          name: card.name,
          type: card.type,
          setName: card.set.name,
          text: card.text,
          imageUrl: card.imageUrl
        }));
      } catch (e) {
        console.error(e);
      }
    },
    rates: async (_root, { currency }) => {
      try {
        const results = await fetch(
          `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
        );
        const exchangeRates = await results.json();

        return _.map(exchangeRates.data.rates, (rate, currency) => ({
          currency,
          rate
        }));
      } catch (e) {
        console.error(e);
      }
    }
  },
  ExchangeRate: {
    name: async ({ currency }) => {
      try {
        const results = await fetch("https://api.coinbase.com/v2/currencies");
        const currencyData = await results.json();

        const currencyInfo = currencyData.data.find(
          c => c.id.toUpperCase() === currency
        );
        return currencyInfo ? currencyInfo.name : null;
      } catch (e) {
        console.error(e);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

