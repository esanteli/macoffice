document.addEventListener('DOMContentLoaded', function() {
    const formCrearNoticia = document.getElementById('formCrearNoticia');
    const mensajeNoticia = document.getElementById('mensajeNoticia');

    // Manejar el toggle entre URL e imagen
    const toggleImageInput = document.getElementById('toggleImageInput');
    const imagenUrl = document.getElementById('imagenUrl');
    const imagenFile = document.getElementById('imagenFile');

    toggleImageInput.addEventListener('change', function() {
        if (this.checked) {
            imagenUrl.style.display = 'none';
            imagenFile.style.display = 'block';
        } else {
            imagenUrl.style.display = 'block';
            imagenFile.style.display = 'none';
        }
    });

    // Función para cargar los datos de una noticia
    window.cargarDatosNoticia = function(id) {
        fetch(`/macoffice-master/Api/detalle_noticia.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const noticia = data.noticia;
                    document.getElementById('editId').value = noticia.id;
                    document.getElementById('editTitulo').value = noticia.titulo;
                    document.getElementById('editContenido').value = noticia.contenido;
                    document.getElementById('editTag').value = noticia.tag;
                    document.getElementById('editImagenUrl').value = noticia.imagen;
                    
                    // Mostrar preview de la imagen actual
                    const preview = document.getElementById('editImagenPreview');
                    if (noticia.imagen) {
                        preview.src = noticia.imagen;
                        preview.style.display = 'block';
                    } else {
                        preview.style.display = 'none';
                    }
                    
                    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
                    editModal.show();
                } else {
                    alert('Error al cargar los datos de la noticia');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cargar los datos de la noticia');
            });
    };

    // Función para cargar todas las noticias
    function cargarNoticias() {
        fetch('/macoffice-master/Api/obtener_noticia.php')
            .then(response => response.json())
            .then(data => {
                const tbody = document.getElementById('allNews');
                tbody.innerHTML = '';
                
                data.forEach(noticia => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${noticia.titulo}</td>
                        <td>${noticia.fecha_creacion}</td>
                        <td>${noticia.estado === '1' ? 'Activo' : 'Inactivo'}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="cargarDatosNoticia(${noticia.id})">
                                Editar
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="eliminarNoticia(${noticia.id})">
                                Eliminar
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error al cargar las noticias');
            });
    }

    // Función para eliminar una noticia
    window.eliminarNoticia = function(id) {
        if (confirm('¿Está seguro de que desea eliminar esta noticia?')) {
            fetch(`/macoffice-master/Api/eliminar_noticia.php?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                return response.json();
            })
            .then(data => {
                mensajeNoticia.style.display = 'block';
                if (data.success) {
                    mensajeNoticia.className = 'alert alert-success';
                    mensajeNoticia.textContent = data.message;
                    cargarNoticias(); // Recargar la tabla
                } else {
                    mensajeNoticia.className = 'alert alert-danger';
                    mensajeNoticia.textContent = data.message || 'Error al eliminar la noticia';
                }
                
                setTimeout(() => {
                    mensajeNoticia.style.display = 'none';
                }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                mensajeNoticia.style.display = 'block';
                mensajeNoticia.className = 'alert alert-danger';
                mensajeNoticia.textContent = 'Error al eliminar la noticia: ' + error.message;
                
                setTimeout(() => {
                    mensajeNoticia.style.display = 'none';
                }, 3000);
            });
        }
    };

    // Manejar el envío del formulario de creación
    formCrearNoticia.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        // Si estamos usando archivo en lugar de URL
        if (toggleImageInput.checked && imagenFile.files[0]) {
            formData.set('imagen', imagenFile.files[0]);
        }

        fetch('/macoffice-master/Api/crear_noticia.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mensajeNoticia.style.display = 'block';
            if (data.success) {
                mensajeNoticia.className = 'alert alert-success';
                mensajeNoticia.textContent = data.message;
                formCrearNoticia.reset();
                cargarNoticias();
            } else {
                mensajeNoticia.className = 'alert alert-danger';
                mensajeNoticia.textContent = data.message;
            }

            setTimeout(() => {
                mensajeNoticia.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            mensajeNoticia.style.display = 'block';
            mensajeNoticia.className = 'alert alert-danger';
            mensajeNoticia.textContent = 'Error al procesar la solicitud';
        });
    });

    // Manejar el envío del formulario de edición
    document.getElementById('editForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('id', document.getElementById('editId').value);
        formData.append('titulo', document.getElementById('editTitulo').value);
        formData.append('contenido', document.getElementById('editContenido').value);
        formData.append('tag', document.getElementById('editTag').value);

        // Manejar la imagen
        if (editToggleImageInput.checked && editImagenFile.files[0]) {
            formData.append('imagen', editImagenFile.files[0]);
        } else {
            formData.append('imagen', editImagenUrl.value);
        }

        fetch('/macoffice-master/Api/editar_noticia.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            mensajeNoticia.style.display = 'block';
            if (data.success) {
                const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                editModal.hide();
                cargarNoticias();
                mensajeNoticia.className = 'alert alert-success';
            } else {
                mensajeNoticia.className = 'alert alert-danger';
            }
            mensajeNoticia.textContent = data.message;
            
            setTimeout(() => {
                mensajeNoticia.style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            console.error('Error:', error);
            mensajeNoticia.style.display = 'block';
            mensajeNoticia.className = 'alert alert-danger';
            mensajeNoticia.textContent = error.message || 'Error al actualizar la noticia';
        });
    });

    // Agregar el manejo del toggle de imagen en el modal de edición
    const editToggleImageInput = document.getElementById('editToggleImageInput');
    const editImagenUrl = document.getElementById('editImagenUrl');
    const editImagenFile = document.getElementById('editImagenFile');

    editToggleImageInput.addEventListener('change', function() {
        if (this.checked) {
            editImagenUrl.style.display = 'none';
            editImagenFile.style.display = 'block';
        } else {
            editImagenUrl.style.display = 'block';
            editImagenFile.style.display = 'none';
        }
    });

    // Cargar las noticias al iniciar la página
    cargarNoticias();
}); 