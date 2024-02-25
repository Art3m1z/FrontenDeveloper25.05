const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const apiUrl = 'https://daniilbogdanov8989.amocrm.ru/api/v4/leads'
const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlYzQ0MGJhMzkxZGIxMzY4NmNhYzFlYjkxZWNlYjRlYmU5NmJjZDRmY2E5NjE2ZTFjZTY2NTgxZTI5NzRkMTk0NTQ3NTU5NzI0MDYyOTliIn0.eyJhdWQiOiIzOWZhOTRjYy03ZDBiLTQ3MDYtODNhZi1kM2E1ODMwNzljY2EiLCJqdGkiOiI1ZWM0NDBiYTM5MWRiMTM2ODZjYWMxZWI5MWVjZWI0ZWJlOTZiY2Q0ZmNhOTYxNmUxY2U2NjU4MWUyOTc0ZDE5NDU0NzU1OTcyNDA2Mjk5YiIsImlhdCI6MTcwODg2MjgyOSwibmJmIjoxNzA4ODYyODI5LCJleHAiOjE3MDkxNjQ4MDAsInN1YiI6IjEwNzE5NTc4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTkyMjcwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMjNmZTAyNTUtMWNjNC00ZmVkLWEzYmItOGJjZDY5NmViNmE3In0.chhaT3udQ94jOJ9ykUdXS7wD7ETSXO63p79tSemPyGy_hQLwAYaU8T9XxblWfgrgqEyDlan7TbRSk4nGLC3kAYIPyJMMhV2CtTPX4KITxFQ5zGQnRMKTNPjC__g4-n_SPKniKTlrQ9m1iAd8Jc5Bnccf5Ms-m3imOy4T0l-LHjm5NedjgXbu2hysDqfW2X9pF85PXHS2nCXSoWTHmJXj0WAYxT23ARPSK5qcuj0R5Eu8FuJcwifJx-klaKQZoKcIVl8vYEyXd1w8cHQFJ9GU_u3OwVQKdEfwG8w2NbnXoULCWsk3oMMRXcuCz6QlQk7R0ME8lplq-_peJqh5RQpycw"

app.get('/api/v4/leads', async (req, res) => {
    const finalUrl = `${apiUrl}?limit=${req.query.limit}&page=${req.query.page}`;
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default(`${finalUrl}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});