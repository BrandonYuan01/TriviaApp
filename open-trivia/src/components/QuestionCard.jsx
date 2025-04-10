import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import { useState } from 'react';

function QuestionCard({ data, onAnswer, questionNum, total }) {
    const [selected, setSelected] = useState(null);
    const [feedback, setFeedback] = useState('');

    const handleSelect = (ans) => {
        setSelected(ans);
        const isCorrect = ans === data.correct;
        setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');

        setTimeout(() => {
            onAnswer(ans);
            setSelected(null);
            setFeedback('');
        }, 1500); // 1.5 second pause to show feedback
    };

    return (
        <Card sx={{ mb: 3, p: 2 }}>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                    Question {questionNum} of {total}
                </Typography>

                <Typography variant="body1" align="center" gutterBottom>
                    {data.question}
                </Typography>

                <Stack spacing={2} mt={3} alignItems="center">
                    {data.answers.map((ans, idx) => {
                        const isCorrect = selected && ans === data.correct;
                        const isWrong = selected && ans === selected && ans !== data.correct;

                        return (
                            <Button
                                key={idx}
                                variant="outlined"
                                color={isCorrect ? 'success' : isWrong ? 'error' : 'primary'}
                                onClick={() => handleSelect(ans)}
                                disabled={!!selected}
                                sx={{ width: '100%' }}
                            >
                                {ans}
                            </Button>
                        );
                    })}
                </Stack>

                {selected && (
                    <Typography
                        variant="h5"
                        mt={4}
                        align="center"
                        sx={{
                            color: feedback === 'Correct!' ? 'success.main' : 'error.main',
                            fontWeight: 'bold',
                        }}
                    >
                        {feedback}
                    </Typography>
                )}
            </CardContent>
        </Card>

    );
}

export default QuestionCard;
