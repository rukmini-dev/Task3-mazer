// ==============================
// SAMPLE DASHBOARD DATA
// ==============================
const data = {
    stats: {
        totalUsers: 320,
        totalSales: 452000,
        orders: 980
    },
    users: [
        { name: "Aishwarya", role: "Admin", sales: 25000 },
        { name: "Mahesh", role: "Editor", sales: 18000 },
        { name: "Sana", role: "Contributor", sales: 12000 },
        { name: "Raju", role: "Support", sales: 8000 },
        { name: "Deepak", role: "Manager", sales: 30000 },
        { name: "Kavya", role: "HR", sales: 5000 },
        { name: "Harsha", role: "Team Lead", sales: 32000 },
        { name: "Nikhil", role: "Sales", sales: 21000 },
        { name: "Priya", role: "Marketing", sales: 17000 },
        { name: "Shravya", role: "Finance", sales: 26000 },
        { name: "Vikram", role: "Developer", sales: 15000 }
    ]
};

// Sort by sales
data.users.sort((a, b) => b.sales - a.sales);

// ==============================
// RANDOM DATE FOR EACH USER
// ==============================
function randomDate() {
    const start = new Date(2024, 0, 1);
    const end = new Date(2025, 1, 28);
    const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return d.toISOString().split("T")[0];
}

data.users = data.users.map(u => ({ ...u, date: randomDate() }));

// ==============================
// LOAD STATS
// ==============================
function loadStats() {
    document.getElementById("totalUsers").textContent = data.stats.totalUsers;
    document.getElementById("totalSales").textContent = "₹ " + data.stats.totalSales.toLocaleString("en-IN");
    document.getElementById("orders").textContent = data.stats.orders;
}

// ==============================
// LOAD USERS
// ==============================
function loadUsers(list, table) {
    table.innerHTML = "";
    list.forEach(u => {
        table.insertAdjacentHTML("beforeend", `
            <tr>
                <td>${u.name}</td>
                <td>${u.role}</td>
                <td>₹ ${u.sales.toLocaleString("en-IN")}</td>
                <td>${u.date}</td>
            </tr>
        `);
    });
}

// DOM references
const userTable = document.getElementById("userTable");       // Dashboard
const userTablePage = document.getElementById("userTablePage"); // Users page

// ==============================
// SEARCH USERS
// ==============================
window.searchUsers = function () {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtered = data.users.filter(
        u => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
    );

    if (userTable) loadUsers(filtered.slice(0, 5), userTable);
    if (userTablePage) loadUsers(filtered, userTablePage);
};

// ==============================
// PIE CHART
// ==============================
function loadPieChart() {
    const canvas = document.getElementById("salesChart");
    if (!canvas) return;

    new Chart(canvas, {
        type: "pie",
        data: {
            labels: data.users.map(u => u.name),
            datasets: [{
                data: data.users.map(u => u.sales),
                backgroundColor: [
                    "#ff6384", "#36a2eb", "#ffcd56",
                    "#4bc0c0", "#9966ff", "#ff9f40",
                    "#c94c4c", "#4d79ff", "#a64ca6",
                    "#5cd65c", "#ff704d"
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// ==============================
// INIT ON PAGE LOAD
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    loadStats();

    if (userTable) loadUsers(data.users.slice(0, 5), userTable);
    if (userTablePage) loadUsers(data.users, userTablePage);

    loadPieChart();
});
