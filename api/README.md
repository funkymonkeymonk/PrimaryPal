# GraphQL API Template

## Stack Choices
- Language - Typescript
- Framework - Apollo

## Starting a development server
- Run `pnpm install` to install dependencies.
- Run `pnpm start` to start a development build and start the server.
- If you change the resolvers, run `pnpm run codegen` to rerun type generation

TODO:
- [ ] Get a test framework integrated.
    - I don't like feeling like I'm flying blind but getting jest set up and working properly right now is a struggle.
- [ ] Get the schema outside of the typeDefs file so that it can be easily shared with frontends as well.
- [ ] Set up CI/CD pipeline as well as automatic node package upgrades.
- [ ] Add a dev container.
    - There is some work that I need to do to get the dev container to play well with pnpm given the container and the host OS are different.
- [ ] Figure out how to manage other js-template
    - Move this template into a monorepo of all my js templates and rebuild them using nx?
        - I'm not 100% certain this is the way I want to go. I'll need to see how much ease/difficulty gh has making new repos with subsets of other reps.
    - Manage them all separately
        - That's a heck of a sprawl and makes it so that code is harder to share.
    - There is some thinking/testing to do here.