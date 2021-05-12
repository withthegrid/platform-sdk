## [16.37.0](https://github.com/withthegrid/platform-sdk/compare/v16.36.0...v16.37.0) (2021-05-12)


### Features

*  notifications level for graph.findGroup ([88fcfe5](https://github.com/withthegrid/platform-sdk/commit/88fcfe5cea564bae220454cfdedd554901354996)), closes [withthegrid/platform-client#454](https://github.com/withthegrid/platform-client/issues/454)

## [16.36.0](https://github.com/withthegrid/platform-sdk/compare/v16.35.0...v16.36.0) (2021-05-11)


### Features

* add edge hash id to pin add update routes ([#42](https://github.com/withthegrid/platform-sdk/issues/42)) ([25278df](https://github.com/withthegrid/platform-sdk/commit/25278dfedd634180df2369c1b6f2647eb9286fbd)), closes [withthegrid/platform#504](https://github.com/withthegrid/platform/issues/504)

## [16.35.0](https://github.com/withthegrid/platform-sdk/compare/v16.34.0...v16.35.0) (2021-05-07)


### Features

* specify client or supplier in ControllerGeneratorOptions type ([fdb95ff](https://github.com/withthegrid/platform-sdk/commit/fdb95ff90fc355cfad740ac5cdbf706a07b5a60c))

## [16.34.0](https://github.com/withthegrid/platform-sdk/compare/v16.33.0...v16.34.0) (2021-05-07)


### Features

* gridName in graph.addPinGroup and graph.updatePinGroup ([#39](https://github.com/withthegrid/platform-sdk/issues/39)) ([03e0114](https://github.com/withthegrid/platform-sdk/commit/03e01146d907069a65da4a0db7e957ab52b6bc85))

## [16.33.0](https://github.com/withthegrid/platform-sdk/compare/v16.32.2...v16.33.0) (2021-05-06)


### Features

* added edge link fields to pin schema ([#37](https://github.com/withthegrid/platform-sdk/issues/37)) ([4106c85](https://github.com/withthegrid/platform-sdk/commit/4106c85e10df06aa51e3dea9c2245ccae3bcc0a6)), closes [withthegrid/platform#504](https://github.com/withthegrid/platform/issues/504)

### [16.32.2](https://github.com/withthegrid/platform-sdk/compare/v16.32.1...v16.32.2) (2021-05-06)


### Bug Fixes

* put back pin links (temporary) ([de5a6c1](https://github.com/withthegrid/platform-sdk/commit/de5a6c19abaf00c157fd4efcc7437b62717ec35c))

### [16.32.1](https://github.com/withthegrid/platform-sdk/compare/v16.32.0...v16.32.1) (2021-05-06)


### Reverts

* Revert "feat: extended BaseFieldConfiguration interface and schema (#34)" ([d60b4b2](https://github.com/withthegrid/platform-sdk/commit/d60b4b2210a37827bbe37eb25c15db0c3938662b)), closes [#34](https://github.com/withthegrid/platform-sdk/issues/34)

## [16.32.0](https://github.com/withthegrid/platform-sdk/compare/v16.31.0...v16.32.0) (2021-05-04)


### Features

* extended BaseFieldConfiguration interface and schema ([#34](https://github.com/withthegrid/platform-sdk/issues/34)) ([4b44b88](https://github.com/withthegrid/platform-sdk/commit/4b44b88d6d2f8892dc138502abb53173cecb1da3)), closes [withthegrid/platform#664](https://github.com/withthegrid/platform/issues/664)

## [16.31.0](https://github.com/withthegrid/platform-sdk/compare/v16.30.0...v16.31.0) (2021-05-04)


### Features

* remove PinLinks model, added edgeHashId and nodeHashId to the Pin model ([#33](https://github.com/withthegrid/platform-sdk/issues/33)) ([7b9a69b](https://github.com/withthegrid/platform-sdk/commit/7b9a69bffc9da77f4b576134cafd325004912737)), closes [withthegrid/platform#504](https://github.com/withthegrid/platform/issues/504)

## [16.30.0](https://github.com/withthegrid/platform-sdk/compare/v16.29.0...v16.30.0) (2021-05-04)


### Features

* generic audit log ([77a029a](https://github.com/withthegrid/platform-sdk/commit/77a029a2a2c74e97ffccb5e068c57437d7868bf6)), closes [withthegrid/platform#421](https://github.com/withthegrid/platform/issues/421)

## [16.29.0](https://github.com/withthegrid/platform-sdk/compare/v16.28.0...v16.29.0) (2021-05-03)


### Features

* analytics route ([#35](https://github.com/withthegrid/platform-sdk/issues/35)) ([8c61c1c](https://github.com/withthegrid/platform-sdk/commit/8c61c1cf659c7691c7c27fa4ec51998cbd7f58e6))

## [16.28.0](https://github.com/withthegrid/platform-sdk/compare/v16.27.0...v16.28.0) (2021-04-13)


### Features

* remove measurement filter content ([#31](https://github.com/withthegrid/platform-sdk/issues/31)) ([5edc911](https://github.com/withthegrid/platform-sdk/commit/5edc911f7648ce87d904c9345bb42237f10bcebb)), closes [withthegrid/platform#571](https://github.com/withthegrid/platform/issues/571)

## [16.27.0](https://github.com/withthegrid/platform-sdk/compare/v16.26.12...v16.27.0) (2021-04-06)


### Features

* **find-pin-group:** added forGrid and forEdge query options ([#30](https://github.com/withthegrid/platform-sdk/issues/30)) ([e925a76](https://github.com/withthegrid/platform-sdk/commit/e925a76251440474a526f70dbdeb0b7fa2f808c8)), closes [withthegrid/platform#585](https://github.com/withthegrid/platform/issues/585)

### [16.26.12](https://github.com/withthegrid/platform-sdk/compare/v16.26.11...v16.26.12) (2021-03-30)


### Continuous Integration

* all pushes to main get npm tag latest, all pushed to next get sandbox ([793de12](https://github.com/withthegrid/platform-sdk/commit/793de12643bdccb9f062e20cb7fe767d1b713e19))

### [16.26.11](https://github.com/withthegrid/platform-sdk/compare/v16.26.10...v16.26.11) (2021-03-30)


### Bug Fixes

* examples for documentation ([5a166ee](https://github.com/withthegrid/platform-sdk/commit/5a166ee0e534703c1df3f73d7d4aabdbffea0870))

### [16.26.10](https://github.com/withthegrid/platform-sdk/compare/v16.26.9...v16.26.10) (2021-03-29)


### Continuous Integration

* ready ([45e68ef](https://github.com/withthegrid/platform-sdk/commit/45e68efd699f63f67622497d4b72a1ad3c72a4ed))

### [16.26.9](https://github.com/withthegrid/platform-sdk/compare/v16.26.8...v16.26.9) (2021-03-29)


### Continuous Integration

* change gh deploy URL ([38c4249](https://github.com/withthegrid/platform-sdk/commit/38c42490ff702d52ecf2453397eed068ba2b90fa))

### [16.26.8](https://github.com/withthegrid/platform-sdk/compare/v16.26.7...v16.26.8) (2021-03-29)


### Continuous Integration

* trigger action ([217ad31](https://github.com/withthegrid/platform-sdk/commit/217ad3180f6ba4397ff7a021537ce11299d64835))

### [16.26.7](https://github.com/withthegrid/platform-sdk/compare/v16.26.6...v16.26.7) (2021-03-29)


### Continuous Integration

* log more ([5466035](https://github.com/withthegrid/platform-sdk/commit/54660356d7c6cf419818130836e49e34e61d8cc3))

### [16.26.6](https://github.com/withthegrid/platform-sdk/compare/v16.26.5...v16.26.6) (2021-03-29)


### Continuous Integration

* trigger action ([71f222b](https://github.com/withthegrid/platform-sdk/commit/71f222b7a7dd2b0106b99fed3dafe32baba6904a))

### [16.26.5](https://github.com/withthegrid/platform-sdk/compare/v16.26.4...v16.26.5) (2021-03-29)


### Continuous Integration

* update GITHUB_TOKEN ([0caa7ec](https://github.com/withthegrid/platform-sdk/commit/0caa7ecaaa3498c6d0fc07abcfc96ee80070ef14))

### [16.26.4](https://github.com/withthegrid/platform-sdk/compare/v16.26.3...v16.26.4) (2021-03-29)


### Continuous Integration

* drop setup-node action ([32eb89b](https://github.com/withthegrid/platform-sdk/commit/32eb89ba68bf0b0d1328f18fe92f754839498fb9))

### [16.26.3](https://github.com/withthegrid/platform-sdk/compare/v16.26.2...v16.26.3) (2021-03-29)


### Continuous Integration

* trigger action ([b7945e3](https://github.com/withthegrid/platform-sdk/commit/b7945e3e8a9f136cd76805614437b585ff189562))

### [16.26.2](https://github.com/withthegrid/platform-sdk/compare/v16.26.1...v16.26.2) (2021-03-29)


### Continuous Integration

* trigger new action ([296c4be](https://github.com/withthegrid/platform-sdk/commit/296c4bec7cc8db16765b6c85b5e506c31ea72992))

### [16.26.1](https://github.com/withthegrid/platform-sdk/compare/v16.26.0...v16.26.1) (2021-03-29)


### Continuous Integration

* add conventional-changelog dependencies ([9454490](https://github.com/withthegrid/platform-sdk/commit/9454490424a8a15d13800bb432738e42904c13ec))
* add npm run release command ([1ac1391](https://github.com/withthegrid/platform-sdk/commit/1ac1391d084fecf711061202bb44921c26f99204))
* add ts-node to package.json ([80cd949](https://github.com/withthegrid/platform-sdk/commit/80cd949d4e94872491482b8a0751e9d6acd06558))
* ci-cd ([5a0bb63](https://github.com/withthegrid/platform-sdk/commit/5a0bb63a32e53ea920c0d7fbd2575e148b2004fd))
* update your lock file with `npm install` before continuing. ([7f9529c](https://github.com/withthegrid/platform-sdk/commit/7f9529ccb5a0f03524748160f092c3601b5fa658))
* use tsconfig.cjs.json for release ([595dffd](https://github.com/withthegrid/platform-sdk/commit/595dffd75eeef5a08f17cc2e2de67d79001060e3))
