import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, CircularProgress, Box } from '@mui/material';
import QuestionCard from './components/QuestionCard';
import he from 'he';

const API_URL = 'https://the-trivia-api.com/v2/questions';

function App() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(API_URL, { params: { limit: 5 } });
            const formatted = data.map((q) => ({
                question: he.decode(q.question.text),
                correct: he.decode(q.correctAnswer),
                answers: shuffle([
                    ...q.incorrectAnswers.map((ans) => he.decode(ans)),
                    he.decode(q.correctAnswer),
                ]),
            }));
            setQuestions(formatted);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching questions', err);
        }
    };

    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const handleAnswer = (answer) => {
        if (answer === questions[current].correct) setScore((prev) => prev + 1);

        if (current + 1 < questions.length) {
            setCurrent((prev) => prev + 1);
        } else {
            setShowResults(true);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#b19cd9',
                p: 2,
            }}
        >
            <Typography variant="h3" align="center" gutterBottom>
                OpenTrivia Quiz
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : showResults ? (
                <Box textAlign="center">
                    <Typography variant="h4" gutterBottom>
                        You got {score} out of {questions.length} correct!
                    </Typography>
                    <Button variant="contained" onClick={() => window.location.reload()}>
                        Restart
                    </Button>
                </Box>
            ) : (
                <QuestionCard
                    data={questions[current]}
                    onAnswer={handleAnswer}
                    questionNum={current + 1}
                    total={questions.length}
                />
            )}
        </Box>
    );
}

export default App;
