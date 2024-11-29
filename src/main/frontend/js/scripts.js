document.addEventListener("DOMContentLoaded", () => {
    // Navegación entre vistas
    const links = document.querySelectorAll(".nav-link");
    const views = document.querySelectorAll(".view");

    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            links.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");

            const targetView = link.getAttribute("href").substring(1);
            views.forEach((view) => {
                view.classList.remove("active");
                if (view.id === targetView) {
                    view.classList.add("active");
                }
            });

            if (targetView === "assignments") {
                updateAssignmentDropdowns();
            }
        });
    });

    // Datos
    const drivers = [];
    const vehicles = [];
    const assignments = [];
    let editingAssignmentIndex = null; // Índice para manejar edición

    // Registro de conductores
    const driverForm = document.getElementById("driverForm");
    const driversTable = document.getElementById("driversTable");

    driverForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const driver = {
            name: document.getElementById("driverName").value,
            id: document.getElementById("driverId").value,
            age: document.getElementById("driverAge").value,
            nationality: document.getElementById("driverNationality").value,
            gender: document.getElementById("driverGender").value,
        };

        drivers.push(driver);
        updateDriversTable();
        driverForm.reset();
    });

    function updateDriversTable() {
        driversTable.innerHTML = "";
        drivers.forEach((driver) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.id}</td>
                <td>${driver.age}</td>
                <td>${driver.nationality}</td>
                <td>${driver.gender}</td>
            `;
            driversTable.appendChild(row);
        });
    }

    // Registro de vehículos
    const vehicleForm = document.getElementById("vehicleForm");
    const vehiclesTable = document.getElementById("vehiclesTable");

    vehicleForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const vehicle = {
            plate: document.getElementById("vehiclePlate").value,
            type: document.getElementById("vehicleType").value,
        };

        vehicles.push(vehicle);
        updateVehiclesTable();
        vehicleForm.reset();
    });

    function updateVehiclesTable() {
        vehiclesTable.innerHTML = "";
        vehicles.forEach((vehicle) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${vehicle.plate}</td>
                <td>${vehicle.type}</td>
            `;
            vehiclesTable.appendChild(row);
        });
    }

    // Gestión de asignaciones
    const assignmentForm = document.getElementById("assignmentForm");
    const assignmentsTable = document.getElementById("assignmentsTable");
    const assignDriver = document.getElementById("assignDriver");
    const assignVehicle = document.getElementById("assignVehicle");

    assignmentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const driverId = assignDriver.value;
        const vehiclePlate = assignVehicle.value;

        // Si estamos editando una asignación
        if (editingAssignmentIndex !== null) {
            assignments[editingAssignmentIndex] = { driverId, vehiclePlate };
            editingAssignmentIndex = null; // Salir del modo edición
            alert("Asignación editada correctamente.");
        } else {
            // Validar que el conductor no tenga ya un vehículo asignado
            const existingAssignment = assignments.find((a) => a.driverId === driverId);
            if (existingAssignment) {
                alert("Este conductor ya tiene un vehículo asignado. Edítalo en la tabla.");
                return;
            }

            assignments.push({ driverId, vehiclePlate });
            alert("Asignación creada correctamente.");
        }

        updateAssignmentsTable();
        assignmentForm.reset();
    });

    function updateAssignmentsTable() {
        assignmentsTable.innerHTML = "";
        assignments.forEach((assignment, index) => {
            const driver = drivers.find((d) => d.id === assignment.driverId);
            const vehicle = vehicles.find((v) => v.plate === assignment.vehiclePlate);

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${vehicle.plate}</td>
                <td>
                    <button class="edit-assignment" data-index="${index}">Editar</button>
                    <button class="delete-assignment" data-index="${index}">Eliminar</button>
                </td>
            `;
            assignmentsTable.appendChild(row);
        });

        document.querySelectorAll(".edit-assignment").forEach((button) => {
            button.addEventListener("click", handleEditAssignment);
        });
        document.querySelectorAll(".delete-assignment").forEach((button) => {
            button.addEventListener("click", handleDeleteAssignment);
        });
    }

    function handleEditAssignment(e) {
        const index = e.target.dataset.index;
        const assignment = assignments[index];

        assignDriver.value = assignment.driverId;
        assignVehicle.value = assignment.vehiclePlate;

        editingAssignmentIndex = index; // Guardar índice de edición
    }

    function handleDeleteAssignment(e) {
        const index = e.target.dataset.index;
        assignments.splice(index, 1);
        updateAssignmentsTable();
        alert("Asignación eliminada correctamente.");
    }

    function updateAssignmentDropdowns() {
        assignDriver.innerHTML = drivers.map((d) => `<option value="${d.id}">${d.name}</option>`).join("");
        assignVehicle.innerHTML = vehicles.map((v) => `<option value="${v.plate}">${v.plate}</option>`).join("");
    }
});
