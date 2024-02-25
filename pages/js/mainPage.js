const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlYzQ0MGJhMzkxZGIxMzY4NmNhYzFlYjkxZWNlYjRlYmU5NmJjZDRmY2E5NjE2ZTFjZTY2NTgxZTI5NzRkMTk0NTQ3NTU5NzI0MDYyOTliIn0.eyJhdWQiOiIzOWZhOTRjYy03ZDBiLTQ3MDYtODNhZi1kM2E1ODMwNzljY2EiLCJqdGkiOiI1ZWM0NDBiYTM5MWRiMTM2ODZjYWMxZWI5MWVjZWI0ZWJlOTZiY2Q0ZmNhOTYxNmUxY2U2NjU4MWUyOTc0ZDE5NDU0NzU1OTcyNDA2Mjk5YiIsImlhdCI6MTcwODg2MjgyOSwibmJmIjoxNzA4ODYyODI5LCJleHAiOjE3MDkxNjQ4MDAsInN1YiI6IjEwNzE5NTc4IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTkyMjcwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMjNmZTAyNTUtMWNjNC00ZmVkLWEzYmItOGJjZDY5NmViNmE3In0.chhaT3udQ94jOJ9ykUdXS7wD7ETSXO63p79tSemPyGy_hQLwAYaU8T9XxblWfgrgqEyDlan7TbRSk4nGLC3kAYIPyJMMhV2CtTPX4KITxFQ5zGQnRMKTNPjC__g4-n_SPKniKTlrQ9m1iAd8Jc5Bnccf5Ms-m3imOy4T0l-LHjm5NedjgXbu2hysDqfW2X9pF85PXHS2nCXSoWTHmJXj0WAYxT23ARPSK5qcuj0R5Eu8FuJcwifJx-klaKQZoKcIVl8vYEyXd1w8cHQFJ9GU_u3OwVQKdEfwG8w2NbnXoULCWsk3oMMRXcuCz6QlQk7R0ME8lplq-_peJqh5RQpycw"
const apiUrl = `http://localhost:3000/api/v4/leads`;
let deals = [];
let isOverall = false;
let page = 1;

async function fetchDeals(limit) {
    let url = `${apiUrl}?limit=${limit}&page=${page}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        return response.json();
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

fetchDeals(5, 1)
    .then(data => {
        isOverall = true;
        creatUsableArray(data);
    })
    .catch(error => {
        console.error(error);
});

function updateDeals(limit) {
    page += 1;
    fetchDeals(limit)
    .then(data => {
        creatUsableArray(data);
    })
    .catch(error => {
        console.error(error);
    });
}

function handlePaginationClick(limit) {
    page = 1;
    deals = [];
    
    fetchDeals(limit)
        .then(data => {
            creatUsableArray(data);
        })
        .catch(error => {
            console.error(error);
        });
}

function creatUsableArray(data) {
    for (const [key, value] of Object.entries(data['_embedded']['leads'])){
        deals.push({
                number: deals.length + 1,
                id: value.id,
                title: value.name,
                price: value.price,
                created_at: value.created_at,
                updated_at: value.updated_at,
                responsible_user_id: value.responsible_user_id
                })
    }
    displayLeadsInTable()
}

function displayLeadsInTable() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    deals.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.number}</td>
            <td>${lead.id}</td>
            <td>${lead.title}</td>
            <td>${lead.price}</td>
            <td>${new Date(lead.created_at * 1000).toLocaleDateString()}</td>
            <td>${new Date(lead.updated_at * 1000).toLocaleDateString()}</td>
            <td>${lead.responsible_user_id}</td>
        `;
        tbody.appendChild(row);
    });
}


function sortByBudget(order) {

    const sortedData = [...deals];
    if (order === 'asc') {
        sortedData.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
        sortedData.sort((a, b) => b.price - a.price);
    }
    deals = sortedData;
    displayLeadsInTable();
}

function sortByTitle(order) {
    const sortedData = [...deals];
    if (order === 'asc') {
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === 'desc') {
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
    }
    deals = sortedData;
    displayLeadsInTable();
}


