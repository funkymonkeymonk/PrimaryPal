import { Candidate, Resolvers, State } from './__generated__/graphql.js';
import results from './resultsConnector.js';
import * as _ from 'underscore'

// Debug tooling. Useful when needed.
import util from 'util'
const inspect = (obj) => console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}))

const fitCandidateScehma = (c:string[]):Candidate => {
  return {Name: c[0], Votes: c[1]}
}

function top2(data:any) {
  const sums = {}; // Initialize an empty object to hold the sums

  // Iterate through each region
  Object.keys(data).forEach(region => {
    const parties = data[region]; // Get the parties within the region

    // Iterate through each party
    Object.keys(parties).forEach(party => {
      const candidates = parties[party]; // Get the candidates within the party

      // Iterate through each candidate
      Object.keys(candidates).forEach(candidate => {
        const votes = candidates[candidate]; // Get the number of votes for the candidate

        // If the candidate exists in sums, add the votes, else initialize with current votes
        if (sums[candidate]) {
          sums[candidate] += votes
        } else {
          sums[candidate] = votes
        }
      })
    })
  })
  
  const sortedCandidates = Object.entries(sums).sort((a, b) => b[1] - a[1]);

  // Slice the first two elements (top two candidates) from the sorted array
  const winners = sortedCandidates.slice(0, 2);

  // Convert the top two [key, value] pairs back into an object
  return Object.fromEntries(winners);
}

const getPrimaryMethod = (district:string, party?:string) => {
  // This is where additional methods of running the primary can be added
  // For right now this will always return top 2.
  return top2
}

const findDistrictPrimaryWinners = (district:string):any => {
  // Here we're going to do a combined for simplicity
  const primaryMethod = getPrimaryMethod(district)
  const winners = primaryMethod(results[district])
  return winners
}

const findPrimaryWinners = ():Candidate[] => {
  const districtWinners = {}
  Object.keys(results).forEach(district => {
    const winners = findDistrictPrimaryWinners(district)
    districtWinners[district] = winners
  })

  // This is where things get really wierd as without the actual way the unbound 
  // delegates voted this count can be off. But we're going to approximate
  const totalVotes = {}
  Object.keys(districtWinners).forEach(district => {
    const candidates = districtWinners[district];
    // Iterate through each candidate
    Object.keys(candidates).forEach(candidate => {
      const votes = candidates[candidate]; // Get the number of votes for the candidate

      // If the candidate exists in sums, add the votes, else initialize with current votes
      if (totalVotes[candidate]) {
        totalVotes[candidate] += votes
      } else {
        totalVotes[candidate] = votes
      }
    })
  })

  const sortedCandidates = Object.entries(totalVotes).sort((a, b) => b[1] - a[1]);
  const winners = sortedCandidates.slice(0, 2);

  return winners.map((candidate) => fitCandidateScehma(candidate))
}

const resolvers: Resolvers = {
  Query: {
    primaryWinners: () => findPrimaryWinners()
  },
};

export default resolvers;