# 📱 pragma_prueba

Aplicación desarrollada como parte de la **Prueba Técnica para Desarrollador Mobile (Ionic / Angular)**.  
Implementa un sistema de **gestión de tareas con categorías**, persistencia local y control dinámico de funcionalidades mediante **Firebase Remote Config**.

---

## 📎 Enlaces de entrega

- 🔗 **Repositorio:** [https://github.com/AnthonyA0115/pragma_prueba](https://github.com/AnthonyA0115/pragma_prueba)
- 📱 **APK (descarga):** [Enlace a GitHub Releases o Google Drive]
- 🍎 **IPA:** No generado por falta de entorno macOS. El proyecto está **listo para compilar en Xcode** desde `platforms/ios` con una cuenta de desarrollador Apple.
- 🎬 **Video demostrativo:** [Enlace a video o carpeta `/docs` con capturas]

---

## 📋 Resumen general

Esta aplicación es una **lista de tareas (To-Do List)** con funcionalidades extendidas:

- CRUD completo de **tareas** 📝  
- CRUD completo de **categorías** 🏷️  
- Asignación de categoría a cada tarea  
- **Filtrado** de tareas por categoría  
- **Persistencia local** usando `@ionic/storage-angular`  
- Integración con **Firebase Remote Config** para activar/desactivar funciones en tiempo real  
- Build Android (.APK) funcional y probado

---

## 🧠 Arquitectura general

El proyecto está estructurado siguiendo buenas prácticas de separación de responsabilidades:

- **Modelos (`models/`)** → Estructuran los datos (`Task`, `Category`).  
- **Servicios (`services/`)** → Contienen la lógica de negocio y persistencia (`TaskService`, `CategoryService`, `RemoteConfigService`).  
- **Páginas (`pages/`)** → Manejan la presentación y la interacción con el usuario (`home`, `task-modal`, `category-modal`).  

Esto garantiza **mantenibilidad, escalabilidad y claridad** en la arquitectura.

---

## 📘 Respuestas a las preguntas de la prueba

### 1️⃣ Principales desafíos
El principal desafío fue integrar **Firebase Remote Config** de forma que los cambios de configuración se aplicaran sin necesidad de recargar o redeployar la app.  
También fue importante estructurar los servicios de **tareas y categorías** para mantener una lógica limpia, modular y reutilizable, asegurando que la vista no contenga lógica de negocio.

### 2️⃣ Técnicas de optimización de rendimiento aplicadas
- **Persistencia local** con IndexedDB (Ionic Storage) → evita solicitudes innecesarias a red.  
- **Lazy Loading** → reduce el tiempo de carga inicial.  
- **Filtrado en memoria** eficiente y sin recálculos innecesarios.  
- **Asincronía controlada** en `fetchAndActivate()` para no bloquear la UI.  
- Arquitectura preparada para `ChangeDetectionStrategy.OnPush` si se requiere optimizar más.

### 3️⃣ Aseguramiento de calidad y mantenibilidad
- **Separación de capas** (servicios, modelos, vistas).  
- **Código modular y tipado** con TypeScript.  
- **Commits atómicos y descriptivos** (`feat:`, `fix:`, etc.).  
- **Documentación clara** en este README.  
- **Pruebas manuales exhaustivas** de todos los flujos (CRUD, filtrado, persistencia, Remote Config).

---

## 🧩 Tecnologías utilizadas

- **Ionic 7 / Angular 17** — Framework UI híbrido.  
- **@ionic/storage-angular** — Persistencia local (IndexedDB / SQLite).  
- **Firebase Remote Config** — Control dinámico de funcionalidades.  
- **Cordova** — Generación de builds móviles.  
- **TypeScript** — Tipado y estructura de datos.

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/AnthonyA0115/pragma_prueba.git
cd pragma_prueba
npm install
