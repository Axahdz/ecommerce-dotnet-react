// Importamos React y su Hook useState para crear componentes y manejar estado, así como el archivo de estilos.
import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de instalar axios con npm o yarn
import './App.css';

// Aquí definimos un conjunto de datos de ejemplo para simular las opciones de servicios de paquetería.
const serviciosPaqueteria = [
  { id: 1, nombre: 'Fedex', tarifa: 200, tiempoEntrega: '24h' },
  { id: 2, nombre: 'DHL', tarifa: 180, tiempoEntrega: '48h' },
  { id: 3, nombre: 'UPS', tarifa: 250, tiempoEntrega: '24h' },
  // Podemos añadir más servicios aquí.
];

// Este es nuestro componente principal, donde se gestiona todo nuestro formulario y la visualización de resultados.
function App() {
  // Utilizamos useState para crear 'estados'. El estado 'formData' almacena los valores del formulario.
  // El estado 'resultados' almacena los resultados de la comparación de servicios de paquetería.
  const [formData, setFormData] = useState({
    largo: '',
    ancho: '',
    alto: '',
    peso: '',
    codigoPostalOrigen: '',
    codigoPostalDestino: ''
  });
  const [resultados, setResultados] = useState([]);

  // Esta función maneja los cambios en los campos del formulario y actualiza el estado 'formData'.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value // Actualiza la propiedad específica del estado con lo que el usuario escribió.
    }));
  };

  // Esta función se ejecuta cuando se envía el formulario. PreventDefault evita que la página se recargue.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí simularíamos la lógica para buscar y comparar servicios basados en 'formData'.

    // Realizamos una comparación simple por precio, ordenando los servicios de menor a mayor tarifa.
    const resultadosComparacion = serviciosPaqueteria
      .sort((a, b) => a.tarifa - b.tarifa);

    // Actualizamos el estado 'resultados' con los servicios ordenados.
    setResultados(resultadosComparacion);
  };

  // Aquí es donde realmente devolvemos el JSX (similar al HTML) que representa nuestra interfaz de usuario.
  return (
    <div className="App">
      <h1>Buscador de Servicios de Paquetería</h1>
      {/* El formulario llama a handleSubmit cuando se envía. */}
      <form onSubmit={handleSubmit}>
        {/* Cada entrada en el formulario se enlaza con una pieza de nuestro estado de datos del formulario. */}
        <input type="text" name="largo" value={formData.largo} onChange={handleChange} placeholder="Largo (cm)" required />
        {/* 'required' asegura que el campo debe ser llenado antes de enviar el formulario. */}
        <input type="text" name="ancho" value={formData.ancho} onChange={handleChange} placeholder="Ancho (cm)" required />
        <input type="text" name="alto" value={formData.alto} onChange={handleChange} placeholder="Alto (cm)" required />
        <input type="text" name="peso" value={formData.peso} onChange={handleChange} placeholder="Peso (kg)" required />
        <input type="text" name="codigoPostalOrigen" value={formData.codigoPostalOrigen} onChange={handleChange} placeholder="Código Postal Origen" required />
        <input type="text" name="codigoPostalDestino" value={formData.codigoPostalDestino} onChange={handleChange} placeholder="Código Postal Destino" required />
        <button type="submit">Buscar</button>
      </form>

      {/* Aquí mostramos los resultados de la búsqueda y comparación. */}
      <div>
        <h2>Resultados:</h2>
        <ul>
          {/* Mapeamos cada resultado a un elemento de lista para mostrarlo en pantalla. */}
          {resultados.map(servicio => (
            <li key={servicio.id}>
              {servicio.nombre} - Tarifa: ${servicio.tarifa} - Tiempo de Entrega: {servicio.tiempoEntrega}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Exportamos el componente para que pueda ser utilizado en otros archivos de nuestro proyecto.
export default App;
