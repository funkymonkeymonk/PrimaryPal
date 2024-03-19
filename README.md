# PrimaryPal

## Dev instructions
1. Install node 21 and pnpm if unavailable
2. pnpm install
3. pnpm dev

*Don't use pnpm start there are a bunch of type errors that need to be ironed out to allow it to start properly, but they were not the most important thing to focus on.*

## My approach.
There is a lot to unpack in this question as the primary system is super complicated. At the state level, different states have different ways of selecting who is in what running. Given that the only data provided was Pennsylvania which does closed primaries and first past the post, PA is simple but that gets tricky really quick when you look at other states.

This meant that I needed to make sure that this could flex at both the state and party level as some states run a multi-party primary and use a top-two/top-four/other primary format[1]. Thankfully we can eliminate the need to worry about open/closed primaries.

Also not all states have the same amount of delegates or pledge their delegates in the same way. Some are bound vs unbound. In fact this is the case with Pennsylvania's 51 district-level delegates.[2] This makes the Pennsylvania primary numbers indicative of a result but not actually definitive.

So given all that can we just implement the summation approach. I'd argue no. Even if you assume the winner of each state and only count the bound/super delegates, tight races could be decided based on unbound electors.

In order to not throw my hand in the air with the complexity we'll implement some of the simplest choices and focus on writing code that will not need to be modified by extended to manage the complexity.

## Stack choices
So despite being a bit overkill for the albeit small question I chose graphql for my API. This is a data access question and one that benefits from two in built aspects of graphql.
1. Ability to ask for arbitrary subsets of the data without the need to to extend the API or receive more data than needed
2. Streaming data capability without requiring page reloads

While neither of these two features are immediately necessary, it makes sense to consider future use cases to ensure that we're not needing to rewrite the platform based on new feature requests especially when it comes to an API. Graphql here supports the decision to start small but enable expansion based on need. I used Apollo framework to get of the ground a bit faster and to also wrap up some of the operational complexity with tracking ect, into something we can pay for if we don't want to write it ourselves.

I spun up a quick Vue client but never actually got to implementing it with the server. This was entirely ease of setup and I'm not overly opinionated here.

Additional data was generated using ChatGPT to save me some time.

## Further work
Fix the type errors that prevent compiling and replace the copious use of any with properly defined types. Any doesn't provide much type safety.

Testing makes the world go round and the servers stay up. This needs some testing before another human touches it.

This code needs to be DRY'd up a bit. By the end I was trying to make sure that I had something working and didn't focus on cleaning up. This meant that there is a lot of repeated code that should be refactored and extracted out.

The frontend needs to be built.

The party data should be kept through the entire process so that could support alternate types of selection. This would ideally even make it into the display and be part of the candidate schema.

There is multiple opportunities for splitting things into other files/objects/classes for cleanliness and organization. I'm not worrying about that yet.

More resolvers could be built out to support asking for district winners and county winners.

The schema could support additional linking allowing for deeper data access for drill ins.

CI/CD, operations and all the fun stuff that makes a product a real product and not a code test.

sources:
1. [NSCL](https://www.ncsl.org/elections-and-campaigns/state-primary-election-types)
2. [Delegate Rules - Ballotpedia](https://ballotpedia.org/Republican_delegate_rules,_2024)
