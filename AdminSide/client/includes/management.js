async function fetchUsersAndDisplay() {
    try {
        const response = await fetch('http://localhost:3000/api/users');
        const users = await response.json();

        const tbody = document.querySelector("#user-table tbody");
        tbody.innerHTML = "";

        users
            .filter(user => user.role !== "admin")
            .forEach(user => {
                const tr = document.createElement("tr");

                const fullName = `${user.firstName} ${user.lastName}`;
                const email = user.email;
                const id = user._id.slice(-12);
                const subsDate = new Date(user.createdAt).toLocaleDateString('en-GB');
                const verified = user.role === "Expert" ? "Yes" : "No";

                tr.innerHTML = `
                    <td>${fullName}</td>
                    <td>${email}</td>
                    <td>${id}</td>
                    <td>${subsDate}</td>
                    <td>${verified}</td>
                `;

                tr.addEventListener("click", () => {
                    window.location.href = `userDetails.html?userId=${user._id}`;
                });

                tbody.appendChild(tr);
            });
    } catch (err) {
        console.error("❌ Failed to load users", err);
    }
}

window.addEventListener("DOMContentLoaded", fetchUsersAndDisplay);
