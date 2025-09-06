document.addEventListener('DOMContentLoaded', () => {
  const ArrayItems = [
    {
      id: 1,
      nombre: 'Papas',
      precio: 1,
    },
    {
      id: 2,
      nombre: 'Cebolla',
      precio: 1.2,
    },
    {
      id: 3,
      nombre: 'Calabacin',
      precio: 2.1,
    },
    {
      id: 4,
      nombre: 'Frutillas',
      precio: 0.6,
    }
  ];

  let carrito = [];
  const divisa = '$';
  const DOMitems = document.querySelector('#items');
  const DOMcarrito = document.querySelector('#carrito');
  const DOMtotal = document.querySelector('#total');
  const DOMbotonBorrar = document.querySelector('#boton-vaciar');

  function renderProductos() {
    ArrayItems.forEach((info) => {
      const elNodoCarrito = document.createElement('div');
      elNodoCarrito.classList.add('card', 'col-sm-4');
      const NodoCardBody = document.createElement('div');
      elNodoCardBody.classList.add('card-body');
      const NodoTitulo = document.createElement('h5');
      elNodoTitulo.classList.add('card-title');
      elNodoTitulo.textContent = info.nombre;
      const NodoPrecio = document.createElement('p');
      elNodoPrecio.classList.add('card-text');
      elNodoPrecio.textContent = `${info.precio}${divisa}`;
      const elNodoBoton = document.createElement('button');
      elNodoBoton.classList.add('btn', 'btn-primary');
      elNodoBoton.textContent = '+';
      elNodoBoton.setAttribute('marcador', info.id);
      elNodoBoton.addEventListener('click', addProductoAlCarrito);
      elNodoCardBody.appendChild(elNodoTitulo);
      elNodoCardBody.appendChild(elNodoPrecio);
      elNodoCardBody.appendChild(elNodoBoton);
      elNodoCarrito.appendChild(elNodoCardBody);
      DOMitems.appendChild(elNodoCarrito);
    });
  }

  function addProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))
    renderCarrito();
  }

  function renderCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
      const NuevoItem = ArrayItems.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });

      const numeroUnidadesItem = carrito.reduce((total, itemId) => {
        return itemId === item ? total += 1 : total;
      }, 0);
  
      const elNodoArray = document.createElement('li');
      elNodoCarrito.classList.add('list-group-item', 'text-right', 'mx-2');
      elNodoCarrito.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
      const BorrarBoton = document.createElement('button');
      BorrarBoton.classList.add('btn', 'btn-danger', 'mx-5');
      BorrarBoton.textContent = 'X';
      BorrarBoton.style.marginLeft = '1rem';
      BorrarBoton.dataset.item = item;
      BorrarBoton.addEventListener('click', borrarItemCarrito);
      elNodoArray.appendChild(BorrarBoton);
      DOMcarrito.appendChild(elNodoArray);
    });
    DOMtotal.textContent = calcularTotal();
  }

  function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
      carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
      });
    renderCarrito();
  }

  function calcTotal() {
    return carrito.reduce((total, item) => {
      const NuevoItem = ArrayItems.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
      });
      return total + miItem[0].precio;
    }, 0).toFixed(2);
  }

  function vaciarCarrito() {
    carrito = [];
    renderCarrito();
  }

  DOMbotonVaciar.addEventListener('click', vaciarCarrito);
  renderProductos();
  renderCarrito();

});
