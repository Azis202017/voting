import { useState, useEffect } from 'react';
import { vote_backend } from 'declarations/vote_backend';

function App() {
    const [message, setMessage] = useState('');
    const [votes, setVotes] = useState({ candidateA: 0n, candidateB: 0n });

    useEffect(() => {
        // Fetch the current votes when the component mounts
        vote_backend.getVotes().then((votes) => {
            setVotes(votes);
        });
    }, []);

    function handleVote(event) {
        event.preventDefault();
        const candidate = event.target.elements.candidate.value;
        vote_backend.vote(candidate).then((message) => {
            setMessage(message);
            // Fetch the updated votes
            vote_backend.getVotes().then((votes) => {
                setVotes(votes);
            });
        });
    }

    return (
        <main>
            <h1>Voting App</h1>
            <form onSubmit={handleVote}>
                <label htmlFor="candidate">Vote for: &nbsp;</label>
                <select id="candidate">
                    <option value="candidateA">Candidate A</option>
                    <option value="candidateB">Candidate B</option>
                </select>
                <button type="submit">Vote</button>
            </form>
            <section id="message">{message}</section>
            <section id="results">
                <h2>Current Votes</h2>
                <p>Candidate A: {votes.candidateA.toString()}</p>
                <p>Candidate B: {votes.candidateB.toString()}</p>
            </section>
        </main>
    );
}

export default App;
