Reporte de práctica — Pantalla de presentación del alumno

Objetivo

Crear una pantalla de presentación del alumno que aplique buenas prácticas de layout, accesibilidad y responsividad usando técnicas vistas en el proyecto.

Archivos creados

- `screens/StudentProfileScreen.js` — pantalla de presentación del alumno.
- Reusa componentes: `components/PersonStats.js`, `components/ConfirmDialog.js` y `components/PersonCard.js`.

Decisiones de diseño y técnicas aplicadas

1. Flexbox y columnas
- Uso de `flexDirection`, `alignItems` y `justifyContent` para organizar contenido en filas/columnas.
- Separación en `leftColumn` y `rightColumn` para clarificar información y acciones.

2. Truncado de texto
- `numberOfLines={1}` y `ellipsizeMode="tail"` para `name` y `email`.

3. Chips y badges
- `Chip compact` y `flexWrap: 'wrap'` para que los badges no desborden en pantallas pequeñas.

4. Estadísticas compactas
- `PersonStats` muestra métricas pequeñas (salario formateado, años activos, contacto emergencia) con icono + número.

5. Scroll y teclado
- `KeyboardAvoidingView` + `ScrollView` con `contentContainerStyle` y `keyboardShouldPersistTaps="handled"`.
- En web, `ScrollView` puede combinarse con `maxHeight`/`overflow: auto` para zonas scrollables.

6. FAB y posicionamiento
- FAB fijo en web (`position: 'fixed'`, zIndex) y absoluto en móvil para que siempre sea visible.

7. Manejo de acciones y confirmaciones
- `ConfirmDialog` centraliza confirmaciones (Eliminar) para consistencia.

Cómo usar la pantalla (ejemplo)

- Navegar desde `Home`: `navigation.navigate('StudentProfile', { id: personId })`.
- La pantalla carga los datos con `getPersonById(id)` y muestra la tarjeta, stats y acciones.

Pruebas sugeridas

- Verificar en móvil (Android/iOS emulador) y web (desktop y mobile viewport).
- Probar textos largos para confirmar truncado.
- Revisar consola web para logs de `services/api.js` y `personService.js`.

Recomendaciones

- Añadir pruebas visuales (capturas o Storybook) en anchos: 320px, 768px, 1200px.
- Considerar `keyboardVerticalOffset` para iOS si el teclado cubre campos importantes.


---
Generado automáticamente como ejemplo de práctica para el equipo.
