import { Canister, query, update, text, nat, Record } from 'azle';

// A simple in-memory vote storage using bigint
let votes = {
    candidateA: 0n,  // Use bigint by appending 'n' to the number
    candidateB: 0n,
};

// Define the type for the votes object
const VotesRecord = Record({
    candidateA: nat,
    candidateB: nat
});

export default Canister({
    // Query to get the current vote count for each candidate
    getVotes: query([], VotesRecord, () => {
        return votes;
    }),

    // Update to cast a vote for a candidate
    vote: update([text], text, (candidate) => {
        if (candidate === 'candidateA' || candidate === 'candidateB') {
            votes[candidate] += 1n;  // Increment using bigint
            return `Vote casted for ${candidate}`;
        } else {
            return `Candidate ${candidate} does not exist`;
        }
    })
});
