# Random Rewards

We wants to reward new users with a free share when they sign up to use our free stock trading service or when they refer a friend.

The share they receive will be randomly chosen and range in value from £3 to £200. The distribution of these rewards must allow us to keep the cost of each new acquired customer under control, so the algorithm needs to be implemented in a way that forces 95% of distributed rewards to have a value between £3-£10, 3% between £10-£25 and 2% between £25-£200.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Notes

- The broker service use mock data and there is HTTP service prepared for actual integration
- The distribution configurations are available in the `config/development.yaml`
  - The minimum quantity of available share in the reward account
  - The perefered stock to buy
  - The distribution rules ([percentage]: [price-range])
- The configuration for other environment need to be added
- The configurations can be replace with environment variable with adding `{{}}` around the variable name in the configuration file
  ```
  document:
    baseUrl: /docs
    username: '{{DOCS_USERNAME}}'
    password: '{{DOCS_PASSWORD}}'
  ```
- The logger need some reviews
- The docker compose configed for development environment
- The task part can be seperated or deploy seperatly with same code base
- The schedule configured at mid-night of every weekdays to run and refill the awards account with the minimum quantity that configured
