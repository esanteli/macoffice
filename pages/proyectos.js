// Función para obtener los proyectos
function fetchProyectos() {
    fetch('/admin/api/read.php')
        .then(response => response.json())
        .then(proyectos => {
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = ''; // Limpiar la lista antes de mostrar

            proyectos.forEach(proyecto => {
                const projectItem = document.createElement('div');
                projectItem.classList.add('project-item');
                projectItem.innerHTML = `
                    <div class="container-proyecto" style="background-image: url('${proyecto.background_image}');">
                        <div class="titulo-proyecto">${proyecto.titulo}</div>
                        <div class="tag-proyecto">${proyecto.tag}</div>
                        <div class="description-proyecto">${proyecto.description}</div>
                    </div>
                `;
                projectsList.appendChild(projectItem);
            });
        })
        .catch(error => console.error('Error fetching proyectos:', error));
}

// Cargar los proyectos cuando la página se carga
document.addEventListener('DOMContentLoaded', fetchProyectos);
