# Arquitectura de Software — CaféU 2.0

## Enfoque arquitectónico
CaféU 2.0 separa responsabilidades en cuatro capas para mantener el negocio aislado de la interfaz y del mecanismo de persistencia:

- **Presentación (`src/presentation/`)**: vistas (`Inicio`, `Menú`, `Detalle`, `Mi pedido`, `Confirmación`), controles accesibles, estilos *Mobile-First* (`estilos.css`) y manejo de eventos del DOM.
- **Aplicación (`src/application/`)**: casos de uso (`BuscarProductosUseCase`, `GestionarPedidoUseCase`) que orquestan las acciones del usuario sobre el dominio y el repositorio.
- **Dominio (`src/domain/`)**: entidades (`Producto`, `DetallePedido`, `Pedido`) y normalización (`NormalizadorTexto`) con las reglas de negocio, subtotales, totales, recuperación del último eliminado y confirmación.
- **Infraestructura (`src/infrastructure/`)**: acceso a datos y persistencia (`CatalogoStaticRepository`, `PedidoLocalStorageRepository`) respaldada en `localStorage` con caída segura en memoria para entornos sin `localStorage`[cite: 1].

## Dependencias entre capas

```mermaid
flowchart LR
  P[Presentation] --> A[Application]
  A --> D[Domain]
  I[Infrastructure] --> D
  A -.-> I