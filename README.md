# 🃏 Pokémon Memory Game

Un divertido juego de memoria de cartas de Pokémon hecho con **React**, **TypeScript**, **Tailwind CSS**, y componentes de **@chadcn**. ¡Pon a prueba tu memoria, personaliza el número de cartas y elige entre modo individual o de dos jugadores! Puedes seleccionar fondos de cartas generados con IA o incluso crear los tuyos propios.


## 🚀 Demo

[Enlace a la demo del juego (si está en producción)](https://dezzdev.github.io/Pokemon-memoryCardGame/)

## 📸 Capturas de Pantalla

![Captura del Juego](/public/CapturaPokemonMemoriGame.webp)
![Captura de Victoria](/public/CapturaPokemonMemoriGame2.webp)

## 📝 Características

- **Juego de Memoria Temático**: Explora un mundo de cartas de Pokémon diseñadas para desafiar tu memoria.
- **Opciones de Configuración**:
  - **Cantidad de Cartas**: Elige la cantidad de cartas para jugar, desde partidas rápidas hasta desafíos extensos.
  - **Modo de Juego**: Configura el juego en **modo individual** o **modo de dos jugadores**.
  - **Selección de Cartas**: Escoge si deseas que las cartas se seleccionen de forma aleatoria o selecciona manualmente tus cartas favoritas.
  - **Temática del Fondo de las Cartas**: Gracias a la IA de Cloudinary puedes seleccionar entre varias temáticas preestablecidas generadas con IA o elige la opción **"Custom"** para escribir un prompt personalizado y generar fondos nuevos.
- **Alertas y Celebraciones**:
  - **SweetAlert** para alertas y mensajes elegantes.
  - **Confetti.js** para una animación de confeti al ganar el juego.


## ⚙️ Tecnologías Utilizadas

- **React**: Biblioteca para la interfaz de usuario.
- **TypeScript**: Tipado estático para mayor seguridad y mantenimiento del código.
- **Tailwind CSS**: Para el diseño y estilo rápidos y consistentes.
- **Cloudinary**: Para generar los fondos tematizados de las cartas.
- **@chadcn/components**: Componentes de UI reutilizables.
- **SweetAlert**: Para alertas y notificaciones elegantes.
- **Confetti.js**: Para el efecto de confeti al ganar el juego.

## 📦 Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/DezzDev/Pokemon-memoryCardGame.git

## 🕹️ Cómo Jugar

1. **Configuración Inicial**:
   - Al iniciar el juego, tendrás una configuración predefinida, de 3 pares de cartas, un jugador y cartas aleatorias, pero puedes configurar las opciones según tus preferencias:
     - **Cantidad de Cartas**: Elige cuántas cartas quieres en la partida (para ajustar la dificultad).
     - **Modo de Juego**: Selecciona si deseas jugar solo o en un modo para dos jugadores.
     - **Selección de Cartas**: Puedes optar por una selección aleatoria de cartas o elegir tus favoritas manualmente.
     - **Temática del Fondo de Cartas**: Escoge un fondo para las cartas. Puedes seleccionar entre cuatro opciones preestablecidas generadas con IA, o utilizar la opción **"Custom"** para escribir un prompt personalizado y generar fondos únicos.
   
2. **Revela las Cartas**:
   - Haz clic en dos cartas para mostrarlas. Si ambas cartas coinciden, permanecerán visibles. Si no coinciden, se voltearán después de un breve momento.

3. **Encuentra los Pares**:
   - Continúa revelando cartas hasta encontrar todos los pares.

4. **Gana el Juego**:
   - Encuentra todos los pares para ganar la partida. Una vez completado, verás una animación de confeti y recibirás un mensaje de felicitación.

