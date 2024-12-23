document.addEventListener("DOMContentLoaded", function () {
  // Cargar noticias al cargar la página
  cargarNoticias();

  // Función para cargar las noticias desde la API
  function cargarNoticias() {
    fetch("/macoffice-master/Api/obtener_noticia.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const allNews = document.getElementById("allNews");
        if (!allNews) return; // Verificar si el elemento existe

        allNews.innerHTML = "";
        const fragment = document.createDocumentFragment();

        data.forEach((news) => {
          const div = document.createElement("div");
          div.className = "col-md-4 mb-4";
          div.id = `news-${news.id}`;
          div.innerHTML = `
            <div class="card">
                <img src="${news.imagen || 'placeholder.jpg'}" class="card-img-top" alt="${news.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${news.titulo}</h5>
                    <p class="card-text">${news.contenido}</p>
                    <small class="text-muted">${news.fecha_creacion}</small>
                    <button class="btn btn-primary" onclick="cargarDatosNoticia(${news.id})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarNoticia(${news.id})">Eliminar</button>
                </div>
            </div>
          `;
          fragment.appendChild(div);
        });

        allNews.appendChild(fragment);
      })
      .catch((error) => {
        console.error("Error al cargar las noticias:", error);
        const allNews = document.getElementById("allNews");
        if (allNews) {
          allNews.innerHTML = '<div class="alert alert-danger">Error al cargar las noticias</div>';
        }
      });
  }

  // Función para cargar los datos de la noticia en el modal de edición
  window.cargarDatosNoticia = function(id) {
    fetch(`/macoffice-master/Api/detalle_noticia.php?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          throw new Error(data.message);
        }
        
        const noticia = data.noticia;
        document.getElementById("editId").value = noticia.id;
        document.getElementById("editTitulo").value = noticia.titulo;
        document.getElementById("editContenido").value = noticia.contenido;
        
        // Mostrar el modal
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
      })
      .catch((error) => {
        console.error("Error al cargar los datos de la noticia:", error);
        alert("Error al cargar los datos de la noticia: " + error.message);
      });
  };

  // Función para eliminar una noticia
  window.eliminarNoticia = function(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
      fetch(`/macoffice-master/Api/eliminar_noticia.php?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          cargarNoticias();
          alert(data.message);
        } else {
          throw new Error(data.message);
        }
      })
      .catch(error => {
        console.error("Error al eliminar la noticia:", error);
        alert("Error al eliminar la noticia: " + error.message);
      });
    }
  };
});
